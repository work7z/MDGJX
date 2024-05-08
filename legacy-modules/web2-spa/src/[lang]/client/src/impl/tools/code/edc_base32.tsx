import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { CodeImplMap } from "./types";

loadDOT("eQH3q_N-X")


export default (): Partial<CodeImplMap> => {
    return {
        "node.js": {
            template: `const base32 = require('base32-encoding');

const input = 'TEST12345';
const encodedData = base32.encode(input, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=');
const decodedData = base32.decode(encodedData, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=');

console.log('Encoded:', encodedData.toString('utf8'));
console.log('Decoded:', decodedData.toString('utf8')); `,
            howToRunItTips: <p>
                {Dot("k9jtr", "The 'base32-encoding' npm package is used for Base32 encoding and decoding in Node.js.")}<br />
                {Dot("z5bvb", "Install it by running 'npm install base32-encoding'. Replace 'TEST12345' with your desired input data in the code snippet.")}<br />
                {Dot("y5nne", "This code can be run directly in a Node.js environment or as part of a larger project where you need Base32 functionality.")}
            </p>
        },

        "python": {
            template: `import base64

input_data = b'TEST12345'
encoded_data = base64.b32encode(input_data)
decoded_data = base64.b32decode(encoded_data)

print('Encoded:', encoded_data.decode())
print('Decoded:', decoded_data.decode())`,
            howToRunItTips: <p>
                {Dot("x8mdg", "Python's built-in 'base64' module provides Base32 encoding and decoding via the 'b32encode' and 'b32decode' functions.")}<br />
                {Dot("s7e9r", "No external libraries are needed. Simply replace the 'b'TEST12345'' with your actual bytes-like object to encode/decode.")}<br />
                {Dot("d6g0w", "This snippet can be executed in any Python environment, including scripts, interactive sessions, or within a larger application.")}
            </p>
        },
        "java": {
            template: `import org.apache.commons.codec.binary.Base32;

public class Main {
    public static void main(String[] args) {
        String input = "TEST12345";
        Base32 codec = new Base32();
        byte[] encodedBytes = codec.encode(input.getBytes());
        byte[] decodedBytes = codec.decode(encodedBytes);

        System.out.println("Encoded: " + new String(encodedBytes));
        System.out.println("Decoded: " + new String(decodedBytes));
    }
} `,
            howToRunItTips: <p>
                {Dot("c2tpr", "Apache Commons Codec library provides Base32 encoding and decoding functionality in Java.")}<br />
                {Dot("g5ybh", "Add the dependency to your project (Maven: 'org.apache.commons:commons-codec').")}<br />
                {Dot("r8c6z", "Replace 'TEST12345' with your own string and execute this class as a Java program to see results.")}
            </p>
        },

        "csharp": {
            template: `using System;
using Org.BouncyCastle.Utilities.Encoders;

class Program {
    static void Main(string[] args) {
        string input = "TEST12345";
        string encodedData = Base32.ToBase32String(Encoding.UTF8.GetBytes(input));
        byte[] decodedData = Base32.FromBase32String(encodedData);

        Console.WriteLine("Encoded: " + encodedData);
        Console.WriteLine("Decoded: " + Encoding.UTF8.GetString(decodedData));
    }
} `,
            howToRunItTips: <p>
                {Dot("v6qkl", "BouncyCastle NuGet package provides Base32 encoding and decoding in C#.")}<br />
                {Dot("f8wne", "Include the package by running 'Install-Package BouncyCastle' in Package Manager Console or adding it to your .csproj file.")}<br />
                {Dot("v9b7t", "Replace 'TEST12345' with your own string and run this console application to perform Base32 encoding and decoding operations.")}
            </p>
        },

        "cpp": {
            template: `#include <iostream>
#include <base32.h>

int main() {
    std::string input = "TEST12345";
    std::string encoded, decoded;

    base32::encode(input.begin(), input.end(), std::back_inserter(encoded));
    base32::decode(encoded.begin(), encoded.end(), std::back_inserter(decoded));

    std::cout << "Encoded: " << encoded << std::endl;
    std::cout << "Decoded: " << decoded << std::endl;

    return 0;
}`,
            howToRunItTips: <p>
                {Dot("m6t1b", "The 'base32' library by Daniel R. Collins provides Base32 encoding and decoding functionality in C++.")}<br />
                {Dot("x9g7e", "Download the source code from GitHub (https://github.com/dankamongmen/libbase32) or install it as a package if available for your platform.")}<br />
                {Dot("z8n6k", "Replace 'TEST12345' with your desired string, compile and run this program to see Base32 encoding and decoding results.")}
            </p>
        },

        "php": {
            template: `<?php
require_once 'vendor/autoload.php';
use Base32\\Base32;

$input = "TEST12345";
$encodedData = Base32::encode($input);
$decodedData = Base32::decode($encodedData);

echo "Encoded: $encodedData\n";
echo "Decoded: $decodedData\n";`,
            howToRunItTips: <p>
                {Dot("r8y2w", "The 'Base32' PHP library is used here for Base32 encoding and decoding.")}<br />
                {Dot("c9j5v", "Install it via Composer by adding 'composer require christian-riesen/base32' to your project.")}<br />
                {Dot("s5b8m", "Replace 'TEST12345' with your own data and execute this script in a PHP environment to perform Base32 operations.")}
            </p>
        },

        "go": {
            template: `package main

import (
	"fmt"
	"github.com/mitchellh/go-base32"
)

func main() {
	input := []byte("TEST12345")
	encoded := base32.StdEncoding.EncodeToString(input)
	decoded, _ := base32.StdEncoding.DecodeString(encoded)

	fmt.Println("Encoded:", encoded)
	fmt.Println("Decoded:", string(decoded))
}`,
            howToRunItTips: <p>
                {Dot("k7d9r", "The 'go-base32' package provides Base32 encoding and decoding capabilities in Go.")}<br />
                {Dot("g6f0t", "Run 'go get github.com/mitchellh/go-base32' to add the dependency to your project.")}<br />
                {Dot("y9z2e", "Replace 'TEST12345' with your actual byte slice and run this Go program to encode and decode using Base32 standard encoding.")}
            </p>
        },


        "rust": {
            template: `use base32::{decode, encode};

fn main() {
    let input = "TEST12345".as_bytes();
    let encoded_data = encode(input);
    let decoded_data = decode(encoded_data).unwrap();

    println!("Encoded: {}", String::from_utf8(encoded_data.to_vec()).unwrap());
    println!("Decoded: {}", String::from_utf8(decoded_data.to_vec()).unwrap());
}`,
            howToRunItTips: <p>
                {Dot("t7m4g", "The 'base32' crate is used for Base32 encoding and decoding in Rust.")}<br />
                {Dot("z9b6n", "Add it to your project's dependencies in the Cargo.toml file ('base32 = \"0.13.0\"').")}<br />
                {Dot("s5e8r", "Replace 'TEST12345' with your desired string and run this program to see the Base32 encoding and decoding results.")}
            </p>
        },

        "c": {
            // Note: C doesn't have a built-in Base32 library; you would need to use custom code or a third-party library.
            // Here's an example using libbase32:
            template: `#include "base32.h"

int main() {
    char input[] = "TEST12345";
    char encoded[BASE32_ENCODED_SIZE(sizeof(input))};
    char decoded[sizeof(input)};

    base32_encode(input, sizeof(input), encoded);
    base32_decode(encoded, decoded);

    printf("Encoded: %s\n", encoded);
    printf("Decoded: %s\n", decoded);

    return 0;
}`,
            howToRunItTips: <p>
                {Dot("x6v2w", "There isn't a standard Base32 library in C, so we're using a hypothetical 'libbase32' library here.")}<br />
                {Dot("c9j5k", "Download and include the 'base32.h' header and its corresponding implementation in your project.")}<br />
                {Dot("y8b1m", "Replace 'TEST12345' with your own data and ensure that the library functions are correctly implemented and linked to compile and execute this program for Base32 operations.")}
            </p>
        },




        "ruby": {
            template: `require 'base32'

input_data = "TEST12345"
encoded_data = Base32.encode(input_data)
decoded_data = Base32.decode(encoded_data)

puts "Encoded: #{encoded_data}"
puts "Decoded: #{decoded_data}"`,
            howToRunItTips: <p>
                {Dot("k7d9f", "Ruby's built-in 'base32' library provides methods for Base32 encoding and decoding.")}<br />
                {Dot("g6f0r", "No additional installation is required for Ruby's core libraries. Simply replace 'TEST12345' with your desired value.")}<br />
                {Dot("y9z2t", "Execute this script in a Ruby environment such as IRB or save it as a .rb file and run with 'ruby filename.rb'.")}
            </p>
        },

        "swift": {
            template: `import CryptoSwift

let input = "TEST12345".data(using: .utf8)!
let encodedData = try! Base32.encode(input)
let decodedData = try! Base32.decode(encodedData)

print("Encoded: \(String(data: encodedData, encoding: .utf8)!)")
print("Decoded: \(String(data: decodedData, encoding: .utf8)!)")`,
            howToRunItTips: <p>
                {Dot("t9m3g", "CryptoSwift is a popular Swift package that includes Base32 encoding and decoding functionality.")}<br />
                {Dot("z9b6n", "Add the dependency to your Xcode project via Swift Package Manager ('https://github.com/krzyzanowskim/CryptoSwift').")}<br />
                {Dot("s5e8r", "Replace 'TEST12345' with your actual data and run this snippet within a Swift application context to perform Base32 operations.")}
            </p>
        },
    }
}