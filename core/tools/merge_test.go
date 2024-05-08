// Date: Wed, 18 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

import (
	"encoding/json"
	"laftools-go/core/project/base/env"
	"os"
	"path"
	"testing"
)

func TestMergeTwoJSONs(t *testing.T) {
	originalJSON := `{"name": "John", "age": 30,"b": {"a": 1,"aaa": 39}}`
	targetJSON := `{"age": 35, "city": "New York","b": {"aaa": [1,2,3]}}`
	expectedResult := `{"age":35,"b":{"a":1,"aaa":[1,2,3]},"city":"New York","name":"John"}`

	result, err := MergeTwoJSONs(originalJSON, targetJSON)
	if err != nil {
		t.Errorf("MergeTwoJSONs returned an error: %v", err)
	}

	if result != expectedResult {
		t.Errorf("MergeTwoJSONs returned unexpected result: got %v, want %v", result, expectedResult)
	}
}

func createTestTempFile(dir, pattern string) (string, error) {
	return path.Join(MkdirDirWithStr(path.Join(env.DefaultLafToolsRoot, "temp")), pattern), nil
}

func TestWriteJSONToFile(t *testing.T) {
	// Create temporary file
	file, err := createTestTempFile("", "test.json")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(file)

	// Write initial JSON data to file
	initialData := map[string]interface{}{
		"name": "Alice",
		"age":  30,
	}
	err = WriteObjectIntoFileWithMergeChecking(file, initialData)
	if err != nil {
		t.Fatal(err)
	}

	// Write new JSON data to file
	newData := map[string]interface{}{
		"name":  "Bob",
		"email": "bob@example.com",
	}
	err = WriteObjectIntoFileWithMergeChecking(file, newData)
	if err != nil {
		t.Fatal(err)
	}

	// Read final JSON data from file
	finalDataBytes, err := os.ReadFile(file)
	if err != nil {
		t.Fatal(err)
	}
	var finalData map[string]interface{}
	err = json.Unmarshal(finalDataBytes, &finalData)
	if err != nil {
		t.Fatal(err)
	}

	// change reflect.DeepEqual into checking JSON fields one by one
	if string(finalDataBytes) != `{"age":30,"email":"bob@example.com","name":"Bob"}` {
		t.Errorf("Unexpected final data: %v", string(finalDataBytes))
	}

}
