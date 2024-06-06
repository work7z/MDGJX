import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { Icon, IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import { SystemModuleItem, SystemSubModuleItem } from '@/systemModules';
import { Link } from 'react-router-dom';

type LinksGroupProps = {
    forceOpen: boolean,
    getHrefValue: (item: SystemSubModuleItem) => string;
    isItActive: (item: SystemSubModuleItem) => boolean;
    setUpdateOpenId:(newId:string|undefined)=>any;
    actualOpenId?:string,
    icon?:Icon;
} & SystemSubModuleItem

export function LinksGroup(props: LinksGroupProps) {
    const { id, href, icon: Icon, children, name, } = props;
    const initiallyOpened = props.actualOpenId == props.id
    const hasLinks = Array.isArray(children) && children.length > 0;
    const opened = initiallyOpened || props.forceOpen;
    const setOpened =  (isOpen:boolean)=>{
        props.setUpdateOpenId(isOpen ? props.id : 'n/a')
    }
    const items = (hasLinks ? children : []).map((linkItem) => {
        const active = props.isItActive(linkItem)
        return <Link
            to={props.getHrefValue(linkItem)}
            className={classes.link + ' ' + (
                (
                    active ? " " + classes.controlactive : ''
                )
            )}
        >
            <Text>
                {linkItem.name}
            </Text>
            </Link>
    });

    const active = props.isItActive(props)
    const jsx = <UnstyledButton onClick={() => setOpened(!initiallyOpened)} className={classes.control + (
        active ? " " + classes.controlactive : ''
    )}>
        <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                {
                    Icon ? <ThemeIcon variant="light" size={30}>
                        <Icon style={{ width: rem(18), height: rem(18) }} />
                    </ThemeIcon> : ''
                }
                <Box ml="md" className='font-normal'>{name}</Box>
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
    return (
        <>
            {
                hasLinks ? jsx : <Link
                    data-active={active || undefined}
                    to={props.getHrefValue(props)}
                    onClick={() => {
                    }}
                >
                    {jsx}
                </Link>
            }

            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}
