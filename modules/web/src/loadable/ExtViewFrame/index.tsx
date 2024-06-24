import { MiaodaConfig } from "@/store/reducers/localApiSlice"


export default (props: {
    fn_eachConfig: () => MiaodaConfig
}) => {
    const { fn_eachConfig } = props;
    const config = fn_eachConfig()
    return <div>welcome to use ext view frame<br />
        {JSON.stringify(config)}
    </div>
}