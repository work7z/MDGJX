import type { CategoryDefinition, NodeReq, NodeRes } from "../node-types";

export default async function (
  req: NodeReq,
): Promise<NodeRes<CategoryDefinition[]> | null> {
  return {
    Type: req.Type,
    Id: req.Id,
    Lang: req.Lang,
    OutputValue: [],
  };
}
