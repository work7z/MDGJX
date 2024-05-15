import { Button, ButtonProps, Group } from "@mantine/core"

export type ActionItem = ButtonProps & { text: string }
export default (props: {
    actions: ActionItem[]
}) => {
    return <>        {
        props.actions.map(x => {
            return <Button {...x}>{x.text}</Button>
        })
    }
    </>
}