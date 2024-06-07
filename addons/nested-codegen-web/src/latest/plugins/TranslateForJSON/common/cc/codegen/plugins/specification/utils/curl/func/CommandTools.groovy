package cc.codegen.plugins.specification.utils.curl.func

class CommandTools {
    public static final String CG_TEXT_QUOTE_REPLACE = "CG_TEXT_QUOTE_REPLACE_CG"

    public static List<String> parseAsStrArr(String curlCommand) {
        List<String> textArr = []
        def lastText = "";
        curlCommand = curlCommand.replaceAll("[^\\s]''[^\\s]", CG_TEXT_QUOTE_REPLACE).replaceAll("\\\\\n", "\n")
        def status = [tmp               : 1,
                      isQuoteModeStarted: false]
        def lastCharType = null;
        curlCommand.trim().split("").eachWithIndex { eachChar, eachCharIdx ->
            if ((eachChar == "'")) {
                // convert the quote mode started
                status.isQuoteModeStarted = !status.isQuoteModeStarted
                lastCharType = eachChar
                // if it's the beginning
                if (status.isQuoteModeStarted) {
                    // start collecting
                    lastText += eachChar
                } else if (!status.isQuoteModeStarted) {
                    // ending quote mode
                    lastText += eachChar
                    textArr.add(lastText)
                    lastText = ''
                }
            } else {
                lastCharType = null;
                // if the quote already started, then make it
                if (status.isQuoteModeStarted) {
                    lastText += eachChar;
                } else if (eachChar == ' ' || eachChar == '\n') {
                    // if it's a blank without including in the quote, then deem it as meaningless character
                    if (lastText != '') {
                        textArr.add(lastText)
                        lastText = ''
                    }
                    return;
                } else {
                    lastText += eachChar
                }
            }
        }
        textArr = textArr.collect({ it.trim().replaceAll(CG_TEXT_QUOTE_REPLACE, "'") }).findAll({ it -> it.toString() != '' })
        if (lastText != '') {
            textArr.add(lastText)
            lastText = ''
        }
        return textArr;
    }
}
