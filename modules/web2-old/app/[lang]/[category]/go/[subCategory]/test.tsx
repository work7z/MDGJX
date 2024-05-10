'use client'
import { Button } from "@blueprintjs/core"

export default () => {
    return <Button onClick={() => {
        alert('hello, owlrd')
    }}>this is dynamic</Button>
}