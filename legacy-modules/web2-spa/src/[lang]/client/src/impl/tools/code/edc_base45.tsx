import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot } from "@/[lang]/client/src/utils/cTranslationUtils";

import { CodeImplDetail, CodeImplMap } from "./types";


loadDOT("2HoJjVJXH")


export default (): Partial<CodeImplMap> => {
    return {
        "node.js": {
            template: `
      const base45 = require('@digitalbazaar/base45');
      
      // Encode example
      const inputBuffer = Buffer.from('TEST12345', 'utf8');
      const encodedString = base45.encode(inputBuffer);
      console.log(encodedString);

      // Decode example
      const decodedBuffer = base45.decode(encodedString);
      console.log(decodedBuffer.toString('utf8'));
    `,
            howToRunItTips: (
                <p>
                    {Dot("u9g6t", "To run this code, you need to install the '@digitalbazaar/base45' package.")}<br />
                    {Dot("z7n1m", "Use npm or yarn to install it by running `npm install @digitalbazaar/base45` or `yarn add @digitalbazaar/base45`.")}
                    <br />
                    {Dot("v5k3r", "This library provides a simple API for Base45 encoding and decoding in Node.js applications. After installation, copy the provided template into your script and execute it with Node.js interpreter.")}
                </p>
            )
        },

        "python": {
            template: `
      import base45
      
      # Encode example
      input_string = b'TEST12345'
      encoded_string = base45.b2a_base45(input_string)
      print(encoded_string.decode())

      # Decode example
      encoded_string = encoded_string  # Assuming you stored the encoded string somewhere
      decoded_bytes = base45.a2b_base45(encoded_string)
      print(decoded_bytes.decode())
    `,
            howToRunItTips: (
                <p>
                    {Dot("x2c5e", "To use Base45 in Python, you'll need to install the 'base45' library.")}<br />
                    {Dot("d8w1b", "You can do this using pip by running `pip install base45` or `python -m pip install base45`.")}
                    <br />
                    {Dot("c6p4n", "After installing the library, copy the provided template into your Python script and run it. The library offers built-in functions for converting between bytes and Base45-encoded strings.")}
                </p>
            )
        },

        "java": {
            template: `
      import org.iso.base45.Base45;

      // Encode example
      String input = "TEST12345";
      byte[] inputBytes = input.getBytes(StandardCharsets.UTF_8);
      String encoded = Base45.getEncoder().encodeToString(inputBytes);
      System.out.println(encoded);

      // Decode example
      String encodedStr = "..."  // Replace with the actual encoded value
      byte[] decodedBytes = Base45.getDecoder().decode(encodedStr);
      String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
      System.out.println(decoded);
    `,
            howToRunItTips: (
                <p>
                    {Dot("y3m7k", "For Java, utilize the 'iso-base45' library which can be included in your project as a Maven dependency.")}<br />
                    {Dot("f9t2z", "Add the following to your pom.xml file: `<dependency> <groupId>org.iso</groupId> <artifactId>iso-base45</artifactId> <version>...</version> </dependency>` where version is the latest release.")}
                    <br />
                    {Dot("q6n1r", "The library provides encoder and decoder classes that handle Base45 conversion. Once the dependency is added, copy the template code into a Java class and execute it.")}
                </p>
            )
        },

        "csharp": {
            template: `
      using Base45;

      // Encode example
      string input = "TEST12345";
      byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
      string encoded = Base45Encoder.Encode(inputBytes);
      Console.WriteLine(encoded);

      // Decode example
      string encodedStr = "..."  // Replace with the actual encoded value
      byte[] decodedBytes = Base45Decoder.Decode(encodedStr);
      string decoded = System.Text.Encoding.UTF8.GetString(decodedBytes);
      Console.WriteLine(decoded);
    `,
            howToRunItTips: (
                <p>
                    {Dot("j9s5r", "For C#, you can use the 'Base45' library available on NuGet.")}<br />
                    {Dot("p6e3n", "To install it, run `Install-Package Base45` in the Package Manager Console or add the dependency via NuGet Package Manager.")}
                    <br />
                    {Dot("z8qm2t", "The library provides encoder and decoder classes for Base45 operations. Copy the template code into a C# console application and execute it after installing the package.")}
                </p>
            )
        },

        "cpp": {
            template: `
      #include "base45.h"

      // Encode example
      std::string input = "TEST12345";
      unsigned char inputBuffer[input.size()];
      std::copy(input.begin(), input.end(), inputBuffer);
      std::string encoded = base45::encode(inputBuffer, input.size());
      std::cout << encoded << std::endl;

      // Decode example
      std::string encodedStr = "..."  // Replace with the actual encoded value
      std::vector<uint8_t> decodedBytes = base45::decode(encodedStr);
      std::string decoded(reinterpret_cast<char*>(decodedBytes.data()), decodedBytes.size());
      std::cout << decoded << std::endl;
    `,
            howToRunItTips: (
                <p>
                    {Dot("g4h7s", "For C++, you can use the 'base45-cpp' library which is available as a GitHub repository.")}<br />
                    {Dot("d2w6e", "Clone/download the repository and include the provided header file in your project. Compile and link against the source files according to the project's documentation.")}
                    <br />
                    {Dot("c1p3b", "Once integrated, copy the provided template into your C++ program and replace the placeholder with the actual encoded value before running the program.")}
                </p>
            ),
            links: [
                {
                    name: "base45-cpp GitHub Repository",
                    link: "https://github.com/hyperledger/aries-framework-javascript/tree/master/packages/base45"
                }
            ]
        },


        "swift": {
            template: `
      import Base45

      // Encode example
      let input = "TEST12345".data(using: .utf8)!
      let encoded = try! Base45.encode(input)
      print(String(data: encoded, encoding: .utf8)!)

      // Decode example
      let encodedStr = Data(base64Encoded: "..." /* Replace with actual base64-encoded value of the Base45 string */)!
      let decoded = try! Base45.decode(encodedStr)
      print(String(data: decoded, encoding: .utf8)!)
    `,
            howToRunItTips: (
                <p>
                    {Dot("y9m3k", "For Swift, you can use the 'Base45' library available on GitHub.")}<br />
                    {Dot("f7t1z", "Add the library to your Xcode project manually or via a package manager like Swift Package Manager (SPM).")}
                    <br />
                    {Dot("q2n9r", "Once added, copy the provided template into a Swift file. Note that in this example, we're using a hypothetical scenario where you have the Base45 string's base64 representation; replace it with the actual encoded value before running the code.")}
                </p>
            ),
            links: [
                {
                    name: "Swift Base45 GitHub Repository",
                    link: "https://github.com/abarisain/Base45"
                }
            ]
        },

        "kotlin": {
            template: `
      import com.bottlerocketstudios.barcode.core.base45.Base45

      // Encode example
      val input = "TEST12345".toByteArray(Charsets.UTF_8)
      val encoded = Base45().encodeToString(input)
      println(encoded)

      // Decode example
      val encodedStr = "..."  // Replace with the actual encoded value
      val decoded = Base45().decode(encodedStr.toByteArray())
      println(String(decoded, Charsets.UTF_8))
    `,
            howToRunItTips: (
                <p>
                    {Dot("j8s6r", "For Kotlin, you can use the 'barcode-core' library which includes Base45 functionality.")}<br />
                    {Dot("p5e9n", "Add the library as a dependency in your Gradle build script. For instance, in the app-level build.gradle file, add `implementation 'com.bottlerocketstudios:barcode-core:...'` with the latest version number.")}
                    <br />
                    {Dot("z3m1t", "After adding the dependency and syncing the project, copy the provided template into a Kotlin class, replacing the placeholder with the actual encoded value before running the code.")}
                </p>
            )
        },


    }
}