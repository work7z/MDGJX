import { LabelValuePair } from "@/constants"
import apiSlice from "@/store/reducers/apiSlice"
import { Select, SelectProps } from "@mantine/core"

export default (props: Partial<SelectProps> & {
    label: string,
    dataArr: LabelValuePair[]
}) => {
    return (
        <Select
            name={props.name}
            placeholder={"请选择" + props.label}
            data={props.dataArr || []}
            defaultValue={props.defaultValue}
            {...props}
        />
    )
}