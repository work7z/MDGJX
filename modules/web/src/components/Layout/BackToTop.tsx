import { Affix, Button, Transition, rem } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react"

export default () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Affix position={{ bottom: 10, right: 20 }}>
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
    )
}