import { initWSConn } from './utils/WsUtils';
import _ from 'lodash'

export const init_when_signIn_mode = _.once(() => {
    initWSConn('userchannel')
})