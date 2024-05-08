import crypto from "crypto";
import { logger } from "../utils/logger";
import fs from "fs";
import sha256File from "sha256-file";
import stream from "stream";

export async function computeHash(filepath) {
  return sha256File(filepath);
}
