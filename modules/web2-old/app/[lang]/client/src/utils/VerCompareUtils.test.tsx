// LafTools
// 
// Date: Thu, 7 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import { expect, test, test as describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'
import VerCompareUtils from './VerCompareUtils';

test('removeAlphaOrBeta should remove alpha or beta from version', () => {
    const version = '1.2.3-alpha';
    const expected = '1.2.3';
    const result = VerCompareUtils.removeAlphaOrBeta(version);
    expect(result).toBe(expected);
});

test('isNewVersion should return true if new version is greater than current version', () => {
    const currentVersion = '1.2.3';
    const newVersion = '2.0.0';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});
test('isNewVersion FZIavIOwI', () => {
    const currentVersion = '2.0.0';
    const newVersion = '2.0.10';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});
test('isNewVersion NMxzna31n', () => {
    const currentVersion = '2.0.1';
    const newVersion = '2.0.10';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});
test('isNewVersion z9Au6E0z1', () => {
    const currentVersion = '2.0.1';
    const newVersion = '2.0.23';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});

test('isNewVersion should return false if new version is not greater than current version', () => {
    const currentVersion = '2.0.0';
    const newVersion = '1.2.3';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(false);
});