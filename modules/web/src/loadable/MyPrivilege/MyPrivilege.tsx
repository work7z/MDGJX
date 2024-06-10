import apiSlice from "@/store/reducers/apiSlice"
import { useEffect } from "react"
import { useHistory } from "react-router"

export default () => {
    const r = apiSlice.useGetSysConfWithStaticDataQuery({
        type: 'wxpay-plan.json'
    }, {
        pollingInterval: 5000,
        refetchOnFocus: true,
    })
    useEffect(() => {
        r.refetch()
    }, [useHistory().location.pathname])

    return <div>
        {
            JSON.stringify(r.data)
        }
    </div>
}