import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { CodeImplMap } from "./types";

loadDOT("iBljsN0rM")


export default (): Partial<CodeImplMap> => {
    return {
        "node.js": {
            template: `
const base58 = require('base-x')('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

// Encode example
const inputBuffer = Buffer.from('TEST12345', 'utf8');
const encodedString = base58.encode(inputBuffer);
console.log(encodedString);

// Decode example
const encodedStr = '...'  // Replace with the actual encoded value
const decodedBuffer = base58.decode(encodedStr);
console.log(decodedBuffer.toString('utf8'));
    `,
            howToRunItTips: (
                <p>
                    {Dot("u9g6t", "To run this code, you need to install the 'base-x' package which supports Base58 encoding and decoding.")}<br />
                    {Dot("z7n1m", "Install it via npm by running `npm install base-x` or `yarn add base-x`.")}
                    <br />
                    {Dot("v5k3r", "This library provides a flexible API for creating base encodings, including Base58. Once installed, replace the placeholder in the decode section with the actual encoded value and execute the script.")}
                </p>
            )
        },

        "python": {
            template: `
import base58

# Encode example
input_string = b'TEST12345'
encoded_string = base58.b58encode(input_string)
print(encoded_string.decode())

# Decode example
encoded_str = b'...'  # Replace with the actual encoded bytes (use b prefix for binary string)
decoded_bytes = base58.b58decode(encoded_str)
print(decoded_bytes.decode())
    `,
            howToRunItTips: (
                <p>
                    {Dot("x2c5e", "Python's built-in 'base58' module can be used for Base58 encoding and decoding.")}<br />
                    {Dot("d8w1b", "No additional installation is needed as it comes with the standard library. However, ensure your Python version is recent enough to include this functionality.")}
                    <br />
                    {Dot("c6p4n", "In the provided template, replace the placeholder in the decode part with the actual Base58-encoded bytes (prefixed with 'b' for binary string), then run the script.")}
                </p>
            )
        },

        "java": {
            template: `
import org.bitcoinj.core.Base58;

// Encode example
String input = "TEST12345";
byte[] inputBytes = input.getBytes(StandardCharsets.UTF_8);
byte[] encodedBytes = Base58.encode(inputBytes);
System.out.println(new String(encodedBytes));

// Decode example
byte[] encodedBytes = Base58.decode("...");
String decoded = new String(encodedBytes, StandardCharsets.UTF_8);
System.out.println(decoded);
    `,
            howToRunItTips: (
                <p>
                    {Dot("y3m7k", "For Java, utilize the 'bitcoinj' library which includes Base58 encoding and decoding functionality.")}<br />
                    {Dot("f9t2z", "Add the dependency to your Maven project by adding `<dependency> <groupId>org.bitcoinj</groupId> <artifactId>bitcoinj-core</artifactId> <version>...</version> </dependency>` where version should be replaced with the latest release.")}
                    <br />
                    {Dot("q6n1r", "After installing the library, copy the template code into a Java class and replace the placeholder with the actual encoded value before running the code.")}
                </p>),
            links: [
                {
                    name: "bitcoinj GitHub Repository",
                    link: "https://github.com/bitcoinj/bitcoinj"
                }
            ]
        },

        "csharp": {
            template: `
using NBitcoin;

// Encode example
string input = "TEST12345";
var inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
var encoded = Base58.Encode(inputBytes);
Console.WriteLine(encoded);

// Decode example
string encodedStr = "..."  // Replace with the actual encoded value
var decodedBytes = Base58.Decode(encodedStr);
string decoded = System.Text.Encoding.UTF8.GetString(decodedBytes);
Console.WriteLine(decoded);
    `,
            howToRunItTips: (
                <p>
                    {Dot("j9s5r", "For C#, use the 'NBitcoin' library to handle Base58 encoding and decoding.")}<br />
                    {Dot("p6e3n", "Install the package via NuGet by running `Install-Package NBitcoin` in Package Manager Console or add it through NuGet Package Manager.")}
                    <br />
                    {Dot("z8em2t", "After installation, copy the provided template into a C# console application and replace the placeholder with the actual encoded value before running the program.")}
                </p>
            )
        },

        "cpp": {
            template: `
#include "base58.h"

// Encode example
std::string input = "TEST12345";
unsigned char inputBuffer[input.size()];
std::copy(input.begin(), input.end(), inputBuffer);
std::string encoded = Bitcoin::Base58Check::Encode(inputBuffer, input.size());
std::cout << encoded << std::endl;

// Decode example
std::string encodedStr = "..."  // Replace with the actual encoded value
std::vector<unsigned char> decoded;
if (Bitcoin::Base58Check::Decode(decoded, encodedStr)) {
    std::string decodedStr(decoded.begin(), decoded.end());
    std::cout << decodedStr << std::endl;
}
    `,
            howToRunItTips: (
                <p>
                    {Dot("g4h7s", "For C++, you can use the 'bitcoin-unlimited-libraries' which provides Base58 functionality.")}<br />
                    {Dot("d2w6e", "Clone/download the repository, include the base58.h header file in your project, and compile/link against the source files according to the project's instructions.")}
                    <br />
                    {Dot("c1p3b", "Once integrated, copy the provided template into your C++ program and replace the placeholder with the actual encoded value before running the program.")}
                </p>),
            links: [
                {
                    name: "bitcoin-unlimited-libraries GitHub Repository",
                    link: "https://github.com/BitcoinUnlimited/BitcoinUnlimitedLibraries"
                }
            ]
        },

        "go": {
            template: `
package main

import (
    "fmt"
    "github.com/btcsuite/btcutil/base58"
)

func main() {
    // Encode example
    input := []byte("TEST12345")
    encoded := base58.Encode(input)
    fmt.Println(encoded)

    // Decode example
    encodedStr := "..."  // Replace with the actual encoded value
    decoded, _ := base58.Decode(encodedStr)
    fmt.Println(string(decoded))
}
    `,
            howToRunItTips: (
                <p>
                    {Dot("u7i9b", "For Go, utilize the 'btcutil' package available on GitHub, specifically its base58 module.")}<br />
                    {Dot("r4n6v", "Add the dependency to your project by running `go get github.com/btcsuite/btcutil`. This will download and install the package.")}
                    <br />
                    {Dot("k3m2e", "Copy the provided template into a new Go file, replace the placeholder with the actual encoded value, then run the file using `go run yourfile.go`")}
                </p>),
            links: [
                {
                    name: "btcutil GitHub Repository",
                    link: "https://github.com/btcsuite/btcutil"
                }
            ]
        },
    }
}