// Date: Wed, 18 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

import (
	"encoding/json"
	"os"
	"strings"

	"github.com/natefinch/atomic"
)

func WriteObjectIntoFileWithMergeChecking(filePath string, data interface{}) (err error) {
	var jsonData []byte = nil
	// Check if file exists
	if _, err := os.Stat(filePath); err == nil {
		// Read existing file
		existingData, err := os.ReadFile(filePath)
		if err != nil {
			return err
		}

		// Merge existing data with new data
		b, err := json.Marshal(data)
		if err != nil {
			return err
		}
		mergedData, err := MergeTwoJSONs(string(existingData), string(b))
		if err != nil {
			return err
		}

		jsonData = []byte(mergedData)
	} else {
		// Write data to file
		jsonData, err = json.Marshal(data)
		if err != nil {
			return err
		}
	}

	err = atomic.WriteFile(filePath, strings.NewReader(string(jsonData)))

	if err != nil {
		return err
	}

	return nil
}

func MergeTwoJSONs(originalJSON string, targetJSON string) (string, error) {
	var original interface{}
	var target interface{}

	err := json.Unmarshal([]byte(originalJSON), &original)
	if err != nil {
		return targetJSON, nil // if originalJSON is invalid, then return targetJSON
	}

	err = json.Unmarshal([]byte(targetJSON), &target)
	if err != nil {
		return "", err
	}

	result, err := merge(original, target)
	if err != nil {
		return "", err
	}

	resultJSON, err := json.Marshal(result)
	if err != nil {
		return "", err
	}

	return string(resultJSON), nil
}

func merge(original interface{}, target interface{}) (interface{}, error) {
	switch original.(type) {
	case map[string]interface{}:
		originalMap := original.(map[string]interface{})
		targetMap := target.(map[string]interface{})

		for key, targetValue := range targetMap {
			originalValue, ok := originalMap[key]
			if !ok {
				originalMap[key] = targetValue
			} else {
				mergedValue, err := merge(originalValue, targetValue)
				if err != nil {
					return nil, err
				}
				originalMap[key] = mergedValue
			}
		}

		return originalMap, nil

	case []interface{}:
		originalSlice := original.([]interface{})
		targetSlice := target.([]interface{})

		for i, targetValue := range targetSlice {
			if i >= len(originalSlice) {
				originalSlice = append(originalSlice, targetValue)
			} else {
				mergedValue, err := merge(originalSlice[i], targetValue)
				if err != nil {
					return nil, err
				}
				originalSlice[i] = mergedValue
			}
		}

		return originalSlice, nil

	default:
		return target, nil
	}
}
