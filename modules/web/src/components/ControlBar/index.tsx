import { Button, ButtonProps, Group } from "@mantine/core"

export type ActionItem = ButtonProps & { text: string, type?: "submit" }
export default (props: {
    actions: ActionItem[]
}) => {
    return <>        {
        props.actions.map(x => {
            return <Button type={x.type} {...x}>{x.text}</Button>
        })
    }
    </>
}