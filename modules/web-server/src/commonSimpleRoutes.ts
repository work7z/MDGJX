import { Response } from "express";

export type AsyncCreateResponse<T> = {
  message?: string; // normal message
  error?: string; // error
  data: T;
};
export const sendRes = (res: Response, value: AsyncCreateResponse<any>) => {
  res.send(value);
};
