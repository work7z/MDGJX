import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";
import { CodeImplMap } from "./types";


loadDOT("Etm4CCFq4")

export default (): Partial<CodeImplMap> => {
    return {
        "node.js": {
            template: `
const crypto = require('crypto');

// Get MD5 hash example
const inputString = 'TEST12345';
const hash = crypto.createHash('md5').update(inputString).digest('hex');
console.log(hash);
    `,
            howToRunItTips: (
                <p>
                    {Dot("md5-nodejs-built-in-0001", "In Node.js, the built-in 'crypto' module is used for generating MD5 hashes.")}<br />
                    {Dot("md5-nodejs-no-install-0002", "No external library installation is required since 'crypto' comes pre-installed with Node.js.")}
                    <br />
                    {Dot("md5-nodejs-use-0003", "The snippet creates a hash object using `createHash('md5')`, updates it with the input string, and then converts the digest to hexadecimal format via `.digest('hex')`. Paste this code into your Node.js script and execute it to get the MD5 hash of the input value.")}
                </p>
            )
        },

        "python": {
            template: `
import hashlib

# Get MD5 hash example
input_string = "TEST12345"
hash_object = hashlib.md5(input_string.encode())
hex_digested = hash_object.hexdigest()
print(hex_digested)
    `,
            howToRunItTips: (
                <p>
                    {Dot("md5-python-built-in-0001", "Python uses the built-in 'hashlib' library for generating MD5 hashes.")}<br />
                    {Dot("md5-python-no-install-0002", "No additional installation is needed as 'hashlib' comes standard with Python.")}
                    <br />
                    {Dot("md5-python-use-0003", "The provided template encodes the input string to bytes before creating an MD5 hash object. The '.hexdigest()' method is then called on the hash object to retrieve the MD5 hash in hexadecimal form. Copy this code into a Python script and run it to obtain the MD5 hash.")}
                </p>
            )
        },

        "java": {
            template: `
import java.security.MessageDigest;
import java.util.Base64;

public class Main {
    public static void main(String[] args) throws Exception {
        String input = "TEST12345";
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hashBytes = md.digest(input.getBytes());
        String encodedHash = Base64.getEncoder().encodeToString(hashBytes);
        System.out.println(encodedHash);
    }
}
    `,
            howToRunItTips: (
                <p>
                    {Dot("md5-java-built-in-0001", "Java uses the 'java.security.MessageDigest' class to generate MD5 hashes.")}<br />
                    {Dot("md5-java-imports-0002", "You need to import 'java.security.MessageDigest' and 'java.util.Base64' for hashing and encoding the result.")}
                    <br />
                    {Dot("md5-java-use-0003", "The snippet gets an instance of the MD5 digest algorithm, updates it with the input string's bytes, and then encodes the resulting hash into a Base64 string. Copy this code into a Java class and execute its main method to get the Base64-encoded MD5 hash.")}
                </p>
            ),
            links: [
                {
                    name: "Oracle Docs - MessageDigest",
                    link: "https://docs.oracle.com/javase/8/docs/api/java/security/MessageDigest.html"
                },
                {
                    name: "Oracle Docs - Base64",
                    link: "https://docs.oracle.com/javase/8/docs/api/java/util/Base64.html"
                }
            ]
        },

        "csharp": {
            template: `
using System;
using System.Security.Cryptography;
using System.Text;

class Program {
    static void Main() {
        string input = "TEST12345";
        MD5 md5 = MD5.Create();
        byte[] inputBytes = Encoding.UTF8.GetBytes(input);
        byte[] hashBytes = md5.ComputeHash(inputBytes);
        string encodedHash = Convert.ToBase64String(hashBytes);
        Console.WriteLine(encodedHash);
    }
}
    `,
            howToRunItTips: (
                <p>
                    {Dot("md5-csharp-built-in-0001", "In C#, the 'System.Security.Cryptography.MD5' class is used to generate MD5 hashes.")}<br />
                    {Dot("md5-csharp-no-install-0002", "No external library installation is needed since it's part of .NET Framework/Core.")}
                    <br />
                    {Dot("md5-csharp-use-0003", "This snippet creates an MD5 instance, converts the input string to bytes, computes the hash, and finally encodes the hash in Base64 format. Place this code in your C# application's entry point and run it to obtain the Base64-encoded MD5 hash.")}
                </p>
            )
        },


        "cpp": {
            template: `
#include <iostream>
#include <sstream>
#include <iomanip>
#include <openssl/md5.h>

std::string getMD5(const std::string& input) {
    unsigned char result[MD5_DIGEST_LENGTH];
    MD5(reinterpret_cast<const unsigned char*>(input.c_str()), input.size(), result);

    std::stringstream ss;
    for (int i = 0; i < MD5_DIGEST_LENGTH; ++i) {
        ss << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(result[i]);
    }
    return ss.str();
}

int main() {
    std::string input = "TEST12345";
    std::cout << getMD5(input) << std::endl;
    return 0;
}
    `,
            howToRunItTips: (
                <p>
                    {Dot("md5-cpp-openssl-0001", "C++ uses the OpenSSL library to generate MD5 hashes. You need to install OpenSSL and link against it in your project.")}<br />
                    {Dot("md5-cpp-install-openssl-0002", "Install OpenSSL on your system and link against 'libssl' and 'libcrypto' libraries when building your C++ application.")}
                    <br />
                    {Dot("md5-cpp-use-openssl-0003", "The snippet creates a function 'getMD5' that takes an input string, calculates its MD5 hash using OpenSSL's MD5 API, and returns the hash as a hexadecimal string. Paste this code into your C++ program and call the 'getMD5' function with your desired input.")}
                </p>),
            links: [
                {
                    name: "OpenSSL Docs",
                    link: "https://www.openssl.org/docs/man1.1.1/man3/MD5.html"
                }
            ]
        },

        "php": {
            template: `
<?php
function getMD5($input) {
    return md5($input);
}

$input = "TEST12345";
echo getMD5($input);
?>
    `,
            howToRunItTips: (
                <p>
                    {Dot("md5-php-built-in-0001", "PHP has a built-in function 'md5()' for generating MD5 hashes.")}<br />
                    {Dot("md5-php-no-install-0002", "No external library installation is needed as 'md5()' comes pre-installed in PHP.")}
                    <br />
                    {Dot("md5-php-use-0003", "This simple example defines a 'getMD5' function that calls the PHP 'md5()' function on the provided input string. Copy this code into a PHP file, save it with a .php extension, and run it in a web server or through the command line to see the MD5 hash of the input value.")}
                </p>
            )
        },
    };
}