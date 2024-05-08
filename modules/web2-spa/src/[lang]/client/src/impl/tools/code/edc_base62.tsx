import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { CodeImplMap } from "./types";

loadDOT("QVC1DLGzr")


export default (): Partial<CodeImplMap> => {
    return {
        "node.js": {
            template: `
const base62 = require('base62');

// Encode example
const inputBuffer = Buffer.from('TEST12345', 'utf8');
const encodedString = base62.encode(inputBuffer);
console.log(encodedString);

// Decode example
const encodedStr = '...'  // Replace with the actual encoded value
const decodedBuffer = base62.decode(encodedStr);
console.log(decodedBuffer.toString('utf8'));
    `,
            howToRunItTips: (
                <p>
                    {Dot("u9g6t", "To run this code, you need to install the 'base62' package which provides Base62 encoding and decoding capabilities.")}<br />
                    {Dot("z7n1m", "You can install it using npm by running `npm install base62` or `yarn add base62`.")}
                    <br />
                    {Dot("v5k3r", "Once installed, replace the placeholder in the decode section with the actual Base62-encoded value and execute the script. The library handles conversion between Buffers and Base62 strings for you.")}
                </p>
            )
        },

        "python": {
            template: `
import base62

# Encode example
input_string = b'TEST12345'
encoded_string = base62.b62encode(input_string)
print(encoded_string.decode())

# Decode example
encoded_str = b'...'  # Replace with the actual encoded bytes (use b prefix for binary string)
decoded_bytes = base62.b62decode(encoded_str)
print(decoded_bytes.decode())
    `,
            howToRunItTips: (
                <p>
                    {Dot("x2c5e", "For Python, use the 'base62' library to handle Base62 encoding and decoding.")}<br />
                    {Dot("d8w1b", "Install it via pip by running `pip install python-base62` or `pip3 install python-base62`.")}
                    <br />
                    {Dot("c6p4n", "After installation, copy the provided template into your Python script, replace the placeholder in the decode part with the actual Base62-encoded bytes (prefixed with 'b'), then run the script.")}
                </p>
            )
        },

        "java": {
            template: `
import com.warrenstrange.googleauth.Base62Converter;

// Encode example
String input = "TEST12345";
byte[] inputBytes = input.getBytes(StandardCharsets.UTF_8);
int[] encodedInts = new Base62Converter().toBase62(inputBytes);
String encoded = "";
for (int i : encodedInts) {
    encoded += Integer.toString(i);
}
System.out.println(encoded);

// Decode example
String encodedStr = "..."; // Replace with the actual encoded value
int[] encodedInts = new Base62Converter().fromBase62(encodedStr);
byte[] decodedBytes = new Base62Converter().toIntArray(encodedInts);
String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
System.out.println(decoded);
    `,
            howToRunItTips: (
                <p>
                    {Dot("y3m7k", "For Java, utilize the 'google-authenticator' library's Base62Converter class.")}<br />
                    {Dot("f9t2z", "Add the dependency to your Maven project by adding `<dependency> <groupId>com.warrenstrange</groupId> <artifactId>googleauth</artifactId> <version>...</version> </dependency>` where version should be replaced with the latest release.")}
                    <br />
                    {Dot("q6n1r", "After installing the library, copy the provided template into a Java class and replace the placeholder with the actual encoded value before running the code. Note that this implementation uses integer arrays as an intermediate step.")}
                </p>),
            links: [
                {
                    name: "Google Authenticator GitHub Repository",
                    link: "https://github.com/wstrange/GoogleAuth"
                }
            ]
        },

        "csharp": {
            template: `
using System;
using WarrenStranger.Base62;

// Encode example
string input = "TEST12345";
byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
string encoded = Base62Converter.ToBase62String(inputBytes);
Console.WriteLine(encoded);

// Decode example
string encodedStr = "..."  // Replace with the actual encoded value
byte[] decodedBytes = Base62Converter.FromBase62String(encodedStr);
string decoded = System.Text.Encoding.UTF8.GetString(decodedBytes);
Console.WriteLine(decoded);
    `,
            howToRunItTips: (
                <p>
                    {Dot("j9s5r", "For C#, use the 'WarrenStranger.Base62' library to handle Base62 encoding and decoding.")}<br />
                    {Dot("p6e3n", "Install the package via NuGet by running `Install-Package WarrenStranger.Base62` in Package Manager Console or add it through NuGet Package Manager.")}
                    <br />
                    {Dot("z8qqm2t", "After installation, copy the provided template into a C# console application and replace the placeholder with the actual encoded value before running the program.")}
                </p>
            )
        },

        "cpp": {
            template: `
#include "base62.h"

// Encode example
std::string input = "TEST12345";
unsigned char inputBuffer[input.size()];
std::copy(input.begin(), input.end(), inputBuffer);
std::string encoded = base62::encode(inputBuffer, input.size());
std::cout << encoded << std::endl;

// Decode example
std::string encodedStr = "..."  // Replace with the actual encoded value
std::vector<unsigned char> decoded;
if (base62::decode(encodedStr, decoded)) {
    std::string decodedStr(decoded.begin(), decoded.end());
    std::cout << decodedStr << std::endl;
}
    `,
            howToRunItTips: (
                <p>
                    {Dot("g4h7s", "For C++, you can use the 'cpp-base62' library which provides Base62 functionality.")}<br />
                    {Dot("d2w6e", "Download the source code and include the base62.h header file in your project. Compile/link against the source files according to the project's instructions.")}
                    <br />
                    {Dot("c1p3b", "Once integrated, copy the provided template into your C++ program and replace the placeholder with the actual encoded value before running the program.")}
                </p>),
            links: [
                {
                    name: "cpp-base62 GitHub Repository",
                    link: "https://github.com/jaredonline/cpp-base62"
                }
            ]
        },

        "go": {
            template: `
package main

import (
    "fmt"
    "github.com/xyproto/base62"
)

func main() {
    // Encode example
    input := []byte("TEST12345")
    encoded := base62.Encode(input)
    fmt.Println(encoded)

    // Decode example
    encodedStr := "..."  // Replace with the actual encoded value
    decoded, _ := base62.Decode(encodedStr)
    fmt.Println(string(decoded))
}
    `,
            howToRunItTips: (
                <p>
                    {Dot("u7i9b", "For Go, utilize the 'base62' package available on GitHub.")}<br />
                    {Dot("r4n6v", "Add the dependency to your project by running `go get github.com/xyproto/base62`. This will download and install the package.")}
                    <br />
                    {Dot("k3m2e", "Copy the provided template into a new Go file, replace the placeholder with the actual encoded value, then run the file using `go run yourfile.go`")}
                </p>),
            links: [
                {
                    name: "base62 GitHub Repository",
                    link: "https://github.com/xyproto/base62"
                }
            ]
        },
        // ... Continue with additional languages ...
    }
}