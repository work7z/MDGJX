import exportUtils from "@/utils/ExportUtils"
import { Button, Container } from "@mantine/core"

export default () => {
    const rh = exportUtils.register('plssignin', {
        getPersistedStateFn: () => {
          return {}
        },
        getNotPersistedStateFn: () => {
            return {
            }
        }
    })
    if(!rh){
        return 'loading please-sign-in...'
    }
    return <div>
        <Container my={10} size={'xl'} className='block sm:flex flex-row justify-start items-start sm:space-x-4 '>
            <Button onClick={()=>{
                //
                rh.checkLoginStatus()
            }}>请先登录</Button>
        </Container>
    </div>
}