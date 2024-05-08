
// Date: Thu, 11 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Allotment, AllotmentHandle } from "allotment";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { Alignment, Button, Tab, InputGroup, Navbar, Tabs, Tooltip, HotkeysTarget2, FormGroup, TagInput } from "@blueprintjs/core";
import { Dot } from "../../../../../../../../../utils/cTranslationUtils";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import TagList, {
    TagType,
} from "../../../../../../../../../components/TagList";
import React, { useEffect } from "react";
import { CSS_TW_LAYOUT_BORDER, CSS_TW_LAYOUT_BORDER_LIGHTER, CSS_TW_LAYOUT_BORDER_Y, VAL_CSS_MENU_TITLE_PANEL } from "../../../../../../../../../types/styles";
import SortByButton, {
    SortItem,
} from "../../../../../../../../../components/SortByButton";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import _ from "lodash";
import moment from "moment";
import { useHookWithSkippingFirst } from "../../Transformer/hooks";
import CopyButton from "../../../../../../../../../components/CopyButton";
import ShellNewPanel from "./ShellNewPanel";

// extension: .shg

export type ShellCommandGroup = {
    name: string;
    content: string;
    tags: string[];
    createTime: number;
    copyTimes?: number;
    id: string;
};

export default () => {
    let [tags, setTags] = React.useState<TagType[]>([
        // list of tags: SIT2, UAT2, PROD2, DB1, DB2
        {
            id: "sit2",
            name: "SIT2",
            icon: "application",
        },
        {
            id: "uat2",
            name: "UAT2",
            icon: "application",
        },
        {
            id: "prod2",
            name: "PROD2",
            icon: "application",
        },
        {
            id: "db1",
            name: "DB1",
            icon: "database",
        },
        {
            id: "db2",
            name: "DB2",
            icon: "database",
        },
    ]);
    let [activeTag, setActiveTag] = React.useState("all");
    let [shellCommands, setShellCommands] = React.useState<ShellCommandGroup[]>([
        {
            id: "copy-files-to-sit2",
            name: Dot("etV-l", "Copy Files to SIT2"),
            content: `rsync -avz --progress --stats --exclude-from=exclude.txt --delete -e "ssh -p 22" /home/username/Projects/ProjectName/ username@"SIT2":/home/username/Projects/ProjectName/`,
            tags: ["sit2"],
            createTime: 1712345678,
            copyTimes: 10,
        },
        {
            id: "file-update",
            name: Dot("mabHq", "Find Old Files"),
            content: `find /home/username/Projects/ProjectName/ -type f -mtime +30`,
            tags: ["sit2", "uat2", "prod2"],
            createTime: 1582345699,
            copyTimes: 12,
        },
        // item for database regulary backup
        {
            id: "backup-database",
            name: Dot("hMvh1", "Backup Database"),
            content: `mysqldump -u username -p --all-databases > all-databases.sql`,
            tags: ["db1", "db2", "prod2"],
            createTime: 1132345671,
            copyTimes: 30,
        },
        // item for database restore
        {
            id: "restore-database",
            name: Dot("oj23X", "Restore Database"),
            content: `mysql -u username -p < all-databases.sql`,
            tags: ["db1", "db2"],
            createTime: 1714345678,
            copyTimes: 12,
        },
        // item for redis backup
        {
            id: "backup-redis",
            name: Dot("xQ_ls", "Backup Redis"),
            content: `redis-cli save`,
            createTime: 1714342678,
            tags: ["db1",],
            copyTimes: 2,
        },
        // item for restart java service
        {
            id: "restart-java-service",
            name: Dot("ooiFU", "Restart Java Service"),
            content: `systemctl restart java.service`,
            tags: ["sit2", "uat2", "prod2"],
            createTime: 1639995678,
            copyTimes: 29,
        },
    ]);

    let isAllMode = activeTag == "all";

    let [sortItems, setSortItems] = React.useState<SortItem[]>([
        {
            id: "create-time",
            name: Dot("sglMS", "Create Time"),
        },
        {
            id: "copy-times",
            name: Dot("oqHqqVq", "Copy Times"),
        },
    ]);
    let [activeSortItem, setActiveSortItem] = React.useState<SortItem>(
        sortItems[0],
    );
    let [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
    let resizeCount = React.useRef(0);
    let [activeCommandId, setActiveCommandId] = React.useState<string>(shellCommands[0].id);
    let [hoverCommandId, setHoverCommandId] = React.useState<string>("");
    let formatted_shellCommands = React.useMemo(() => {
        return shellCommands.sort((a, b) => {
            if (activeSortItem.id == "create-time") {
                return sortDirection == "asc" ? a.createTime - b.createTime : b.createTime - a.createTime
            }
            if (activeSortItem.id == "copy-times") {
                return sortDirection == "asc" ? (a.copyTimes || 0) - (b.copyTimes || 0) : (b.copyTimes || 0) - (a.copyTimes || 0)
            }
            return -1
        })
    }, [shellCommands, sortDirection, activeSortItem])


    useEffect(() => {
        FN_GetDispatch()(
            FN_SetTextValueFromOutSideByBigTextId(bigTextId, shellCommands.find(e => e.id == activeCommandId)?.content || "")
        )
    }, [activeCommandId])

    useHookWithSkippingFirst(() => {
        setActiveCommandId("")
    }, [activeTag])

    let activeCommand = shellCommands.find(e => e.id == activeCommandId)

    let [previewTrash, setPreviewTrash] = React.useState(false)

    useHookWithSkippingFirst(() => {
        setPreviewTrash(false)
    }, [hoverCommandId])
    let [bigTextId] = activeCommandId;

    let [viewPanelId, setViewPanelId] = React.useState("general");
    let [showMoreInfo, setShowMoreInfo] = React.useState(false);
    let [showCreatePanel, onShowCreatePanel] = React.useState(false);
    // let [showCreatePanel, onShowCreatePanel] = React.useState(true);
    let returnJSX = (
        <div className="w100 h100">
            <Allotment
                ref={(e) => {
                    if (!e) return;
                    if (resizeCount.current == 0) {
                        resizeCount.current++;
                        gutils.defer(() => {
                            e && e.reset();
                        });
                    }

                }}
            >
                <Allotment.Pane preferredSize={550}>
                    <div className="relative w-full h-full flex flex-col">
                        <div>
                            <div className="">
                                <div
                                    className={
                                        "p-2  " + " border-t-0 " + CSS_TW_LAYOUT_BORDER_Y + ""
                                    }
                                    style={{ borderTop: "none" }}
                                >
                                    <InputGroup
                                        leftIcon="search"
                                        placeholder={Dot("E62ej", "Filter Shell Commands")}
                                    ></InputGroup>
                                </div>
                                <TagList
                                    onNewTag={(name: string) => {
                                        setTags([
                                            ...tags,
                                            {
                                                id: name,
                                                name: name,
                                                icon: "application",
                                            },
                                        ]);
                                    }}
                                    activeTag={activeTag}
                                    setActiveTag={setActiveTag}
                                    tags={tags}
                                ></TagList>
                            </div>
                            <div>
                                {/*
                        left side: count of shell commands
                        right side: sort button
                        */}
                                <div
                                    className={
                                        "flex justify-between px-2 py-1 using-edge-ui-bg   " +
                                        CSS_TW_LAYOUT_BORDER_Y
                                    }
                                >
                                    <div className="text-gray-500 dark:text-gray-300">
                                        <span>
                                            {Dot("oqHqqV", "Total: {0} Commands", shellCommands.length)}
                                        </span>
                                    </div>
                                    <SortByButton
                                        sortItems={sortItems}
                                        activeItem={activeSortItem.id}
                                        setActiveItem={(item) => {
                                            setActiveSortItem(sortItems.find((e) => e.id == item)!);
                                        }}
                                        sortDirection={sortDirection}
                                        setSortDirection={setSortDirection}
                                    ></SortByButton>
                                </div>
                            </div>
                            <div className="cmd-list" onMouseOut={() => {
                                // setHoverCommandId("")
                            }}>
                                {formatted_shellCommands
                                    .filter((e) => isAllMode || e.tags.includes(activeTag))
                                    .map((e) => {
                                        return (
                                            <div
                                                onMouseMove={() => {
                                                    setHoverCommandId(e.id)
                                                }}
                                                className={
                                                    "w-full relative p-2 px-3  hover:bg-slate-100 " +
                                                    " dark:hover:bg-slate-700 transition-all duration-100 cursor-pointer "
                                                    +
                                                    (
                                                        activeCommandId == e.id
                                                            ? " bg-slate-100 dark:bg-slate-700 "
                                                            : ""
                                                    )
                                                }
                                                onClick={() => {
                                                    setActiveCommandId(e.id)
                                                }}
                                                key={e.id}
                                            >
                                                <div className="w-full">
                                                    <span className="">{e.name}</span>
                                                    {e.tags.map((e) => {
                                                        return (
                                                            <span className="px-1 py-0.5 mx-1 text-xs bg-lime-300 text-gray-700 rounded">
                                                                {e}
                                                            </span>
                                                        );
                                                    })}{" "}
                                                </div>
                                                <div className="w-[80%] pt-1 overflow-ellipsis whitespace-nowrap" style={{ marginTop: '2px' }}>
                                                    <i>{e.content}</i>
                                                </div>
                                                {
                                                    hoverCommandId == e.id ? <div className="absolute  -translate-y-1/2  top-1/2 right-4" >
                                                        <Tooltip content={Dot("ucDLv", "You've copied this record for {0} times", e.copyTimes || 0)} placement="bottom">
                                                            <CopyButton onCopy={() => {
                                                                AlertUtils.copyWithAlertCopied(e.content)
                                                                e.copyTimes = (e.copyTimes || 0) + 1
                                                                setShellCommands([...shellCommands])
                                                            }}></CopyButton>
                                                        </Tooltip>
                                                        <Tooltip content={previewTrash ? Dot("CEv8B", "Are you sure to remove this record? If yes, then click this button again.") : Dot("5qV5Sf", "Remove this record from the list", e.copyTimes || 0)} placement="bottom">
                                                            <Button onClick={() => {
                                                                if (!previewTrash) {
                                                                    setPreviewTrash(true)
                                                                    return
                                                                }
                                                                setShellCommands(shellCommands.filter(ee => ee.id != e.id))
                                                            }} icon={!previewTrash ? "trash" : "warning-sign"} intent="danger" minimal ></Button>
                                                        </Tooltip>
                                                    </div> : ''
                                                }
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        <hr />
                        <div className=" pt-4  transform p-2 ">
                            {
                                showCreatePanel ? <Button onClick={() => {
                                    onShowCreatePanel(false)
                                }} text={Dot("tiaiB", "Cancel")} large intent="danger" minimal outlined fill  > </Button> : <Button onClick={() => {
                                    onShowCreatePanel(true)
                                }} text={Dot("fEr5j", "Create New Script")} large intent="success" fill  > </Button>
                            }
                        </div>
                    </div>
                </Allotment.Pane>
                <Allotment.Pane>
                    {
                        showCreatePanel ? <div className="w-full h-full">
                            <div className="using-edge-ui-bg px-3 flex flex-row justify-between items-center" style={{
                                height: VAL_CSS_MENU_TITLE_PANEL,
                            }}>
                                <div style={{
                                    fontWeight: 500,
                                    fontSize: 16
                                }}>
                                    {Dot("VZtqg6", "Create New Script Form")}
                                </div>
                                <div>
                                    <Button onClick={() => {
                                        onShowCreatePanel(false)
                                    }} small intent="danger" minimal outlined>{Dot("9_qaj", "Exit this Form")}</Button>
                                </div>
                            </div>

                            <div style={{
                                height: `calc(100% - ${VAL_CSS_MENU_TITLE_PANEL}px)`
                            }}>
                                <ShellNewPanel
                                    onNewShellCommand={(val: ShellCommandGroup) => {

                                    }}
                                    show={showCreatePanel} onClose={() => {
                                        onShowCreatePanel(false)
                                    }}></ShellNewPanel>

                                <div className="p-2">
                                    <FormGroup label={Dot("jb392", "Name")} helperText={Dot("J-3KA", "Please provide a name for this script, which would be more helpful.")}>
                                        <InputGroup large placeholder={Dot("J164i", "e.g. Copy files to remote server")}></InputGroup>
                                    </FormGroup>
                                    <FormGroup label={Dot("r1GLS", "Tags")} helperText={Dot("pANmj", "Tags can be defined based on server types, script usages, or any other criteria you prefer.") + " " + Dot("SPem9", "This field is not yet ready.")} >
                                        <TagInput disabled placeholder={Dot("EgBXL", "Select or provide tags.")} tagProps={{
                                            large: true,
                                            intent: 'none',
                                            minimal: true,
                                        }} large
                                            values={tags.map(e => e.name)}
                                        ></TagInput>
                                    </FormGroup>
                                    <FormGroup label={Dot("5eXVS", "Script Content")}>
                                        <div className="h-[300px]" style={{
                                            height: '300px'
                                        }}>
                                            <GenCodeMirror
                                                bigTextId="test-example"
                                                language="shell"
                                                lineWrap={true}
                                                onTextChange={(val) => {
                                                    //
                                                }}
                                            ></GenCodeMirror>
                                        </div>
                                    </FormGroup>
                                    <div className="p-2">
                                        <Button onClick={() => {
                                            // onShowCreatePanel(true)
                                            AlertUtils.popMsg("danger", {
                                                message: Dot("slqcWD", "This logic part is not yet supported, kindly stay tuned.")
                                            })
                                        }} text={Dot("fEr5j", "Create New Script")} large intent="primary" fill  > </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            :
                            activeCommand ? <div className="w-full h-full">
                                <div className="using-edge-ui-bg px-3 flex flex-row justify-between items-center" style={{
                                    height: VAL_CSS_MENU_TITLE_PANEL,
                                }}>
                                    <div style={{
                                        fontWeight: 500,
                                        fontSize: 16
                                    }}>
                                        {activeCommand.name}({Dot("52OiQ", "Copied {0} times", activeCommand.copyTimes || 0)})
                                    </div>
                                    <div>
                                        {moment().from(activeCommand.createTime * 1000)}
                                    </div>
                                </div>
                                <div style={{
                                    height: `calc(100% - ${VAL_CSS_MENU_TITLE_PANEL}px)`
                                }}>
                                    <Allotment className="flex flex-row" vertical >
                                        <Allotment.Pane>
                                            <GenCodeMirror
                                                bigTextId={bigTextId}
                                                language="shell"
                                                lineWrap={true}
                                                onTextChange={(val) => {
                                                    if (activeCommand) {
                                                        activeCommand.content = val
                                                        setShellCommands([...shellCommands])
                                                    }
                                                }}
                                                key={activeCommandId}
                                            ></GenCodeMirror>
                                        </Allotment.Pane>
                                        <Allotment.Pane>
                                            <div className={CSS_TW_LAYOUT_BORDER_LIGHTER + " "} style={{
                                                borderBottom: 'none',
                                                borderRight: 'none'
                                            }}>
                                                <Navbar>
                                                    <Navbar.Group>
                                                        <Navbar.Heading>
                                                            {/* Page: <strong>{''}</strong> */}
                                                            {Dot("5q-Zxqa", "Scripts Manager")}
                                                        </Navbar.Heading>
                                                    </Navbar.Group>
                                                    <Navbar.Group align={Alignment.RIGHT}>
                                                        <Tabs
                                                            animate={true}
                                                            fill={true}
                                                            id="navbar"
                                                            large={false}
                                                            onChange={(v) => {
                                                                //
                                                            }}
                                                            selectedTabId={"general"}
                                                        >
                                                            <Tab id="general" title={Dot("lUh5c", "Generator")} tagContent={3} />
                                                            <Tab id="variables" title={Dot("A69UZ", "Variables")} tagContent={3} disabled />
                                                            {/* <Tab id="variable" disabled title={Dot("huE6U", "Variable")} tagContent={7} /> */}
                                                            <Tab id="history" title={Dot("VI6VT", "History")} tagContent={4} disabled />
                                                        </Tabs>
                                                    </Navbar.Group>
                                                </Navbar>
                                                <p className="p-4">
                                                    {
                                                        showMoreInfo ? <div>
                                                            <p>
                                                                {Dot("qdeFXx", "Currently, this page you've looking for is not yet fully implemented.")} {Dot("m8rTc1", "Once the shell scripts manager is implemented, you can use it to manage your shell commands.")}
                                                            </p>
                                                            <p>
                                                                {Dot("6qT9d-N", "For the notebook, LafTools does not only provide shell commands manager, but also will add powerful note tools into it in the near future such as MarkDown, Latex, {0}, and so on. ", Dot("iknTS", "Password Manager"))}
                                                                {Dot("nSeIq8-", "Most importantly, it's for free and open source. You can use it for your personal or commercial purpose.")}
                                                            </p>
                                                            <p>
                                                                {Dot("OpPFe", "If you like LafTools, please share it with your friends and give us a star, thanks!")} <a href="https://github.com/work7z/LafTools/" target="_blank">{Dot("71x7x", "Source Code on GitHub")}</a>
                                                            </p>
                                                        </div> : <div>
                                                            <Button intent="primary" outlined minimal onClick={() => {
                                                                setShowMoreInfo(true)
                                                            }}>{Dot("tY3p1", "More Information")}</Button>
                                                        </div>
                                                    }
                                                </p>
                                            </div>
                                        </Allotment.Pane>
                                    </Allotment>
                                </div>
                            </div> : <div className="p-2">{Dot("tWe1yF", "No available shell command.")}</div>
                    }
                </Allotment.Pane>
            </Allotment>
        </div >
    );
    return (
        returnJSX
    )
    // return (
    //     <HotkeysTarget2 hotkeys={[
    //         {
    //             combo: "shift + c",
    //             global: true,
    //             label: Dot("L-p-Y", "Copy the content of the current shell command to the clipboard"),
    //             onKeyDown: () => {
    //                 alert("ok")
    //                 //
    //             },
    //         },
    //     ]}>
    //         {({ handleKeyDown, handleKeyUp }) => {
    //             return (
    //             );
    //         }}
    //     </HotkeysTarget2>
    // )
};
