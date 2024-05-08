
import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot, } from '@/[lang]/client/src/utils/cTranslationUtils';
import { CodeImplMap, CodeImplDetail, PopularLanguages } from './types'

loadDOT("2y1Hd1Qaw")

export default (): Partial<CodeImplMap> => {
  return {
    "node.js": {
      template: `const input = 'TEST12345';
const encodedData = Buffer.from(input, 'utf8').toString('base64');
const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');

console.log('Encoded:', encodedData);
console.log('Decoded:', decodedData);`,
      howToRunItTips: <p>{Dot("h7rUq", "In Node.js, the built-in 'Buffer' class can handle Base64 encoding and decoding without requiring any external libraries. This code snippet encodes the string 'TEST12345' to Base64 and then decodes it back to the original string.")}</p>
    },

    "python": {
      template: `import base64

input_data = 'TEST12345'
encoded_data = base64.b64encode(input_data.encode('utf-8'))
decoded_data = base64.b64decode(encoded_data).decode('utf-8')

print('Encoded:', encoded_data.decode('utf-8'))
print('Decoded:', decoded_data)`,
      howToRunItTips: <p>{Dot("z9kVv", "Python has a built-in 'base64' module which provides methods for Base64 encoding and decoding. The input string is first converted to bytes using UTF-8 encoding before being encoded to Base64, and then decoded back to its original form.")}</p>
    },

    "java": {
      template: `import java.util.Base64;

public class Main {
    public static void main(String[] args) {
        String input = "TEST12345";
        byte[] inputBytes = input.getBytes(java.nio.charset.StandardCharsets.UTF_8);

        // Encode
        String encodedString = Base64.getEncoder().encodeToString(inputBytes);
        System.out.println("Encoded: " + encodedString);

        // Decode
        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        String decodedString = new String(decodedBytes, java.nio.charset.StandardCharsets.UTF_8);
        System.out.println("Decoded: " + decodedString);
    }
}`,
      howToRunItTips: <p>{Dot("sKx5t", "Java's built-in 'java.util.Base64' class, available since Java 8, provides methods for Base64 encoding and decoding. The input string is converted to bytes using UTF-8 encoding, then encoded and decoded as needed.")}</p>
    },

    "csharp": {
      template: `using System;
using System.Text;

class Program {
    static void Main() {
        string input = "TEST12345";
        byte[] inputBytes = Encoding.UTF8.GetBytes(input);

        // Encode
        string encodedString = Convert.ToBase64String(inputBytes);
        Console.WriteLine("Encoded: " + encodedString);

        // Decode
        byte[] decodedBytes = Convert.FromBase64String(encodedString);
        string decodedString = Encoding.UTF8.GetString(decodedBytes);
        Console.WriteLine("Decoded: " + decodedString);
    }
}`,
      howToRunItTips: <p>{Dot("dWbBm", "C# includes the 'System.Convert' class with built-in methods ToBase64String and FromBase64String that allow you to encode and decode Base64 data. The input string is first converted to a byte array using UTF-8 encoding, then encoded and decoded accordingly.")}</p>
    },

    "cpp": {
      template: `// C++ example requires OpenSSL library
#include <openssl/bio.h>
#include <openssl/evp.h>
#include <openssl/buffer.h>

std::string base64_encode(const std::string &input) {
    BIO *bio, *b64;
    BUF_MEM *bufferPtr;

    bio = BIO_new(BIO_s_mem());
    b64 = BIO_new(BIO_f_base64());
    bio = BIO_push(b64, bio);

    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL); //Ignore newlines - write everything in one line
    BIO_write(bio, input.c_str(), input.length());
    BIO_flush(bio);
    BIO_get_mem_ptr(bio, &bufferPtr);
    BIO_set_close(bio, BIO_NOCLOSE);
    BIO_free_all(bio);

    std::string output(bufferPtr->data, bufferPtr->length);
    BUF_MEM_free(bufferPtr);

    return output;
}

std::string base64_decode(const std::string &input) {
    BIO *bio, *b64;
    int decodeLength = calcDecodeLength(input);
    char* buffer = (char*)malloc(decodeLength + 1);

    bio = BIO_new_mem_buf(input.data(), -1);
    b64 = BIO_new(BIO_f_base64());
    bio = BIO_push(b64, bio);

    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL); //Do not use newlines to flush buffer
    int length = BIO_read(bio, buffer, input.length());
    buffer[length] = '\0';

    BIO_free_all(bio);

    std::string output(buffer);
    free(buffer);

    return output;
}

int main() {
    std::string input = "TEST12345";
    std::string encoded = base64_encode(input);
    std::string decoded = base64_decode(encoded);

    std::cout << "Encoded: " << encoded << std::endl;
    std::cout << "Decoded: " << decoded << std::endl;

    return 0;
}`,
      howToRunItTips: <p>{Dot("gT6re", "C++ does not have a native Base64 implementation. This example uses OpenSSL library to perform Base64 encoding and decoding. To use OpenSSL, install it on your system and link against the appropriate libraries when compiling your program.")}</p>
    },

    "php": {
      template: `<?php
$input = 'TEST12345';
$encodedData = base64_encode($input);
$decodedData = base64_decode($encodedData);

echo "Encoded: " . $encodedData . "\n";
echo "Decoded: " . $decodedData . "\n";`,
      howToRunItTips: <p>{Dot("jZvLJ", "PHP comes with built-in functions 'base64_encode()' and 'base64_decode()' for handling Base64 operations. These functions are readily available and require no additional setup or installation.")}</p>
    },

    "go": {
      template: `package main

import (
	"encoding/base64"
	"fmt"
)

func main() {
	input := "TEST12345"
	encodedData := base64.StdEncoding.EncodeToString([]byte(input))
	decodedData, _ := base64.StdEncoding.DecodeString(encodedData)

	fmt.Println("Encoded:", encodedData)
	fmt.Println("Decoded:", string(decodedData))
}`,
      howToRunItTips: <p>{Dot("tR8pY", "Go provides a standard library package 'encoding/base64' with functions for Base64 encoding and decoding. No external dependencies are required; simply import this package into your Go program and call the appropriate functions.")}</p>
    },

    "rust": {
      template: `use base64::{encode, decode};

fn main() {
    let input = "TEST12345".as_bytes();
    let encoded_data = encode(input);
    let decoded_data = decode(encoded_data).unwrap();

    println!("Encoded: {}", encoded_data);
    println!("Decoded: {:?}", String::from_utf8(decoded_data).unwrap());
}`,
      howToRunItTips: <p>{Dot("eN4fM", "In Rust, you can use the 'base64' crate for Base64 encoding and decoding. Add 'base64 = \"1.x\"' to your Cargo.toml file under the [dependencies] section, run 'cargo build', and include the necessary imports in your code to utilize these functions.")}</p>
    },

    "c": {
      template: `// C example requires OpenSSL library
#include <stdio.h>
#include <string.h>
#include <openssl/bio.h>
#include <openssl/evp.h>
#include <openssl/buffer.h>

// Function to calculate the size of the buffer needed for decoding Base64
size_t calcDecodeLength(const char* b64input) {
    int len = strlen(b64input), padding = 0;
    if (b64input[len-1] == '=' && b64input[len-2] == '=') 
        padding = 2;
    else if (b64input[len-1] == '=')
        padding = 1;

    return ((len * 3) / 4) - padding;
}

void base64_encode_decode(const char* input) {
    BIO *bio, *b64;
    BUF_MEM *bufferPtr;
    
    const char* encodedInput = NULL;
    char decodedBuffer[calcDecodeLength(input) + 1];

    // Encode
    bio = BIO_new(BIO_s_mem());
    b64 = BIO_new(BIO_f_base64());
    bio = BIO_push(b64, bio);
    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL); // Ignore newlines
    BIO_write(bio, input, strlen(input));
    BIO_flush(bio);
    BIO_get_mem_ptr(bio, &bufferPtr);
    BIO_set_close(bio, BIO_NOCLOSE);
    BIO_free_all(bio);
    encodedInput = bufferPtr->data;

    printf("Encoded: %s\n", encodedInput);

    // Decode
    bio = BIO_new_mem_buf(encodedInput, -1);
    b64 = BIO_new(BIO_f_base64());
    bio = BIO_push(b64, bio);
    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL); // Do not use newlines to flush buffer
    BIO_read(bio, decodedBuffer, calcDecodeLength(encodedInput));
    decodedBuffer[BIO_number_read(bio)] = '\0';
    BIO_free_all(bio);

    printf("Decoded: %s\n", decodedBuffer);

    // Free memory allocated by OpenSSL
    BUF_MEM_free(bufferPtr);
}

int main() {
    const char* input = "TEST12345";
    base64_encode_decode(input);
    return 0;
}`,
      howToRunItTips: <p>{Dot("uW7eZ", "In C, there's no native Base64 implementation. This example uses OpenSSL library for Base64 encoding and decoding. To use this code snippet, install OpenSSL on your system and link against the appropriate libraries when compiling your program using a command similar to 'gcc -o base64_example base64_example.c -lssl -lcrypto'.")}</p>
    },





    "ruby": {
      template: `require 'base64'

input_data = 'TEST12345'
encoded_data = Base64.strict_encode64(input_data)
decoded_data = Base64.decode64(encoded_data)

puts "Encoded: #{encoded_data}"
puts "Decoded: #{decoded_data}"`,
      howToRunItTips: <p>{Dot("kZd9G", "Ruby has a built-in 'base64' library that provides methods for Base64 encoding and decoding. Include the library with 'require \"base64\"' in your script.")}</p>
    },

    "swift": {
      template: `import Foundation

let input = "TEST12345"
let data = input.data(using: .utf8)!
let encodedData = data.base64EncodedString()
let decodedData = Data(base64Encoded: encodedData)!.string(using: .utf8)!

print("Encoded: \(encodedData)")
print("Decoded: \(decodedData)")`,
      howToRunItTips: <p>{Dot("jRzgS", "Swift's Foundation framework includes built-in methods for Base64 encoding and decoding. No external libraries are needed; simply import 'Foundation' to use these features.")}</p>
    },

    "kotlin": {
      template: `import android.util.Base64

val input = "TEST12345".toByteArray(Charsets.UTF_8)
val encodedData = Base64.encodeToString(input, Base64.DEFAULT)
val decodedData = String(Base64.decode(encodedData, Base64.DEFAULT), Charsets.UTF_8)

println("Encoded: $encodedData")
println("Decoded: $decodedData")`,
      howToRunItTips: <p>{Dot("rLXJN", "In Kotlin, Android's built-in 'android.util.Base64' class can be used for Base64 encoding and decoding. This example assumes an Android environment; for non-Android Kotlin projects, consider using 'java.util.Base64'.")}</p>
    },

    // ... Similar templates and tips for other languages ...

    "scala": {
      template: `import java.util.Base64

val input = "TEST12345".getBytes("UTF-8")
val encodedData = Base64.getEncoder.encodeToString(input)
val decodedData = new String(Base64.getDecoder.decode(encodedData), "UTF-8")

println(s"Encoded: $encodedData")
println(s"Decoded: $decodedData")`,
      howToRunItTips: <p>{Dot("sBxHr", "Scala uses Java's built-in 'java.util.Base64' class for Base64 operations. Ensure you're running on a JVM platform with Java 8 or higher.")}</p>
    },

    "perl": {
      template: `use MIME::Base64;

my $input = "TEST12345";
my $encodedData = encode_base64($input);
my $decodedData = decode_base64($encodedData);

print "Encoded: $encodedData\n";
print "Decoded: $decodedData\n";`,
      howToRunItTips: <p>{Dot("fTt2N", "Perl requires the 'MIME::Base64' module for Base64 encoding and decoding. Install it by running 'cpan install MIME::Base64' if not already installed.")}</p>
    },

  }
}