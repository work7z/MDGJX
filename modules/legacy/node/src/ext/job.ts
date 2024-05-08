import fs from "fs";
import path from "path";
import { exit } from "process";

import {
  CategoryDefinition,
  JobProcesser,
  NodeReq,
  NodeRes,
  SubExtCategory,
} from "../node-types";
import { Dot_fn } from "../translation";
import Job_ListSubCategoryAndFunctions from "./Job_ListAllExtCategory";
import Job_ListCategory from "./Job_ListAllCategory";

const JobDefinition: { [key: string]: JobProcesser } = {
  Job_ListCategory: Job_ListCategory,
  Job_ListSubCategoryAndFunctions: Job_ListSubCategoryAndFunctions,
  // other are testing code
  example: async function (req: NodeReq): Promise<NodeRes<any> | null> {
    return null;
  },
  getMenuItems: async function (req: NodeReq): Promise<NodeRes<any> | null> {
    return null;
  },
  test: async function (req: NodeReq): Promise<NodeRes<any> | null> {
    return {
      Type: req.Type,
      Id: req.Id,
      Lang: req.Lang,
      OutputValue: "ackthis_is_testack",
    };
  },
  helloWorld: async function (req: NodeReq): Promise<NodeRes<any> | null> {
    let Dot = Dot_fn(req.Lang);
    return {
      Type: req.Type,
      Id: req.Id,
      Lang: req.Lang,
      OutputValue: Dot("jjhid", "this is hello, world"),
    };
  },
  randomCall: async function (req: NodeReq): Promise<NodeRes<any> | null> {
    let Dot = Dot_fn(req.Lang);
    // randomly sleep in 1 seconds
    let sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    let rand = Math.random();
    // if (rand < 0.5) {
    //   await sleep(1000 * rand);
    // }
    let fin = req.InputValue + "" + "ack";
    return {
      Type: req.Type,
      Id: req.Id,
      Lang: req.Lang,
      OutputValue: fin,
    };
  },
};

export default JobDefinition;
