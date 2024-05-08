import { Link } from "react-router-dom"

export default (props: {
    //
    'data-refid'?: string,
    className?: string
    href?: string,
    target?: string,
    children?: any
}) => {
    return <Link to={props.href + ""} {...props} >{props.children}</Link>
    // return <a {...props}>{props.children}</a>
}