import { ActionIcon, Affix, Button, Tooltip, Transition, rem } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp, IconBookmark, IconPlaylist, IconPlaylistAdd } from "@tabler/icons-react"

export default () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <>

            <Affix position={{ bottom: 5, right: 5 }}>
                <Tooltip label="加入收藏夹">
                    <ActionIcon
                        color='green'
                        size='md'
                        variant="light"
                    >
                        <IconBookmark style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Tooltip> 
                
                {/* <Button
                // color="teal"
                    color='green'
                    // variant="gradient"
                    leftSection={<IconBookmark style={{ width: rem(16), height: rem(16) }} />}
                    onClick={() => scrollTo({ y: 0 })}
                >
                </Button> */}
            </Affix>

            <Affix position={{ bottom: 45, right: 45 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            回到顶部
                        </Button>
                    )}
                </Transition>
            </Affix>

        </>
    )
}