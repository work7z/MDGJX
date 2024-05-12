import { useHistory } from "react-router"
import Qs from 'query-string'

export let useSearchParams = (): {
    type?: string
} => {
    let sp = useHistory().location.search
    let obj = Qs.parse(sp)
    return obj
}