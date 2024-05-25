import GenCodeMirror from "@/components/GenCodeMirror"

export default () => {
    return <div className="w-full h-full overflow-auto">
        <GenCodeMirror
            language="javascript"
            directValue={`{
    "name": "秒达工具箱",
      "link": "https://mdgjx.com",
  "description": "如果喜欢秒达工具箱，请收藏和分享我们的官网MDGJX.COM(五拼缩写)",
  "count": 7800,
      "dates": [
      "2016-09","2018-06","2019-07","2020-01","2022-03","2024-05"
      ],
        "info": {
        "scope":"/",
        "noImplicitAny":true,
        "noLib":false,
        "extraLibs":[],
        "semanticValidation":true,
        "syntaxValidation":true,
        "codeGenTarget":"ES5",
        "moduleGenTarget":"",
      },
}`} bigTextId={"thatisok"} />
    </div>
}