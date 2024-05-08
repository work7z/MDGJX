// LafTools
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu < work7z@outlook.com>
//   LafTools Team < work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import type {
  ToolCategory as ToolCategory,
  NodeReq,
  NodeRes,
  FlushIdValuePair,
} from "../purejs-types";
import _ from "lodash";


export default (): ToolCategory[] => {
  let appCategory: ToolCategory[] = [
    {
      Id: "all",
      Label: Dot("cPS6q", "All Tools"),
      SubCategories: [],
    },
    {
      Id: "codec",
      Label: Dot("ks12d", "Cyber Security"),
      SubCategories: [
        {
          Id: "codec.Encode_and_Decode",
          Label: Dot("y_2Q1", "Encode and Decode"),
          Icon: "widget-button",
          ChildrenIdSet: [
            "URLEncode",
            "edc_base32",
            "edc_base45",
            "edc_base58",
            "edc_base62",
            "edc_base64",
            "edc_base85",
            "bcd",
            "JSONEscape",
            "hex",
            "FromHexdump",
            "ToHexdump"
            // "edc_unicode",
            // "edc_base64-hex",
            // "edc_querystring",
          ],
        },
        {
          Id: "codec.Digest_Algorithm",
          Label: Dot("y_BN6", "Digest Algorithm"),
          Icon: "segmented-control",
          ChildrenIdSet: [
            "md2",
            "md4",
            "md5",
            "md6",
            "SHA512",
            "SHA384",
            "SHA256",
            "SHA224",
            "SHA0",
            "SHA1",
            "SHA2",
            "SHA3",
          ],
        },
        {
          Id: "codec.Symmetric_Crypto",
          Label: Dot("y_2Q2", "Symmetric Crypto"),
          Icon: "rect-width",
          ChildrenIdSet: [
            // "sym_pbe_md5_des",
            // "sym_pbe_sha1_rc2",
            // "sym_pbe_sha1_des",
            // "sym_rc6",
            // "sym_rc4",
            // "sym_rc5",
            // "sym_rc2",
            // "sym_triple_des",
            // "sym_blowfish",
            // "sym_des",
            // "sym_aes",
            // "sym_arc4",
            // chacha-20, etc...
          ],
        },
        {
          Id: "codec.Asymmetric_Crypto",
          Label: Dot("y_2Q3", "Asymmetric Crypto"),
          Icon: "inheritance",
          ChildrenIdSet: [
            // "asym_rsa",
            //
          ],
        },
        {
          Id: "codec.SM_Algorithm",
          Label: Dot("y_2Q4", "China National Algorithms"),
          Icon: "search-around",
          ChildrenIdSet: [
            // "sm2",
            //  "sm3", 
            //  "sm4"
          ],
        },
        {
          Id: "codec.Escape_and_unescape",
          Label: Dot("z1oFn", "Escape and Unescape"),
          Icon: "vertical-inbetween",
          ChildrenIdSet: [
            "URLEncode",
            "JSONEscape",
            "FromHexdump",
            "ToHexdump"
            // "esc_xml",
            // "esc_html",
            // "esc_csv",
            // "esc_java_string",
            // "esc_json",
            // "esc_javascript",
          ],
        },
        {
          Id: "codec.NamingRules",
          Label: Dot("n8vUMLVSV", "Naming Rules"),
          Icon: "vertical-inbetween",
          ChildrenIdSet: [
            "KebabCase",
            "ToLowerCase",
            "SnakeCase",
            "CharCode",
            "MorseCode",
          ],
        },

        {
          Id: "codec.Web_Auth",
          Label: Dot("y_2Q5", "Web Auth"),
          Icon: "shield",
          ChildrenIdSet: [
            // "jwt_encoder",
            // "jwt_decoder",
          ],
        },
      ],
    },
    {
      Id: "converter",
      Label: Dot("m0106", "Converter"),
      SubCategories: [
        {
          Id: "common_formats",
          Label: Dot("ui5pZ", "Common Formats"),
          Icon: "hat",
          ChildrenIdSet: [
            "JSONEscape",
            "CSVToJSON",
            "FromHexdump",
            "ToHexdump"
            // "curl_to_pl",
            // "curl_to_api",
            //
          ],
        },
        {
          Id: "command_parser",
          Label: Dot("ui5pZ", "Command Parser"),
          Icon: "hat",
          ChildrenIdSet: [
            // "curl_to_pl",
            // "curl_to_api",
            //
          ],
        },
        {
          Id: "file_tools",
          Label: Dot("gQhfS", "File Tools"),
          Icon: "saved",
          ChildrenIdSet: [
            // "correct_file_path",
            // "analyze_file_path",
            //
          ],
        },
      ],
    },

    {
      Id: "generater",
      Label: Dot("m0107", "Generater"),
      SubCategories: [
        {
          Id: "code_converter",
          Label: Dot("dCFIwC", "Code Generater"),
          Icon: "array-boolean",
          ChildrenIdSet: [
            // "gen_yaml_to_json",
            // "gen_sql_to_json",
            // "gen_dml_to_json",
          ],
        },
        {
          Id: "data_converter",
          Label: Dot("aSOpr", "Data Model Generater"),
          Icon: "array-boolean",
          ChildrenIdSet: [
            "CSVToJSON",
            // "json_to_model",
            // "xml_to_model",
            // "sql_to_model",
            //
          ],
        },
        {
          Id: "text_random",
          Label: Dot("unc9E", "Random Text"),
          Icon: "random",
          ChildrenIdSet: [
            // "rand_uuid",
            // "rand_mock",
            // "rand_plaintext",
            // "rand_sundrytext",
            // "rand_loremipsum",
          ],
        },
      ],
    },
    {
      Id: "formatter",
      Label: Dot("m0108", "Formatter"),
      SubCategories: [
        {
          Id: "code_prettier",
          Label: Dot("dCFIC", "Code Prettier"),
          Icon: "array-string",
          ChildrenIdSet: [
            "JSONBeautify",
            "JavaScriptBeautify",
            "XMLBeautify",
            "GenericCodeBeautify",
            "SQLBeautify",
            "YAMLBeautify",
            "HTMLBeautify",
            "CSSBeautify",
            "LessBeautify",
            "SCSSBeautify",
            "MarkdownBeautify",
            "TypeScriptBeautify",
            "GraphQLBeautify",

            //   {
            //     "name": "Code tidy",
            //     "ops": [
            //         "XPath expression",
            //         "JPath expression",
            //         "CSS selector",
            //         "PHP Deserialize",
            //         "Microsoft Script Decoder",
            //         "Strip HTML tags",
            //         "Diff",
            //         "To Snake case",
            //         "To Camel case",
            //         "To Kebab case",
            //         "BSON serialise",
            //         "BSON deserialise",
            //         "To MessagePack",
            //         "From MessagePack",
            //         "Render Markdown"
            //     ]
            // },


          ],
        },
        {
          Id: "code_minify",
          Label: Dot("6MrfIfGc6", "Code Minify"),
          Icon: "percentage",
          ChildrenIdSet: [
            "JSONMinify",
            "JavaScriptMinify",
            "XMLMinify",
            "SQLMinify",
            "CSSMinify",
            "JSONEscape",
          ],
        }
      ],
    },
    {
      Id: "text-tools",
      Label: Dot("-Yo1q29Iq", "Text Tools"),
      SubCategories: [
        {
          Id: "plain_text",
          Label: Dot("OJd-7SdMC", "Text Manipulation"),
          Icon: "array-string",
          ChildrenIdSet: [
            "Tail",
            "RemoveLineNumbers",
            "RemoveWhitespace",
            "Reverse"
          ]
        },
        {
          Id: "quick_diff",
          Label: Dot("yfYeg", "Quick Differenciate"),
          Icon: "search-text",
          ChildrenIdSet: [
            // "text_compare", 
            // "file_compare"
          ],
        },
        {
          Id: "general",
          Label: Dot("y_2Q5dqw", "Translation"),
          Icon: "translate",
          ChildrenIdSet: [
            // "dictionary",
            // "translate_json",
            // "translate_text",
            // "translate_properties",
            // "translate_customizer",
          ],
        },
        {
          Id: "ai_posh",
          Label: Dot("Ot6EP", "Polish Tools"),
          Icon: "send-to-graph",
          ChildrenIdSet: [
            // "write_by_ai",
            // "polish_by_ai",
            // "grammer_check",
            //
          ],
        },
        {
          Id: "text_matcher",
          Label: Dot("y_2Q5dqw", "Text Matcher"),
          Icon: "oil-field",
          ChildrenIdSet: [
            // "regex_tester",
            //
          ],
        },
        {
          Id: "text_template",
          Label: Dot("yfYeg", "Text Template"),
          Icon: "oil-field",
          ChildrenIdSet: [
            // "template_dotjs",
            // "template_handlebars",
            //
          ],
        },
      ],
    },
    {
      Id: "network_tools",
      Label: Dot("dGVUB", "Network Tools"),
      SubCategories: [
        {
          Id: "ip_tools",
          Label: Dot("a3z-3k12", "IP Address Tools"),
          Icon: "ip-address",
          ChildrenIdSet: [
            // "ipv4_masker",
            // "ipv4_to_long",
            // "ipv4_utility",
            // "ipv4_network_calculater",
            // "ipv4_address_converter",
            // "subnet_mask_tools", // include multiple tools
            // "nodes_host_calculater",
          ],
        },
      ],
    },
  ];

  _.forEach(appCategory, (x) => {
    // calculate its total count
    let totalCount = 0;
    _.forEach(x.SubCategories, (sub) => {
      _.forEach(sub.ChildrenIdSet, (x) => {
        totalCount++;
      });
    });
    x.TotalCount = totalCount;
  });
  appCategory[0].TotalCount = _.sumBy(appCategory, (x) => x.TotalCount || 0);

  return appCategory
};
