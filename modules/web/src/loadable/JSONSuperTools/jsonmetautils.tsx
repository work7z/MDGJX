import JSON5 from 'json5'

const jsonmetautils = {
    noChinese: (input: string): string => {
        return input.replace(/’/g, "'").replace(/‘/g, "'").replace(/“/g, '"').replace(/”/g, '"').replace(/—/g, '-').replace(/，/g, ',')
    },
    unicodeToChinese: (input: string): string => {
        return input.replace(/\\u[\dA-F]{4}/gi, function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    },
    chineseToUnicode: (input: string): string => {
        return input.replace(/[\u4E00-\u9FA5]/g, function (match) {
            return '\\u' + match.charCodeAt(0).toString(16);
        });
    },
    beautify: (input: string, compact?: boolean): string => {
        if (!input) return "";

        // const [indentStr, sortBool] = args;
        const indentStr = '\t'
        const sortBool = false
        let json = null;

        try {
            json = JSON5.parse(input);
        } catch (err) {
            throw new Error("Unable to parse input as JSON.\n" + err);
        }

        if (sortBool) json = sortKeys(json);

        return JSON.stringify(json, null, compact ? '' : indentStr);
    },
    compress: (input: string): string => {
        const r = jsonmetautils.beautify(input, true);
        return r
    },
    escape: (input: string): string => {
        if (!input) return "";
        return input.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    },
    unescape: (input: string): string => {
        if (!input) return "";
        // write a function to unescape JSON str
        return input.replace(/\\./g, function (m) {
            switch (m[1]) {
                case '"':
                case "'":
                case "\\":
                    return m[1];
                case "b":
                    return "\b";
                case "f":
                    return "\f";
                case "n":
                    return "\n";
                case "r":
                    return "\r";
                case "t":
                    return "\t";
                case "u":
                    return String.fromCharCode(parseInt(m.substr(2, 4), 16));
                default:
                    return m;
            }
        });
    }
}
export default jsonmetautils


/**
 * Sort keys in a JSON object
 *
 * @author Phillip Nordwall [phillip.nordwall@gmail.com]
 * @param {object} o
 * @returns {object}
 */
function sortKeys(o) {
    if (Array.isArray(o)) {
        return o.map(sortKeys);
    } else if ("[object Object]" === Object.prototype.toString.call(o)) {
        return Object.keys(o).sort().reduce(function (a, k) {
            a[k] = sortKeys(o[k]);
            return a;
        }, {});
    }
    return o;
}
