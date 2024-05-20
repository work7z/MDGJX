import AppConstants from "@/AppConstants"
import { Card } from "@mantine/core"

export default () => {
    return <div>
        <Card className=" flex flex-col " withBorder style={{
            height: AppConstants.calcMainBodyHeight
        }}>
            <div className="flex-1">chat history</div>
        </Card >
    </div >
}   