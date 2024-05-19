import { Container, Title, Accordion } from '@mantine/core';
import classes from './FaqWithBg.module.css';
import GetAppInfo from '@/AppInfo';
import OldUserRemark from './OldUserRemark';

export default function FaqSimple() {
    return (
        <Container size="sm" className={classes.wrapper}>
            <Title ta="center" className={classes.title}>
                常见问题(FAQ)
            </Title>

            <Accordion variant="separated">
                <Accordion.Item className={classes.item} value="reset-password">
                    <Accordion.Control>请问{GetAppInfo().name}是开源软件吗？（对的，完全开源）</Accordion.Control>
                    <Accordion.Panel  >
                        <p className='space-y-2'>
                            是的，{GetAppInfo().name}是开源软件，我们的代码以AGPLv3协议开源于<a href={GetAppInfo().githubRepo} target='_blank'>GitHub</a>上，任何人都可以进行代码审查。我们开源的目的是为了确保没有任何潜在的后门或恶意代码，也是为了赢取用户的信任，并吸引更多优秀的开发者加入我们的开发团队。
                            <br />
                            目前，我们已完全开源了<b>客户端、Web端、服务器端</b>，如果有一天你发现我们作恶，社区完全可以fork一个新版本，另起炉灶以抵制作恶。
                            <br />
                            <i>Talk is cheap, show me the code!</i> <br />作为纯软件团队，我们愿意将最重要的代码资产交出来，展示我们的诚意，以及未来持续维护的决心，更重要的是，绝不作恶和背刺用户。
                        </p>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="another-account">
                    <Accordion.Control>既然是一款开源软件，为什么会有专业版？（需要用户的帮助）</Accordion.Control>
                    <Accordion.Panel>
                        <p>
                            开源软件不等于免费服务，开发组需要收入来维持日常开支(吃饭)以及服务器软签等费用。为了让这个项目能够活下去，我们额外提供了一个专业版，提供了好用稳定的进阶付费功能。您现在购买的专业版将会是最优惠的一个价格，未来价格可能会因成本而上涨。当然，我们绝不会背刺用户。
                        </p>
                        <p>
                            说回到开源与免费，本质上来说，它也是一款【免费】软件，指的是用户可以自搭服务器，自己配置相关API，自己配数据库，所有付费功能都将不受原版本的限制，但这可能需要一些专业的技术背景，如果您不具备这些技术背景，我们建议您购买专业版，我们会为您提供一站式服务。
                        </p>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="payment">
                    <Accordion.Control>开发组对于这款工具箱的未来蓝图是怎样规划的? （三端统一）</Accordion.Control>
                    <Accordion.Panel>
                        不画饼的讲一句：移动端、平板端、电脑端，三端统一！
                    </Accordion.Panel>
                </Accordion.Item>


                <Accordion.Item className={classes.item} value="payment2" >
                    <Accordion.Control>我是CodeGen老用户，原来的付费计划是怎么安排的？（权益依旧，附赠永久）</Accordion.Control>
                    <Accordion.Panel>
                        <OldUserRemark />
                    </Accordion.Panel>
                </Accordion.Item>


                {/* <Accordion.Item className={classes.item} value="newsletter">
                    <Accordion.Control>?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item> */}

                {/* <Accordion.Item className={classes.item} value="credit-card">
                    <Accordion.Control>Do you store credit card information securely?</Accordion.Control>
                    <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item> */}

            </Accordion>
        </Container>
    );
}