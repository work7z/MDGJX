import { Button, ButtonProps, Group } from "@mantine/core"

export type ActionItem = ButtonProps & { onClick?: () => void, text: string, type?: "submit" }
export default (props: {
    actions: ActionItem[]
}) => {
    return <>        {
        props.actions.map(x => {
            return <Button onClick={() => {
                x.onClick && x.onClick()
            }} type={x.type} {...x}>{x.text}</Button>
        })
    }
    </>
}