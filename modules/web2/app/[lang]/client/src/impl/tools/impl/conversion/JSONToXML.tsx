import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import xmlutils from '../../other/xmlutils.ts'
/**
 * JSON to XML operation
 */
class JSONToXML extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: "json",
            config: {
                module: "Default",
                description: "Converts JSON data to an XML string.",
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
            optName: Dot("opdqdkqw", "JSON to XML"),
            optDescription: Dot(
                "opdddkqw",
                "Converts JSON data to an XML string.",
            ),
            exampleInput: "{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}",
            exampleOutput: "<name>John</name><age>30</age><city>New York</city>",
        }
    }
    /**
     * JSONToXML constructor
     */
    constructor() {
        super();

        this.name = "JSON to XML";
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
        let val = xmlutils.json2xml.getStructXmlFromRawJson(input)
        return val
    }

}

export default JSONToXML;
