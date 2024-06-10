import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'

export default (props:{
    str:string
})=>{
    return <Markdown remarkPlugins={[remarkGfm]}>{props.str}</Markdown>
}