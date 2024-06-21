/**
 * Some parts taken from mimelib (http://github.com/andris9/mimelib)
 * @author Andris Reinman
 * @license MIT
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * To Quoted Printable operation
 */
class ToQuotedPrintable extends Operation {

    /**
     * ToQuotedPrintable constructor
     */
    constructor() {
        super();

        this.name = "QP编码";
        this.module = "Default";
        this.description = "Quoted-printable或QP encoding，没有规范的中文译名，可译为可打印字符引用编码或使用可打印字符的编码。Quoted-printable是使用可打印的ASCII字符（如字母、数字与“=”）表示各种编码格式下的字符，以便能在7-bit数据通路上传输8-bit数据, 或者更一般地说在非8-bit clean媒体上正确处理数据。它被定义为在E-mail中使用的MIME。<br><br>QP使用“=”开头的转义字符。一般限制行宽为76，因为有些软件限制了行宽。";
        this.infoURL = "https://wikipedia.org/wiki/Quoted-printable";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = new Uint8Array(input);
        let mimeEncodedStr = this.mimeEncode(input);

        // fix line breaks
        mimeEncodedStr = mimeEncodedStr.replace(/\r?\n|\r/g, function() {
            return "\r\n";
        }).replace(/[\t ]+$/gm, function(spaces) {
            return spaces.replace(/ /g, "=20").replace(/\t/g, "=09");
        });

        return this._addSoftLinebreaks(mimeEncodedStr, "qp");
    }


    /** @license
    ========================================================================
      mimelib: http://github.com/andris9/mimelib
      Copyright (c) 2011-2012 Andris Reinman

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */

    /**
     * Encodes mime data.
     *
     * @param {byteArray|Uint8Array} buffer
     * @returns {string}
     */
    mimeEncode(buffer) {
        const ranges = [
            [0x09],
            [0x0A],
            [0x0D],
            [0x20],
            [0x21],
            [0x23, 0x3C],
            [0x3E],
            [0x40, 0x5E],
            [0x60, 0x7E]
        ];
        let result = "";

        for (let i = 0, len = buffer.length; i < len; i++) {
            if (this._checkRanges(buffer[i], ranges)) {
                result += String.fromCharCode(buffer[i]);
                continue;
            }
            result += "=" + (buffer[i] < 0x10 ? "0" : "") + buffer[i].toString(16).toUpperCase();
        }

        return result;
    }

    /**
     * Checks if a given number falls within a given set of ranges.
     *
     * @private
     * @param {number} nr
     * @param {byteArray[]} ranges
     * @returns {boolean}
     */
    _checkRanges(nr, ranges) {
        for (let i = ranges.length - 1; i >= 0; i--) {
            if (!ranges[i].length)
                continue;
            if (ranges[i].length === 1 && nr === ranges[i][0])
                return true;
            if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1])
                return true;
        }
        return false;
    }

    /**
     * Adds soft line breaks to a string.
     * Lines can't be longer that 76 + <CR><LF> = 78 bytes
     * http://tools.ietf.org/html/rfc2045#section-6.7
     *
     * @private
     * @param {string} str
     * @param {string} encoding
     * @returns {string}
     */
    _addSoftLinebreaks(str, encoding) {
        const lineLengthMax = 76;

        encoding = (encoding || "base64").toString().toLowerCase().trim();

        if (encoding === "qp") {
            return this._addQPSoftLinebreaks(str, lineLengthMax);
        } else {
            return this._addBase64SoftLinebreaks(str, lineLengthMax);
        }
    }

    /**
     * Adds soft line breaks to a base64 string.
     *
     * @private
     * @param {string} base64EncodedStr
     * @param {number} lineLengthMax
     * @returns {string}
     */
    _addBase64SoftLinebreaks(base64EncodedStr, lineLengthMax) {
        base64EncodedStr = (base64EncodedStr || "").toString().trim();
        return base64EncodedStr.replace(new RegExp(".{" + lineLengthMax + "}", "g"), "$&\r\n").trim();
    }

    /**
     * Adds soft line breaks to a quoted printable string.
     *
     * @private
     * @param {string} mimeEncodedStr
     * @param {number} lineLengthMax
     * @returns {string}
     */
    _addQPSoftLinebreaks(mimeEncodedStr, lineLengthMax) {
        const len = mimeEncodedStr.length,
            lineMargin = Math.floor(lineLengthMax / 3);
        let pos = 0,
            match, code, line,
            result = "";

        // insert soft linebreaks where needed
        while (pos < len) {
            line = mimeEncodedStr.substr(pos, lineLengthMax);
            if ((match = line.match(/\r\n/))) {
                line = line.substr(0, match.index + match[0].length);
                result += line;
                pos += line.length;
                continue;
            }

            if (line.substr(-1) === "\n") {
                // nothing to change here
                result += line;
                pos += line.length;
                continue;
            } else if ((match = line.substr(-lineMargin).match(/\n.*?$/))) {
                // truncate to nearest line break
                line = line.substr(0, line.length - (match[0].length - 1));
                result += line;
                pos += line.length;
                continue;
            } else if (line.length > lineLengthMax - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
                // truncate to nearest space
                line = line.substr(0, line.length - (match[0].length - 1));
            } else if (line.substr(-1) === "\r") {
                line = line.substr(0, line.length - 1);
            } else {
                if (line.match(/=[\da-f]{0,2}$/i)) {

                    // push incomplete encoding sequences to the next line
                    if ((match = line.match(/=[\da-f]{0,1}$/i))) {
                        line = line.substr(0, line.length - match[0].length);
                    }

                    // ensure that utf-8 sequences are not split
                    while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/=[\da-f]{2}$/ig))) {
                        code = parseInt(match[0].substr(1, 2), 16);
                        if (code < 128) {
                            break;
                        }

                        line = line.substr(0, line.length - 3);

                        if (code >= 0xC0) {
                            break;
                        }
                    }

                }
            }

            if (pos + line.length < len && line.substr(-1) !== "\n") {
                if (line.length === 76 && line.match(/=[\da-f]{2}$/i)) {
                    line = line.substr(0, line.length - 3);
                } else if (line.length === 76) {
                    line = line.substr(0, line.length - 1);
                }
                pos += line.length;
                line += "=\r\n";
            } else {
                pos += line.length;
            }

            result += line;
        }

        return result;
    }

}

export default ToQuotedPrintable;
