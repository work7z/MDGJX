import { Button, ButtonProps, Group, Tooltip } from "@mantine/core"

export type ActionItem = ButtonProps & { icon?: any, onClick?: () => void, text?: string, type?: "submit", title?: string }
export default (props: {
    actions: ActionItem[]
}) => {
    return <>        {
        props.actions.map(x => {
            const btn = <Button onClick={() => {
                x.onClick && x.onClick()
            }} type={x.type} {...x}>{x.icon}{x.text}</Button>
            if (!x.title) { return btn; }
            return <Tooltip label={x.title}>{btn}
            </Tooltip>
        })
    }
    </>
}