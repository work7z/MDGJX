import apiSlice from "@/store/reducers/apiSlice"

export default () => {
    const r = apiSlice.useGetSysConfWithStaticDataQuery({
        type: 'wxpay-plan.json'
    }, {
        pollingInterval: 5000
    })
    return <div>
        {
            JSON.stringify(r.data)
        }
    </div>
}