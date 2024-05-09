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

export default async function (
  req: NodeReq,
): Promise<NodeRes<SubExtCategory[]> | null> {
  let Dot = Dot_fn(req.Lang);

  let sub_cache: SubExtCategory[] = [
    {
      CategoryId: "codec",
      Id: "codec.Digest_Algorithm",
      Label: Dot("y_BN6", "Digest Algorithm"),
      Icon: "segmented-control",
      Children: [
        {
          Layout: "form",
          Actions: [
            {
              Id: "sha224.text",
              Tooltip: Dot("PJNze", "Click here to encrypt your input text"),
              Label: Dot("o3poi.sha224", "SHA224 from Text"),
              CallFuncList: ["sha224.ConvertText"],
            },
            {
              Id: "sha224.file",
              Tooltip: Dot(
                "wqp_4",
                "Click here to select a file and directly encrypt it.",
              ),
              Label: Dot("gwo79.sha224", "SHA224 from File"),
              CallFuncList: ["sha224.ConvertFile"],
            },
          ],
          Info: {
            Id: "sha224",
            Label: Dot("TtyeA.sha224", "SHA224"),
            Description: Dot(
              "gh9zA.sha224",
              "SHA-224 is a cryptographic hash function that takes an input and produces a 224-bit (28-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-256, SHA-384, and SHA-512. SHA-224 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-224 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
            ),
          },
        },
        {
          Layout: "form",
          Actions: [
            {
              Id: "sha384.text",
              Label: Dot("o3poi.sha384", "SHA384 from Text"),
              Tooltip: Dot("E88Ej", "Click here to encrypt your input text"),
              CallFuncList: ["sha384.ConvertText"],
            },
            {
              Id: "sha384.file",
              Label: Dot("gwo79.sha384", "SHA384 from File"),
              Tooltip: Dot(
                "vhgr3",
                "Click here to select a file and directly encrypt it.",
              ),
              CallFuncList: ["sha384.ConvertFile"],
            },
          ],
          Info: {
            Id: "sha384",
            Label: Dot("TtyeA.sha384", "SHA384"),
            Description: Dot(
              "gh9zA.sha384",
              "SHA-384 is a cryptographic hash function that takes an input and produces a 384-bit (48-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-256, SHA-512, SHA-512/224, and SHA-512/256. SHA-384 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-384 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
            ),
          },
        },
        {
          Layout: "form",
          Actions: [
            {
              Id: "sha512.text",
              Tooltip: Dot("pl8S6", "Click here to encrypt your input text"),
              Label: Dot("o3poi.sha512", "SHA512 from Text"),
              CallFuncList: ["sha512.ConvertText"],
            },
            {
              Id: "sha512.file",
              Label: Dot("gwo79.sha512", "SHA512 from File"),
              CallFuncList: ["sha512.ConvertFile"],
            },
          ],
          Info: {
            Id: "sha512",
            Label: Dot("TtyeA.sha512", "SHA512"),
            Description: Dot(
              "gh9zA.sha512",
              "SHA-512 is a cryptographic hash function that takes an input and produces a 512-bit (64-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-256, SHA-384, SHA-512/224, and SHA-512/256. SHA-512 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-512 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
            ),
          },
        },
        {
          Layout: "form",
          Actions: [
            {
              Id: "sha256.text",
              Tooltip: Dot("qjQvD", "Click here to encrypt your input text"),
              Label: Dot("o3poi.sha256", "SHA256 from Text"),
              CallFuncList: ["sha256.ConvertText"],
            },
            {
              Id: "sha256.file",
              Label: Dot("gwo79.sha256", "SHA256 from File"),
              CallFuncList: ["sha256.ConvertFile"],
            },
          ],
          Info: {
            Id: "sha256",
            Label: Dot("TtyeA.sha256", "SHA256"),
            Description: Dot(
              "gh9zA.sha256",
              "SHA-256 is a cryptographic hash function that takes an input and produces a 256-bit (32-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-384, and SHA-512. SHA-256 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-256 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
            ),
          },
        },
        {
          Layout: "form",
          Actions: [
            {
              Id: "sha1.text",
              Label: Dot("o3poi", "SHA1 from Text"),
              Tooltip: Dot("ECm8j", "Click here to encrypt your input text"),
              CallFuncList: ["sha1.ConvertText"],
            },
            {
              Id: "sha1.file",
              Label: Dot("gwo79", "SHA1 from File"),
              CallFuncList: ["sha1.ConvertFile"],
            },
          ],
          Info: {
            Id: "sha1",
            Label: Dot("TtyeA", "SHA1"),
            Description: Dot(
              "gh9zA",
              "SHA-1 or Secure Hash Algorithm 1 is a cryptographic algorithm which takes an input and produces a 160-bit (20-byte) hash value.",
            ),
          },
        },
        {
          Layout: "form",
          Actions: [
            {
              Id: "md4.text",
              Label: Dot("IPtV", "MD4 from Text"),
              Tooltip: Dot("REFy8", "Click here to encrypt your input text"),
              CallFuncList: ["md4.ConvertText"],
            },
            {
              Id: "md4.file",
              Label: Dot("5-S-B", "MD4 from File"),
              CallFuncList: ["md4.ConvertFile"],
            },
          ],
          Info: {
            Id: "md4",
            Label: Dot("70PnM", "MD4"),
            Description: Dot(
              "7gKzt",
              "MD4 (Message-Digest Algorithm 4) is a cryptographic hash function that takes an input and produces a 128-bit (16-byte) hash value. \n\nIt was developed by Ronald Rivest in 1990 as a successor to MD2 and MD3. However, MD4 has been shown to be vulnerable to collision attacks, and is no longer considered secure for cryptographic purposes. MD4 is still used in some applications, but is being phased out in favor of more secure hash functions such as SHA-256 and SHA-3.",
            ),
          },
        },
        {
          Layout: "form",
          Actions: [
            {
              Id: "md2.text",
              Tooltip: Dot("P56UK", "Click here to encrypt your input text"),
              Label: Dot("IP8-V", "MD2 from Text"),
              CallFuncList: ["md2.ConvertText"],
            },
            {
              Id: "md2.file",
              Label: Dot("eNNrM", "MD2 from File"),
              CallFuncList: ["md2.ConvertFile"],
            },
          ],
          Info: {
            Id: "md2",
            Label: Dot("41ev7", "MD2"),
            Description: Dot(
              "6wtIW",
              "MD2 (Message-Digest Algorithm 2) is a cryptographic hash function that takes an input and produces a 128-bit (16-byte) hash value. \n\nIt was developed by Ronald Rivest in 1989 as a successor to MD1. MD2 is optimized for 8-bit computers and is relatively simple compared to other hash functions. However, MD2 has been shown to be vulnerable to collision attacks, and is no longer considered secure for cryptographic purposes. MD2 is still used in some applications, but is being phased out in favor of more secure hash functions such as SHA-256 and SHA-3.",
            ),
          },
        },
        {
          Layout: "form",
          Actions: [
            {
              Id: "md5.text",
              Label: Dot("vQq9v", "MD5 from Text"),
              CallFuncList: ["md5.ConvertText"],
            },
            {
              Id: "md5.file",
              Label: Dot("vu10K", "MD5 from File"),
              CallFuncList: ["md5.ConvertFile"],
            },
          ],
          Info: {
            Id: "md5",
            Label: Dot("AWqXD", "MD5"),
            Description: Dot(
              "g0QB9",
              `The MD5 message-digest algorithm is a widely used hash function producing a 128-bit hash value. MD5 was designed by Ronald Rivest in 1991 to replace an earlier hash function MD4,[3] and was specified in 1992 as RFC 1321. MD5 can be used as a checksum to verify data integrity against unintentional corruption. Historically it was widely used as a cryptographic hash function; however it has been found to suffer from extensive vulnerabilities. It remains suitable for other non-cryptographic purposes, for example for determining the partition for a particular key in a partitioned database, and may be preferred due to lower computational requirements than more recent Secure Hash Algorithms.[4]`,
            ),
          },
        },
        // end
      ],
    },
    // add items for "Encode and Decode", "Symmetric Crypto", "Asymmetric Crypto", "SM Algorithm" and "Web Auth" empty Children under CategoryId codec
    {
      CategoryId: "codec",
      Id: "codec.Encode_and_Decode",
      Label: Dot("y_2Q1", "Encode and Decode"),
      Icon: "widget-button",
      Children: [],
    },
    {
      CategoryId: "codec",
      Id: "codec.Symmetric_Crypto",
      Label: Dot("y_2Q2", "Symmetric Crypto"),
      Icon: "exchange",
      Children: [],
    },
    {
      CategoryId: "codec",
      Id: "codec.Asymmetric_Crypto",
      Label: Dot("y_2Q3", "Asymmetric Crypto"),
      Icon: "exchange",
      Children: [],
    },
    {
      CategoryId: "codec",
      Id: "codec.SM_Algorithm",
      Label: Dot("y_2Q4", "China National Algorithms"),
      Icon: "lock",
      Children: [],
    },
    {
      CategoryId: "codec",
      Id: "codec.Web_Auth",
      Label: Dot("y_2Q5", "Web Auth"),
      Icon: "shield",
      Children: [],
    },
  ];
  return {
    Type: req.Type,
    Id: req.Id,
    Lang: req.Lang,
    OutputValue: sub_cache,
  };
}
