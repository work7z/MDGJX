import apiSlice from "@/store/reducers/apiSlice"
import { Select, SelectProps } from "@mantine/core"

export default (props: Partial<SelectProps> & {
    label: string,
}) => {
    const i18nItemsRes = apiSlice.useTlnGetI18nItemsQuery({})
    const langData = i18nItemsRes.data?.data || []
    return (
        <Select
            name={props.name}
            label={props.label}
            placeholder={"请选择" + props.label}
            data={langData.map(x => {
                return {
                    label: x.label[1],
                    value: x.value
                }
            }) || []}
            searchable
            defaultValue={props.defaultValue}
        />
    )
}