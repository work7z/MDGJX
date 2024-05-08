import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import xmlutils from '../../other/xmlutils.ts'
/**
 * XML to JSON operation
 */
class XMLToJSON extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: "json",
            config: {
                module: "Default",
                description: "",
                infoURL: "https://wikipedia.org/wiki/XML",
                inputType: "JSON",
                outputType: "string",
                args: [
                    {
                        name: "Cell delimiter",
                        type: "binaryShortString",
                        value: ",",
                    },
                    {
                        name: "Row delimiter",
                        type: "binaryShortString",
                        value: "\\r\\n",
                    },
                ],
                flowControl: false,
                manualBake: false,
            },
            infoURL: "https://wikipedia.org/wiki/XML",
            optName: Dot("opdqdkqw", "XML to JSON"),
            optDescription: Dot(
                "LXs6b7cPa",
                "Converts XML data to a JSON string."
            ),
            exampleInput: "<name>John</name><age>30</age><city>New York</city>",
            exampleOutput: "{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}",
        }
    }
    /**
     * XMLToJSON constructor
     */
    constructor() {
        super();

        this.name = "XML to JSON";
        this.module = "Default";
        this.inputType = "JSON";
        this.outputType = "string";
        this.args = [

        ];
    }
    flattened: any;
    cellDelim: any;
    rowDelim: any;


    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        let val = xmlutils.json2xml.getRawJsonFromStructXml(input)
        return val
    }

}

export default XMLToJSON;
