import { Card, Flex, Group } from "@mantine/core"

export default (props: {
    main: JSX.Element,
    sidebar: JSX.Element
}) => {
    return <Flex className="block sm:flex flex-row-reverse" p={0} align={'flex-start'} justify={'space-between'}>
        <Flex className="w-[100%] sm:w-[250px]" p={10}>
            {props.sidebar}
        </Flex>
        <Flex direction={'column'} flex='1' >
            {props.main}
        </Flex>
    </Flex>
}