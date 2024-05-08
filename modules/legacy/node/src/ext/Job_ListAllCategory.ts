import type { CategoryDefinition, NodeReq, NodeRes } from "../node-types";
import { Dot_fn } from "../translation";

export default async function (
  req: NodeReq,
): Promise<NodeRes<CategoryDefinition[]> | null> {
  let Dot = Dot_fn(req.Lang);
  return {
    Type: req.Type,
    Id: req.Id,
    Lang: req.Lang,
    OutputValue: [
      { Id: "all", Label: Dot("cPS6q", "All Tools") },
      { Id: "codec", Label: Dot("m0105", "Codec") },
      { Id: "convertor", Label: Dot("m0106", "Converter") },
      { Id: "generator", Label: Dot("m0107", "Generator") },
      { Id: "formatter", Label: Dot("m0108", "Formatter") },
      { Id: "docs", Label: Dot("m0109", "Docs Center") },
    ],
  };
}
