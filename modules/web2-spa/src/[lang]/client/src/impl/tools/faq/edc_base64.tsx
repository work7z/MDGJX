import { loadDOT } from "@/[lang]/client/src/reducers/systemSlice";
import { Dot, } from "@/[lang]/client/src/utils/cTranslationUtils";
import { FAQItem } from "./types";
import React from "react";

loadDOT("edc_base64")

export default (): FAQItem[] => {
  return [
    {
      question: Dot("123e4567", "What is Base64?"),
      answer: <p>
        {Dot("abc12345", "Base64 is an encoding scheme that represents binary data as a sequence of ASCII characters.")}
        {Dot("fghi6789", "It's used to transmit or store binary files in text-based formats, ensuring compatibility across various systems.", "EncodingPurpose")}
      </p>
    },
    {
      question: Dot("abcdef12", "How does Base64 work?"),
      answer: <p>
        {Dot("bcdef01a", "Base64 works by dividing binary data into groups of 6 bits and mapping each group to a specific character from an alphabet of 64 characters (A-Za-z0-9+/).")}
        {Dot("cdefg234", "Padding characters (=) are added at the end to ensure the encoded data length is a multiple of 4 characters.", "PaddingUsage")}
      </p>
    },
    {
      question: Dot("1a2b3c4d", "Why use Base64?"),
      answer: <p>
        {Dot("5e6f7g8h", "Base64 is used when binary data needs to be transmitted through text-based protocols like email or JSON, or embedded in places where only text is allowed.", "TransmittingBinaryData")}
        {Dot("9i0j1k2l", "It's also used for embedding small images directly into HTML or CSS as data URLs.", "EmbeddingImages")}
      </p>
    },
    {
      question: Dot("mno34567", "Advantages of Base64"),
      answer: <p>
        <ul>
          <li>
            {Dot("pqrs890t", "Universal Compatibility: Base64 is widely recognized and supported in all major programming languages.", "Compatibility")}
          </li>
          <li>
            {Dot("uvwxyza1", "No Data Loss: Since it's a reversible process, Base64 encoding doesn't result in any loss of information.", "NoDataLoss")}

          </li>
        </ul>
      </p>
    },
    {
      question: Dot("2bcde3fg", "Disadvantages of Base64"),
      answer: <p>
        <ol>
          <li>
            {Dot("4hijk5lm", "Size Increase: Encoded data is roughly 33% larger than the original binary data.", "SizeIncrease")}
          </li>
          <li>
            {Dot("6nopqrst", "No Encryption: Base64 is not an encryption method; it's easily decoded and provides no security.", "NotEncryption")}

          </li>
        </ol>
      </p>
    },
    {
      question: Dot("u7vwx8yz", "Common Base64 operations"),
      answer: <p>
        {Dot("ab9c0d1e", "The primary operations include encoding (converting binary to Base64) and decoding (converting Base64 back to binary).", "CommonOperations")}
      </p>
    },
    {
      question: Dot("23fgh456", "History of Base64"),
      answer: <p>
        {Dot("78ijk9lm", "Base64 was first defined in RFC 1421 (1993) and later standardized in RFC 4648 (2006).", "Base64History")}
      </p>
    },
    {
      question: Dot("n0pqrstu", "Example usage of Base64"),
      answer: <p>
        {Dot("vwx1yza2", "An example is encoding an image file to embed it in an HTML <img> tag:", "ExampleUsage")}
        <pre>&lt;img src="data:image/jpeg;base64,{'{EncodedImageData}'}" /&gt;</pre>
      </p>
    },
    {
      question: Dot("34wxyz56", "How to encode/decode Base64 in JavaScript?"),
      answer: <p>
        {Dot("78abcdef", "JavaScript offers built-in functions such as btoa() and atob() for Base64 encoding and decoding respectively.", "")}
        {/* <pre>
        // Encoding:
        let binaryData = new Blob(['Hello World']);
        let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(binaryData)));

        // Decoding:
        let decodedData = atob(base64String);
      </pre> */}
      </p>
    },
    {
      question: Dot("efg45678", "Comparison with Base32"),
      answer: <p>
        {Dot("hij90klm", "Base32 uses a smaller alphabet (A-Z2-7), resulting in longer but more human-readable strings.", "Base32Comparison")}
        {Dot("nopqrs01", "While Base64 optimizes for compactness, Base32 is chosen when minimizing input errors, like manual entry, is crucial.", "HumanReadable")}
      </p>
    },
    {
      question: Dot("tuv23456", "Base64 URL safe variant"),
      answer: <p>
        {Dot("wxyzabcd", "There's a URL-safe version of Base64 that replaces '+' with '-' and '/' with '_', and omits padding '=', making it suitable for web URLs.", "URLSafeVariant")}
        {Dot("efghi678", "This variant is often used for filenames, URLs, or situations where special characters must be avoided.", "AvoidingSpecialChars")}
      </p>
    },
    {
      question: Dot("mnoijklm", "Are there other BaseXX encodings?"),
      answer: <p>
        {Dot("qrstuvwx", "Yes, apart from Base64 and Base32, there are also Base16 (Hexadecimal), Base58, and Base85, each designed for different scenarios.", "OtherBaseXX")}
      </p>
    },
    {
      question: Dot("zyx98765", "Can Base64 be used for compression?"),
      answer: <p>
        {Dot("cbaq54321", "No, Base64 isn't a compression technique, it only changes the representation of data not its size.",)}
      </p>
    }
  ]
}