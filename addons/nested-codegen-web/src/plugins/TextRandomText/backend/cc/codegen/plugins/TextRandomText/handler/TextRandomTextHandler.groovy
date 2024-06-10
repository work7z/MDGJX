package cc.codegen.plugins.TextRandomText.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.util.HexUtil
import cn.hutool.core.util.RandomUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil

import java.nio.charset.Charset

class TextRandomTextHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "generate"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = {
                            return 'N/A'
                        };
                        def config_line_output_sep_char = getEscapeSpliter(params['config_line_output_sep_char'] as String)
                        def config_r_gen_size = params['config_r_gen_size']
                        if (config_r_gen_size == '') {
                            config_r_gen_size = '100';
                        } else {
                            config_r_gen_size += ''
                        }
                        def config_r_max = params['config_r_max'] as String
                        if (config_r_max == '') {
                            config_r_max = '8'
                        }
                        def config_r_min = params['config_r_min'] as String
                        if (config_r_min == '') {
                            config_r_min = '1'
                        }
                        def config_r_gen_char_length = params['config_r_gen_char_length'] as String
                        if (config_r_gen_char_length == '') {
                            config_r_gen_char_length = '10'
                        }
                        def config_r_gen_seeds = params['config_r_gen_seeds'] as String
                        switch (extHandleItem.params['config_gen_text_type']) {
                            case 'string':
                                res = {
                                    return RandomUtil.randomString(config_r_gen_char_length.toInteger())
                                }
                                break;
                            case 'string_from_seeds':
                                res = {
                                    return RandomUtil.randomString(config_r_gen_seeds, config_r_gen_char_length.toInteger())
                                }
                                break;
                            case 'string_upper':
                                res = {
                                    return RandomUtil.randomString(config_r_gen_char_length.toInteger()).toUpperCase()
                                }
                                break;
                            case 'string_lower':
                                res = {
                                    return RandomUtil.randomString(config_r_gen_char_length.toInteger()).toLowerCase()
                                }
                                break;
                            case 'uuid':
                                res = {
                                    return RandomUtil.randomString("abcdefghijklmnopqrstuvwxyz0123456789", config_r_gen_char_length.toInteger()).toLowerCase()
                                }
                                break;
                            case 'integer':
                                res = {
                                    return RandomUtil.randomNumbers(config_r_gen_char_length.toInteger()).toLowerCase()
                                }
                                break;
                            case 'decimal':
                                res = {
                                    return RandomUtil.randomBigDecimal(
                                            new BigDecimal(config_r_min.toString().toInteger()),
                                            new BigDecimal(config_r_max.toString().toInteger())
                                    ).toString().toLowerCase()
                                }
                                break;
                        }
                        def totalValue = ''
                        for (def i = 0; i < config_r_gen_size.toInteger(); i++) {
                            totalValue += res()
                            totalValue += config_line_output_sep_char
                        }
                        return ResFunc.ok([value: totalValue])
                    }
                },
        ])
    }


}
