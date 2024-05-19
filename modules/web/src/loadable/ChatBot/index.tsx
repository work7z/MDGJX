import apiSlice from "@/store/reducers/apiSlice"
import { Card, Flex, Group, Textarea } from "@mantine/core"
import { useEffect } from "react"
import classes from './index.module.css'
import GetAppInfo from "@/AppInfo"

export default () => {
    const calcMainBodyHeight = `calc(100vh - 59.2px - 26px)`
    return <div>
        <Card className=" flex flex-col " withBorder style={{
            height: calcMainBodyHeight
        }}>
            <div className="flex-1">chat history</div>
            <div className={" " + classes.iptbox}>
                <Textarea
                    placeholder={
                        "请输入需要处理的内容并回车提交，系统将根据输入智能分析本地化处理，例如直接解码您提供的Base64编码数据，或者对您的JSON数据进行转换、格式化、压缩等操作，再或者是对您提供的文本作为输入源设置提醒、添加备忘录等超实用功能。另外，所有交互操作均在本地完成，不会联网上传或者保存您的数据，所有逻辑也已完全开源，您可以放心使用。" + `（为方便下次使用，可以收藏本网站 ${GetAppInfo().link}）`
                    }
                    spellCheck={false}
                    w={'100%'}
                    rows={4}
                    style={{
                        height: '100%'
                    }}
                >

                </Textarea>
            </div>
        </Card >
    </div >
}