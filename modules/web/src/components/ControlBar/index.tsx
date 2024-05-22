import { Button, ButtonProps, Group } from "@mantine/core"

export type ActionItem = ButtonProps & { icon?: any, onClick?: () => void, text?: string, type?: "submit", title?: string }
export default (props: {
    actions: ActionItem[]
}) => {
    return <>        {
        props.actions.map(x => {
            return <Button onClick={() => {
                x.onClick && x.onClick()
            }} type={x.type} {...x}>{x.icon}{x.text}</Button>
        })
    }
    </>
}