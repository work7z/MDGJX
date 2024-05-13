import { useEffect } from "react"

export default () => {
    useEffect(() => {
        fetch('/v3/hello-world')
    })
    return <div>this is chat 2</div>
}