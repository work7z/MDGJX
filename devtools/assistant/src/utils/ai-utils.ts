import { response } from "express";
import { logger } from "./logger";
import axios from "axios";

export type AIResponse = {
  output: {
    finish_reason: string;
    text: string;
  };
  usage: {
    total_tokens: number;
    output_tokens: number;
    input_tokens: number;
  };
  request_id: string;
};
let AIUtils = {
  askZhipu: async function (
    input: {
      role: "system" | "user" | "assistant";
      content: string;
    }[],
  ): Promise<{
    result: string;
    response: any;
  } | null> {
    let token = process.env.ZPKEY;
    let model = "glm-4";
    if (!token) {
      logger.error("AIUtils.say: token not found");
      return null;
    }

    logger.info("AIUtils zhipu is in process");

    // 发起请求
    let resp = await axios({
      method: "POST",
      url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: JSON.stringify({
        model: model,
        temperature: 0.3,
        messages: input,
      }),
    });
    let rdata = resp.data;
    let responseText = rdata.choices[0].message.content;
    logger.info("rdata: " + JSON.stringify(rdata));
    logger.info("response text:" + responseText);
    return {
      result: responseText,
      response: rdata,
    };
  },
  askQwen: async function (
    input: {
      role: "system" | "user" | "assistant";
      content: string;
    }[],
  ): Promise<AIResponse | null> {
    let token = process.env.TYKEY;
    let option = "qwen-max-longcontext";
    if (!token) {
      logger.error("AIUtils.say: token not found");
      return null;
    }

    logger.info("AIUtils.say: input: " + input);

    // 发起请求
    let resp = await axios({
      method: "POST",
      url: "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: JSON.stringify({
        model: option,
        input: {
          messages: input,
          // [
          //   // { role: "system", content: chatMgs.getSystemMsg() },
          //   // { role: "user", content: chatMgs.getUserMsg("hello") },
          //   // { role: "assistant", content: "你好" },
          //   // { role: "user", content: origin },
          //   { role: "user", content: input },
          // ],
        },
        parameters: {},
      }),
    });
    let rdata = resp.data;
    let responseText = rdata;
    logger.info("rdata: " + JSON.stringify(rdata));
    logger.info("response text:" + responseText);
    return responseText as AIResponse;
  },
};

logger.info("AI Utils loaded successfully");

export default AIUtils;
