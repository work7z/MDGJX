import { LabelValuePair } from "@/constants"
import apiSlice, { I18nItem } from "@/store/reducers/apiSlice"
import { Select, SelectProps } from "@mantine/core"
import _ from "lodash"

export default (props: Partial<SelectProps> & {
    label: string,
    acceptValues?: string[]
}) => {
    const i18nItemsRes = apiSlice.useTlnGetI18nItemsQuery({})
    const langData = i18nItemsRes.data?.data || []
    let i18nItems = langData.map(x => {
        return {
            label: x.label[1],
            value: x.value
        } satisfies LabelValuePair
    }) || []
    if (!_.isEmpty(props.acceptValues) && props.acceptValues) {
        i18nItems = i18nItems.filter(x => (props.acceptValues || []).includes(x.value))
    }
    return (
        <Select
            name={props.name}
            placeholder={"请选择" + props.label}
            data={[
                // {
                //     label: '自动识别',
                //     value: 'auto'
                // },
                ...(i18nItems)
            ] || []}
            defaultValue={props.defaultValue}
            {...props}
        />
    )
}