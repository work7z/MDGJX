import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { CodeImplMap } from "./types";

loadDOT("4bXVfhUUv")


export default (): Partial<CodeImplMap> => {
    return {
        "node.js": {
            template: `
const base85 = require('base85');

// Encode example
const inputBuffer = Buffer.from('TEST12345', 'utf8');
const encodedString = base85.encode(inputBuffer);
console.log(encodedString);

// Decode example
const encodedStr = '...'  // Replace with the actual encoded value
const decodedBuffer = base85.decode(encodedStr);
console.log(decodedBuffer.toString('utf8'));
    `,
            howToRunItTips: (
                <p>
                    {Dot("u9g6t", "For JavaScript, you need to install the 'base85' package for Base85 encoding and decoding.")}<br />
                    {Dot("z7n1m", "Install it using npm by running `npm install base85` or `yarn add base85`.")}
                    <br />
                    {Dot("v5k3r", "Once installed, replace the placeholder in the decode section with the actual Base85-encoded string and run the script. The library handles conversion between Buffers and Base85 strings.")}
                </p>
            )
        },

        "python": {
            template: `
import base85

# Encode example
input_string = b'TEST12345'
encoded_string = base85.b85encode(input_string)
print(encoded_string.decode())

# Decode example
encoded_str = b'...'  # Replace with the actual encoded bytes (use b prefix for binary string)
decoded_bytes = base85.b85decode(encoded_str)
print(decoded_bytes.decode())
    `,
            howToRunItTips: (
                <p>
                    {Dot("x2c5e", "Python has a built-in 'base85' module that supports Base85 encoding and decoding.")}<br />
                    {Dot("d8w1b", "No additional installation is needed since it's part of the standard library. Ensure your Python version is recent enough to include this functionality.")}
                    <br />
                    {Dot("c6p4n", "In the provided template, replace the placeholder in the decode part with the actual Base85-encoded bytes (prefixed with 'b'), then execute the script.")}
                </p>
            )
        },

        "java": {
            template: `
import net.sourceforge.sizeof.SizeOf;
import net.sourceforge.sizeof.annotations.SizeOfHint;
import org.apache.commons.codec.binary.Base85;

// Encode example
String input = "TEST12345";
byte[] inputBytes = input.getBytes(StandardCharsets.UTF_8);
String encoded = new String(Base85.encodeBase85(inputBytes));
System.out.println(encoded);

// Decode example
String encodedStr = "..."  // Replace with the actual encoded value
byte[] decodedBytes = Base85.decodeBase85(encodedStr.getBytes(StandardCharsets.US_ASCII));
String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
System.out.println(decoded);
    `,
            howToRunItTips: (
                <p>
                    {Dot("y3m7k", "For Java, use the 'commons-codec' library which includes support for Base85 encoding and decoding.")}<br />
                    {Dot("f9t2z", "Add the dependency to your Maven project by including `<dependency> <groupId>commons-codec</groupId> <artifactId>commons-codec</artifactId> <version>...</version> </dependency>` in your pom.xml file with the latest version number.")}
                    <br />
                    {Dot("q6n1r", "After installing the library, copy the template code into a Java class and replace the placeholder with the actual Base85-encoded value before running the code.")}
                </p>),
            links: [
                {
                    name: "Apache Commons Codec",
                    link: "https://commons.apache.org/proper/commons-codec/"
                }
            ]
        },

    }
}