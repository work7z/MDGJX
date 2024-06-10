import { useEffect, useState } from 'react';
import { Stepper, Button, Group, Alert, Paper, TextInput, NumberInput, Select, NativeSelect, Radio, Stack, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useHistory } from 'react-router';
import AlertUtils from '@/utils/AlertUtils';
import apiSlice, { verifyResponse } from '@/store/reducers/apiSlice';
import exportUtils, { RHelper } from '@/utils/ExportUtils';
import _ from 'lodash';
import { QRCodeSVG } from 'qrcode.react';

export type WxPayPlanConfigItem = {
    status: string;
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
    const [active, setActive] = useState(1);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
    const r_sysconf = apiSlice.useGetSysConfWithStaticDataQuery({
        type: 'wxpay-plan.json'
    }, {
        pollingInterval: 5000 * 10
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
    const jsx_why = <>
        <Alert mt={80} mb={10} variant="light" color="lime" title="目标权益下的各个选项有什么区分？还有权益数量怎么理解？" icon={
            <IconInfoCircle />
        }>
            关于权益类型，它们之间只有天数区别，没有功能区分，您可以根据自己的需求选择不同的权益。<br />
            关于权益数量，假设您选择了3份权益，那么您将获得3份权益的权益礼品卡，您可以自己使用，也可以赠送给他人使用。<br />
            关于永久会员，这是秒达工具箱初期的限时优惠，我们仅短暂开放，并承诺永久会员将永久享有秒达工具箱的所有权益，不再另行收费或者收益变更。
        </Alert>
        <Alert mt={10} mb={10} variant="light" color="teal" title="为什么开源项目会收费？不是全部免费吗？" icon={
            <IconInfoCircle />
        }>
            开源不等于完全免费服务，为了本开源项目的可持续发展以及覆盖相关服务器费用，我们设计了若干基于云端的付费项。如果您认可秒达工具箱，并希望该项目能有更好的发展，可以考虑通过订阅增值服务的方式来支持我们。您只需付出一份午餐的钱，就能获得物超所值的高级权益，还能让开发团队有更多的资金和信心做更多的事情。

            请放心，离线不依赖服务器API的功能，依旧会永久免费开放给所有用户，我们只对云端API进行适当的收费。如果付费项对您造成了困扰，请随时让我们知道，我们会积极再改进可持续化的开源发展方案。
        </Alert>
    </>

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


    const [t_orderQueryRes, orderQueryRes] = apiSlice.useLazyWxpayNewOrderQuery({
    })
    const rt_t_orderQueryRes = () => {
        return t_orderQueryRes({
            planCount: rh?.npState?.planCount || 1,
            selectedPlan: rh?.npState?.selectedPlan + '',
        })
    }

    const wxVerifyRes = apiSlice.useWxpayVerfiyPayQuery({
        outTradeNo: orderQueryRes?.data?.data?.outTradeNo || ''
    }, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: !orderQueryRes?.data?.data?.outTradeNo
    })

    useEffect(() => {
        if (wxVerifyRes.isSuccess) {
            if (wxVerifyRes.data?.data?.trade_state == 'SUCCESS') {
                AlertUtils.alertSuccess('支付成功，感谢您的支持，将跳转到下一页')
                // success
            }
        }
    }, [wxVerifyRes.status])


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
                <Stack>
                    {
                        wxpayPlanConfigs?.configs?.filter(x => x.status !== 'offline')?.map(x => (
                            <Radio key={x.id} value={x.id} label={x.label + `(${x.price}元)`} />
                        )) || []
                    }
                </Stack>
            </Group>
        </Radio.Group>
        <TextInput
            {...rh?.bindOnChange({
                npStateKey: 'planCount'
            })}
            type='number'
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
                    <div className='w-full items-center'>
                        <div className='mx-auto flex justify-center items-center flex-col '>
                            <div className='mt-10'>
                                {
                                    orderQueryRes.isLoading ? 'loading...' :
                                        orderQueryRes.data?.error ? 'error: ' + orderQueryRes.data?.error :
                                            !orderQueryRes.data?.data?.qrcode ? 'no available data' :
                                                <QRCodeSVG width={'200px'} height={'200px'} value={orderQueryRes.data?.data?.qrcode + ''} />
                                }
                            </div>
                            <div>
                                <div className='mt-5 ' style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}>
                                    <div className='font-xs' style={{
                                        fontSize: '15px'
                                    }}>
                                        {orderQueryRes.data?.data?.description ? '' + orderQueryRes.data?.data?.description : ''} - {wxVerifyRes?.data?.data?.trade_state_desc}
                                    </div>
                                    <div className='font-xs' style={{
                                        fontSize: '15px'
                                    }}>
                                        {orderQueryRes.data?.data?.outTradeNo ? '订单号: ' + orderQueryRes.data?.data?.outTradeNo : ''}
                                    </div>
                                    <div style={{
                                        color: 'darkorange',
                                        fontSize: '24px'
                                    }} className='mt-5'>
                                        {orderQueryRes.data?.data?.total ? '总金额: ' + orderQueryRes.data?.data?.total + '元' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Stepper.Step>
                <Stepper.Step
                    label="付款成功"
                    description="查看礼品卡列表"
                    allowStepSelect={shouldAllowSelectStep(2)}
                >
                    <div className='w-full items-center'>
                        <div className='mx-auto flex justify-center items-center flex-col '>
                            <Title>感谢您的支持！</Title>
                        </div>
                    </div>
                </Stepper.Step>

                <Stepper.Completed>
                    <div className='w-full items-center p-2'>
                        <div className='mx-auto flex justify-center items-center flex-col '>
                            <Title>感谢您的支持！</Title>
                            <p className='text-center'>
                                默认情况下，我们不会直接应用您的权益，您的权益礼品卡已发放到您的账户中，您可以在个人中心查看您的权益礼品卡列表。
                                <br />
                                点击下方按钮即可查看并应用您的权益礼品卡，如果您有任何问题，请随时联系我们。
                            </p>
                        </div>
                    </div>
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                {active === 3 ? '' : <Button variant="default" disabled={
                    active === 0
                } onClick={() => handleStepChange(active - 1)}>
                    上一步
                </Button>}
                {
                    active === 1 ? <>
                        <Button color='lime' onClick={() => {
                            rt_t_orderQueryRes().then(v => {
                                AlertUtils.alertSuccess('付款码已刷新')
                            })
                        }}>
                            刷新界面
                        </Button>
                        <Button onClick={async () => {
                            AlertUtils.alertInfo(`正在查询付款状态中...`)
                            wxVerifyRes.refetch().then(x => {
                                if (x.data?.data?.trade_state != 'SUCCESS') {
                                    AlertUtils.alertWarn(`支付未完成，当前状态: ${x.data?.data?.trade_state_desc}，如果需要订单支持，请点击下方按钮联系我们，感谢您的理解`)
                                    return;
                                }
                                setActive(3)
                            })
                        }}>付款已完成</Button>
                    </> : ''
                }
                {
                    active === 3 ? <>
                        <Button color='cyan' onClick={async () => {
                            AlertUtils.alertSuccess(`为您跳转至礼品卡列表`)
                            hist.push(`/settings/my-privilege?type=redemption`)
                        }}>查看礼品卡</Button>
                    </> : ''
                }
                {
                    active === 0 ? <>
                        <Button onClick={async () => {
                            switch (active + '') {
                                case '0':
                                    if (!rh?.npState?.selectedPlan) {
                                        AlertUtils.alertErr('请先选择目标权益')
                                        return
                                    }
                                    if (!rh?.npState?.planCount) {
                                        AlertUtils.alertErr('请先选择权益数量')
                                        return
                                    }
                                    rt_t_orderQueryRes()
                                    break;
                            }
                            handleStepChange(active + 1)
                        }}>下一步</Button>
                    </> : ''
                }
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