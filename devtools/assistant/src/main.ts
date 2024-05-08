import { logger } from "./utils/logger.js";
import AIUtils from "./utils/ai-utils";

async function main() {}

async function qwen(requireText: string) {
  let r = await AIUtils.askQwen([
    {
      role: "user",
      content: requireText,
    },
  ]);
  if (r) {
    logger.info("AI replied: " + r.output.text);
  }
}

main();
