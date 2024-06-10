package cc.codegen.plugins.JWTEncoder.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.util.RandomUtil
import cn.hutool.crypto.SecureUtil
import cn.hutool.crypto.asymmetric.RSA
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

import java.security.KeyPairGenerator

class JWTEncoderHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def en_de_api_name = "jwt_token";
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "encode_jwt_token"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        def res = ext.callExterior(en_de_api_name, [type: 'encode', *: params])
                        return ResFunc.ok([value: res.result,info: res.info])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "create_encrypt_key"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        def crt_alg_type = params['crt_alg_type']
                        def sec_str = RandomUtil.randomUUID()

                        def pub_str = ""
                        def pri_str = ""
                        return ResFunc.ok([value: [
                                sec: sec_str,
                                pub: pub_str,
                                pri: pri_str
                        ]])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_algorithm_listings"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        def res = getAlgListings().collect {
                            return [
                                    *: it,
                            ]
                        }
                        return ResFunc.ok([value: res])
                    }
                }
        ])
    }

    static void main(String[] args) {
//        SecureUtil.rsa()
        println SecureUtil.generateKey("RSA", 256)
//        [
//                //256,384,
//         512
//        ].each{
//            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
//            keyGen.initialize(it);
//            byte[] publicKey = keyGen.genKeyPair().getPublic().getEncoded();
//            byte[] privateKey = keyGen.genKeyPair().getPrivate().getEncoded();
//            println("RSA-${it}")
//            System.out.println(publicKey.encodeBase64().toString());
//            System.out.println(privateKey.encodeBase64().toString());
//        }
        // RSASSA-PKCS1-v1_5 with SHA-256
    }
}
