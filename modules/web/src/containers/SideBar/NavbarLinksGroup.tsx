import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import { SystemModuleItem, SystemSubModuleItem } from '@/systemModules';
import { Link } from 'react-router-dom';

type LinksGroupProps ={
    icon?: React.FC<any> | undefined;
    label: string;
    active?:boolean
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
    
} & SystemSubModuleItem

export function LinksGroup({ href,icon: Icon, label, initiallyOpened, links,active }: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Text<'a'>
            component="a"
            className={classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
    ));

    return (
        <>
            <Link
                data-active={active || undefined}
                to={href+''}
                onClick={() => {
                }}
            >
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control + (
                active?" "+classes.controlactive:''
            )}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            Icon ? <ThemeIcon variant="light" size={30}>
                                <Icon style={{ width: rem(18), height: rem(18) }} />
                            </ThemeIcon>:''
                        }
                        <Box ml="md" className='font-normal'>{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            </Link>

            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

// const mockdata = {
//     label: 'Releases',
//     icon: IconCalendarStats,
//     links: [
//         { label: 'Upcoming releases', link: '/' },
//         { label: 'Previous releases', link: '/' },
//         { label: 'Releases schedule', link: '/' },
//     ],
// };

// export function NavbarLinksGroup() {
//     return (
//         <Box mih={220} p="md">
//             <LinksGroup {...mockdata} />
//         </Box>
//     );
// }