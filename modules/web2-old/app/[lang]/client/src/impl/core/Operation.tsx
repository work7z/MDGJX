
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// Copyright (C) 2024 - Present, laftools.dev and Codegen.cc


/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import { InputOutputEditorLang } from "../purejs-types";
import { AppToolConversionIdCollectionSetType } from "../tools/d_meta";
import Dish from "./Dish.mjs";
import Ingredient from "./Ingredient.mjs";
type Argument = any & {
  name: string;
  type: string;
  value: any | string | string[];
}

type Check = {
  pattern?: string;
  flags?: string;
  args?: any[];
}

type ModuleConfig = {
  module: string;
  description: string;
  infoURL: string | null;
  inputType: string;
  outputType: string;
  flowControl: boolean;
  manualBake: boolean;
  args?: Argument[];
  checks?: Check[];
}
export type OptDetail = {
  inputNoWrap?: boolean,
  outputNoWrap?: boolean,
  exampleInput: string;
  exampleOutput: string;
  infoURL: string;
  optDescription: string;
  nousenouseID?: string;
  optName: string;
  config: ModuleConfig
  relatedID: AppToolConversionIdCollectionSetType
  relatedIDs?: AppToolConversionIdCollectionSetType[]
}
export default abstract class Operation {

  private _inputType: number = -1;
  private _outputType: number = -1;
  private _presentType: number = -1;
  private _breakpoint: boolean = false;
  private _disabled: boolean = false;
  private _flowControl: boolean = false;
  private _manualBake: boolean = false;
  private _ingList: Ingredient[] = [];
  checks: any[] = [];
  fileID: string = 'CB_25k0dr';

  public name: string = "";
  public module: string = "";
  public description: string = "";
  public infoURL: string = "";

  public abstract getOptDetail(): OptDetail;

  /**
   * Runs the operation.
   *
   * @param input - The input data.
   * @param args - The arguments for the operation.
   * @returns {*} - The result of the operation.
   */
  run(input: any, args: any[]): any {
    return input;
  }

  /**
   * Highlights the output.
   *
   * @param pos - Position information.
   * @param args - The arguments for the operation.
   * @returns {Object[]} - Updated position information.
   */
  highlight(pos: { start: number; end: number }[], args: any[]): { start: number; end: number }[] | false {
    return false;
  }

  /**
   * Reverses the highlighting.
   *
   * @param pos - Position information.
   * @param args - The arguments for the operation.
   * @returns {Object[]} - Updated position information.
   */
  highlightReverse(pos: { start: number; end: number }[], args: any[]): { start: number; end: number }[] | false {
    return false;
  }

  getInputOutputEditorLang(): InputOutputEditorLang | null {
    return null;
  }

  /**
   * Presents the operation's result in a human-readable format.
   *
   * @param data - The result of the run() function.
   * @param args - The operation's arguments.
   * @returns {*} - A human-readable version of the data.
   */
  present(data: any, args: any[]): any {
    return data;
  }

  set inputType(typeStr: string) {
    this._inputType = Dish.typeEnum(typeStr);
  }

  get inputType(): string {
    return Dish.enumLookup(this._inputType);
  }

  set outputType(typeStr: string) {
    this._outputType = Dish.typeEnum(typeStr);
    if (this._presentType < 0) this._presentType = this._outputType;
  }

  get outputType(): string {
    return Dish.enumLookup(this._outputType);
  }

  set presentType(typeStr: string) {
    this._presentType = Dish.typeEnum(typeStr);
  }

  get presentType(): string {
    return Dish.enumLookup(this._presentType);
  }

  set args(conf: any[]) {
    conf.forEach((arg) => {
      const ingredient = new Ingredient(arg);
      this.addIngredient(ingredient);
    });
  }

  get args(): any[] {
    return this._ingList.map((ing) => ({
      name: ing.name,
      type: ing.type,
      value: ing.defaultValue,
      ...(ing.toggleValues && { toggleValues: ing.toggleValues }),
      ...(ing.hint && { hint: ing.hint }),
      ...(ing.rows && { rows: ing.rows }),
      ...(ing.disabled !== undefined && { disabled: ing.disabled }),
      ...(ing.target && { target: ing.target }),
      ...(ing.defaultIndex !== undefined && { defaultIndex: ing.defaultIndex }),
      ...(ing.maxLength !== undefined && { maxLength: ing.maxLength }),
      ...(typeof ing.min === "number" && { min: ing.min }),
      ...(typeof ing.max === "number" && { max: ing.max }),
      ...(ing.step && { step: ing.step }),
    }));
  }

  get config(): { op: string; args: any[] } {
    return {
      op: this.name,
      args: this._ingList.map((ing) => ing.config),
    };
  }

  addIngredient(ingredient: Ingredient) {
    this._ingList.push(ingredient);
  }

  set ingValues(ingValues: any[]) {
    ingValues.forEach((val, i) => {
      this._ingList[i].value = val;
    });
  }


  get ingValues(): any[] {
    return this._ingList.map((ing) => ing.value);
  }

  set breakpoint(value: boolean) {
    this._breakpoint = value;
  }

  get breakpoint(): boolean {
    return this._breakpoint;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get flowControl(): boolean {
    return this._flowControl;
  }

  set flowControl(value: boolean) {
    this._flowControl = value;
  }

  get manualBake(): boolean {
    return this._manualBake;
  }

  set manualBake(value: boolean) {
    this._manualBake = value;
  }
}