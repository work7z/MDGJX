package cc.codegen.plugins.XMLXPath.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.util.StrUtil
import cn.hutool.core.util.XmlUtil
import com.alibaba.fastjson.JSON
import com.sun.org.apache.xml.internal.dtm.DTM
import com.sun.org.apache.xml.internal.dtm.ref.DTMNodeList
import com.sun.org.apache.xpath.internal.objects.XNodeSet
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import org.jsoup.Jsoup
import org.w3c.dom.Document

import javax.xml.xpath.XPath
import javax.xml.xpath.XPathConstants
import java.lang.annotation.Documented

class XMLXPathHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        println("calling this fn 200")
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "xml_filter"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                try {
                    def res = (bytes_text)
                    if (value == null) {
                        value = ""
                    }
                    Document docResult = XmlUtil.readXML(value);
//                    Object value = XmlUtil.getByXPath("//returnsms/message", docResult, XPathConstants.STRING);
                    def result_arr = []
                    def config_xml_path = params['config_xml_path']
                    if (config_xml_path == null) {
                        config_xml_path = ''
                    }
                    def findArr = config_xml_path.toString().split("\n").findAll({
                        return !it.toString().trim().startsWith("#") && it.toString().trim().length() != 0
                    })
                    findArr.each({
                        try {
                            def xPathResult = XmlUtil.getByXPath(it, docResult, params['config_result_type'] == 'string' ? XPathConstants.STRING : XPathConstants.NODESET);
                            def nn = xPathResult
                            if (xPathResult instanceof Document) {
                                nn = XmlUtil.toStr(xPathResult as Document, false)
                            } else if (xPathResult instanceof DTMNodeList) {
//                                def val_DTMNodeList = xPathResult as DTMNodeList
//                                def iter = val_DTMNodeList.getDTMIterator()
//                                def m = iter.getDTM(iter.getRoot())
//                                nn = (m.getNodeValue(m.getDocument()))
                                DTMNodeList nodes = xPathResult as DTMNodeList
                                for (int i = 0; i < nodes.getLength(); i++) {
                                    System.out.println(nodes.item(i).getNodeValue()); //1 2
                                    System.out.println(XmlUtil.toStr(nodes.item(i).getOwnerDocument())); //1 2
                                    nn = XmlUtil.toStr(nodes.item(i) as Document)
//                                    nn = XmlUtil.toStr(nodes.item(i).getOwnerDocument())
                                }
                            } else {
                                nn = Objects.toString(nn)
                            }
                            nn = nn.toString().replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "")
                            result_arr.add([id   : it,
                                            value: "${nn}".toString()])
                        } catch (Throwable throwable) {
                            throwable.toString()
                            result_arr.add([id   : it,
                                            value: "Err: ${throwable.getMessage()}".toString()])
                        }
                    })
                    def idx = 0;
                    def result = result_arr.collect({
                        return "<!-- Result ${++idx}: ${it.id} -->\n${it.value}".toString()
                    }).join("\n\n")
                    return ResFunc.ok([a: 2, value: result, value_arr: result_arr, findArr: findArr])
                } catch (Throwable throwable) {
                    return ResFunc.ok([a: 1, value_arr: [], value: "Err: " + throwable.getMessage()])
                }
            }
        }])
    }
}
