import { useState } from 'react';
import { Stepper, Button, Group, Alert, Paper, TextInput, NumberInput, Select, NativeSelect, Radio } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useHistory } from 'react-router';
import AlertUtils from '@/utils/AlertUtils';
import apiSlice from '@/store/reducers/apiSlice';
import exportUtils, { RHelper } from '@/utils/ExportUtils';
import _ from 'lodash';

/**
     "configs": [
        {
            "type": "basic",
            "id": "trial-premium",
            "label": "1元试用30天会员",
            "price": 1,
            "days": 30
        },

 */
export type WxPayPlanConfigItem = {
    type: string;
    id: string;
    label: string;
    price: number;
    days: number;
}
export type WxPayPlanSt = {
    configs: WxPayPlanConfigItem[]
}

export default function () {
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const r_sysconf = apiSlice.useGetSysConfWithStaticDataQuery({
        type: 'wxpay-plan.json'
    }, {
        pollingInterval: 5000
    })

    const handleStepChange = (nextStep: number) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0;

        if (isOutOfBounds) {
            return;
        }

        setActive(nextStep);
        setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
    };
    const hist = useHistory()

    // Allow the user to freely go back and forth between visited steps.
    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;
    const jsx_why =  <Alert mt={100} mb={10} variant="light" color="teal" title="为什么开源项目会收费？" icon={
        <IconInfoCircle />
    }>
        为了开源项目的可持续发展以及覆盖相关服务器费用，我们设计了若干基于云端的付费项目。如果您认可我们，并希望该项目能有更好的发展，可以考虑通过订阅增值服务的方式来支持我们。您只需付出一份午餐的钱，就能获得物超所值的高级权益，也能让开发团队有更多的资金和信心做更多的事情。

        请放心，离线不依赖服务器API的功能，依旧会永久免费开放给所有用户，我们只对云端API进行适当的收费。如果付费项对您造成了困扰，请随时让我们知道，我们会积极再改进可持续化的开源发展方案。
    </Alert>

    const rh = exportUtils.register('r_newprivil', {
        getNotPersistedStateFn() {
            return {
                selectedPlan: '6-months-premium',
                planCount: 1
            }
        },
        getPersistedStateFn() {
            return {
            }
        }
    })

    if (!rh) {
        return ''
    }

    const wxpayPlanConfigs = r_sysconf?.data?.data?.data as WxPayPlanSt | undefined
    const jsx_newRights = <Paper withBorder shadow="md" className='space-y-2 w-full sm:w-[1/5] mx-auto' p={20} mt={10} radius="md" >

        <Radio.Group
            label="目标权益"
            withAsterisk
            {...rh?.bindOnChange({
                npStateKey: 'selectedPlan'
            })}
            mb={20}
        >
            <Group mt="xs">
                {
                    wxpayPlanConfigs?.configs?.map(x => (
                        <Radio key={x.id} value={x.id} label={x.label+`(${x.price}元)`} />
                    )) || []
                }
            </Group>
        </Radio.Group>

        {/* <NativeSelect
        label="所选权益"
        data={wxpayPlanConfigs?.configs?.map(x=>(
            {
                value: x.id,
                label: `${x.label}(${x.price}元)`
            }
        ))||[]}
        mb={20}
        /> */}
        <NumberInput
            {...rh?.bindOnChange({
                npStateKey: 'planCount'
            })}
            mb={10}
            label="权益数量" placeholder="购买权益礼品卡数量" />
    </Paper>

    return (
        <div className='p-4 py-5 mx-auto sm:mx-20 my-12'>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step
                    label="新权益列表"
                    description="选定所需权益"
                    allowStepSelect={shouldAllowSelectStep(0)}
                >
                    {jsx_newRights}
                </Stepper.Step>
                <Stepper.Step
                    label="扫码支付"
                    description="使用微信以扫码"
                    allowStepSelect={shouldAllowSelectStep(1)}
                >
                    Step 2 content: Verify email
                </Stepper.Step>
                <Stepper.Step
                    label="付款成功"
                    description="付款后将应用权益"
                    allowStepSelect={shouldAllowSelectStep(2)}
                >
                    Step 3 content: Get full access
                </Stepper.Step>

                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                {active === 0 && false ? '' : <Button variant="default" disabled={
                    active === 0
                } onClick={() => handleStepChange(active - 1)}>
                    上一步
                </Button>}
                <Button onClick={() => handleStepChange(active + 1)}>下一步</Button>
            </Group>
            {jsx_why}

            <Group gap={5} justify='flex-end' className=''>
                <Button color='lime' onClick={() => {
                    hist.push('/settings/feedback')
                    AlertUtils.alertInfo("很抱歉让您遇到支付问题，如果需要即时处理，我们建议您添加我们的QQ群以获得最快的处理速度")
                }}>支付遇到问题</Button>
                <Button color='cyan' onClick={() => {
                    hist.push('/settings/feedback')
                }}>联系我们</Button>

            </Group>


        </div>
    );
}