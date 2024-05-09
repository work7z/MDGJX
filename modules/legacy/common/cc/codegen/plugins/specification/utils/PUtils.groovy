package cc.codegen.plugins.specification.utils

import cc.codegen.plugins.specification.definition.ExtHandleItem
import cn.hutool.core.date.DateUtil
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.serializer.SerializerFeature
import org.jsoup.nodes.Element
import org.jsoup.select.Elements

import java.text.SimpleDateFormat

class PUtils {


    static boolean validJSONFile(File file) {
        try {
            JSON.parseObject(file.getText("UTF-8"))
            return true;
        } catch (Throwable e) {
            e.printStackTrace()
            return false;
        }
    }
    static Map parseJSONFileIfPossible(File file) {
        try {
            return JSON.parseObject(file.getText("UTF-8"),Map.class)
        } catch (Throwable e) {
            e.printStackTrace()
            return null;
        }
    }

    public static Element getChildElementByTagNameForOneResult(Element crtMailing, String name) {
        Elements childElementByTagName = getChildElementByTagName(crtMailing, name);
        if (childElementByTagName.size() == 0) {
            return null;
        } else {
            return childElementByTagName.get(0);
        }
    }

    public static Elements getChildElementByTagName(org.jsoup.nodes.Element crtMailing, String name) {
        Elements elementsByTag = new Elements();
        Elements children = crtMailing.children();
        for (Element child : children) {
            if (child.tagName().trim().equalsIgnoreCase(name)) {
                elementsByTag.add(child);
            }
        }
        return elementsByTag;
    }

    public static String betext(Elements crtMailing) {
        if (crtMailing != null && crtMailing.size() != 0) {
            return crtMailing.get(0).text().trim()
        } else {
            return null;
        }
    }

    public static String betext(org.jsoup.nodes.Element crtMailing, String name) {
        Elements elementsByTag = getChildElementByTagName(crtMailing, name);
        if (elementsByTag.size() == 0) {
            return null;
        }
        return elementsByTag.text().trim();
    }


    static Map<String, Object> toMapByFile(File s) {
        return JSON.parseObject(s.readLines().join("\n"), Map.class);
    }

    static Map<String, Object> toMapByFileWithSafe(File s) {
        try {
            return JSON.parseObject(s.readLines().join("\n"), Map.class);
        } catch (Throwable t) {
            return null;
        }
    }

    static void main(String[] args) {
        println maskStr("888888888129393991291291291290303")
        println maskStr("dkdkqw")
    }
//    "backup_{yyyy-MM-dd }"
    static String formatDateFileName(String text, Integer seqId) {
        return text.replaceAll("\\{\\s*(.+?)\\s*\\}", { matcher ->
            def ok = matcher[1].toString().trim()
            switch (ok) {
                case 'TIMESTAMP':
                    return "" + System.currentTimeMillis()
                    break;
                case 'SEQUENCEID':
                    return seqId
                    break;
                default:
                    return DateUtil.format(new Date(), ok)
            }
            return matcher[1]
        })
    }

    static void highrun(Runnable runnable) {
        Thread thread = new Thread(runnable);
        thread.setPriority(Thread.MAX_PRIORITY)
        thread.start()
    }

    public static String maskStr(String id) {
        if (id.length() > 30) {
            def b = 3;
            return id.substring(0, b) + "***" + id.substring(id.length() - b)
        } else {
            return id;
        }
    }

    public static String getDateStr(Date date, String formatStr) {
        SimpleDateFormat sDateFormat = new SimpleDateFormat(formatStr);
        String format = sDateFormat.format(date);
        return format;
    }

    public static String getDateStr(Date date) {
        SimpleDateFormat sDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format = sDateFormat.format(date);
        return format;
    }

    public static String getDateStrForNow() {
        return getDateStr(Calendar.getInstance().getTime())
    }


    public static String toJSON(Object obj) {
        return JSON.toJSONString(obj, SerializerFeature.WriteMapNullValue)
    }

    public static String toJSONWithBeautify(Object obj) {
        return JSON.toJSONString(obj, true)
    }

    public static String formatErrorToJsonString(Throwable o) {
        return toJSON([timestamp: System.currentTimeMillis(),
                       error    : o,
                       message  : o.getMessage(),])
    }


    static Map<String, Object> toMap(String s) {
        return JSON.parseObject(s, Map.class);
    }


    static String getErrFromE(Throwable throwable) {
        def writer = new StringWriter()
        throwable.printStackTrace(new PrintWriter(writer))
        def fin_err = writer.getBuffer().toString()
        return fin_err
    }


    public static String uuid() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }


}
