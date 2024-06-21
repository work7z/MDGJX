/**
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import TestRegister from "../../lib/TestRegister.mjs";
import {ELF32_LE, ELF32_BE, ELF64_LE, ELF64_BE} from "../../samples/Executables.mjs";

const ELF32_LE_OUTPUT = "============================== ELF Header ==============================\n魔数：                           \x7fELF\n格式：                           32位\n端序：                           小端序\n版本：                           1\nABI：                          System V\nABI版本：                        0\n类型：                           Executable File\n指令集架构：                        x86\nELF版本：                        1\nEntry Point:                  0x8062150\nEntry PHOFF:                  0x34\nEntry SHOFF:                  0x54\n标志：                           00000000\nELF Header Size:              52 bytes\nProgram Header Size:          32 bytes\nProgram Header Entries:       1\nSection Header Size:          40 bytes\nSection Header Entries:       3\nSection Header Names:         0\n\n============================== Program Header ==============================\nProgram Header Type:          Program Header Table\nOffset Of Segment:            52\nVirtual Address of Segment:   134512692\nPhysical Address of Segment:  134512692\nSize of Segment:              256 bytes\nSize of Segment in Memory:    256 bytes\n标志：                           Execute,Read\n\n============================== Section Header ==============================\n类型：                           String Table\nSection Name:                 .shstrab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        204\nSection Size:                 28\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           Symbol Table\nSection Name:                 .symtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        230\nSection Size:                 16\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           String Table\nSection Name:                 .strtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        245\nSection Size:                 4\nAssociated Section:           0\nSection Extra Information:    0\n\n============================== Symbol Table ==============================\nSymbol Name:                  test";
const ELF32_BE_OUTPUT = "============================== ELF Header ==============================\n魔数：                           \x7fELF\n格式：                           32位\n端序：                           大端序\n版本：                           1\nABI：                          System V\nABI版本：                        0\n类型：                           Executable File\n指令集架构：                        x86\nELF版本：                        1\nEntry Point:                  0x8062150\nEntry PHOFF:                  0x34\nEntry SHOFF:                  0x54\n标志：                           00000000\nELF Header Size:              52 bytes\nProgram Header Size:          32 bytes\nProgram Header Entries:       1\nSection Header Size:          40 bytes\nSection Header Entries:       3\nSection Header Names:         0\n\n============================== Program Header ==============================\nProgram Header Type:          Program Header Table\nOffset Of Segment:            52\nVirtual Address of Segment:   134512692\nPhysical Address of Segment:  134512692\nSize of Segment:              256 bytes\nSize of Segment in Memory:    256 bytes\n标志：                           Execute,Read\n\n============================== Section Header ==============================\n类型：                           String Table\nSection Name:                 .shstrab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        204\nSection Size:                 28\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           Symbol Table\nSection Name:                 .symtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        230\nSection Size:                 16\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           String Table\nSection Name:                 .strtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        245\nSection Size:                 4\nAssociated Section:           0\nSection Extra Information:    0\n\n============================== Symbol Table ==============================\nSymbol Name:                  test";
const ELF64_LE_OUTPUT = "============================== ELF Header ==============================\n魔数：                           \x7fELF\n格式：                           64位\n端序：                           小端序\n版本：                           1\nABI：                          System V\nABI版本：                        0\n类型：                           Executable File\n指令集架构：                        AMD x86-64\nELF版本：                        1\nEntry Point:                  0x8062150\nEntry PHOFF:                  0x40\nEntry SHOFF:                  0x78\n标志：                           00000000\nELF Header Size:              64 bytes\nProgram Header Size:          56 bytes\nProgram Header Entries:       1\nSection Header Size:          64 bytes\nSection Header Entries:       3\nSection Header Names:         0\n\n============================== Program Header ==============================\nProgram Header Type:          Program Header Table\n标志：                           Execute,Read\nOffset Of Segment:            52\nVirtual Address of Segment:   134512692\nPhysical Address of Segment:  134512692\nSize of Segment:              256 bytes\nSize of Segment in Memory:    256 bytes\n\n============================== Section Header ==============================\n类型：                           String Table\nSection Name:                 .shstrab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        312\nSection Size:                 28\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           Symbol Table\nSection Name:                 .symtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        336\nSection Size:                 16\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           String Table\nSection Name:                 .strtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        361\nSection Size:                 4\nAssociated Section:           0\nSection Extra Information:    0\n\n============================== Symbol Table ==============================\nSymbol Name:                  test";
const ELF64_BE_OUTPUT = "============================== ELF Header ==============================\n魔数：                           \x7fELF\n格式：                           64位\n端序：                           大端序\n版本：                           1\nABI：                          System V\nABI版本：                        0\n类型：                           Executable File\n指令集架构：                        AMD x86-64\nELF版本：                        1\nEntry Point:                  0x8062150\nEntry PHOFF:                  0x40\nEntry SHOFF:                  0x78\n标志：                           00000000\nELF Header Size:              64 bytes\nProgram Header Size:          56 bytes\nProgram Header Entries:       1\nSection Header Size:          64 bytes\nSection Header Entries:       3\nSection Header Names:         0\n\n============================== Program Header ==============================\nProgram Header Type:          Program Header Table\n标志：                           Execute,Read\nOffset Of Segment:            52\nVirtual Address of Segment:   134512692\nPhysical Address of Segment:  134512692\nSize of Segment:              256 bytes\nSize of Segment in Memory:    256 bytes\n\n============================== Section Header ==============================\n类型：                           String Table\nSection Name:                 .shstrab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        312\nSection Size:                 28\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           Symbol Table\nSection Name:                 .symtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        336\nSection Size:                 16\nAssociated Section:           0\nSection Extra Information:    0\n\n类型：                           String Table\nSection Name:                 .strtab\n标志：                           \nSection Vaddr in memory:      0\nOffset of the section:        361\nSection Size:                 4\nAssociated Section:           0\nSection Extra Information:    0\n\n============================== Symbol Table ==============================\nSymbol Name:                  test";

TestRegister.addTests([
    {
        name: "ELF Info invalid ELF.",
        input: "\x7f\x00\x00\x00",
        expectedOutput: "无效的ELF",
        recipeConfig: [
            {
                op: "ELF信息",
                args: [],
            },
        ],
    },
    {
        name: "ELF Info 32-bit ELF Little Endian.",
        input: ELF32_LE,
        expectedOutput: ELF32_LE_OUTPUT,
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["无"],
            },
            {
                op: "ELF信息",
                args: [],
            },
        ],
    },
    {
        name: "ELF Info 32-bit ELF Big Endian.",
        input: ELF32_BE,
        expectedOutput: ELF32_BE_OUTPUT,
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["无"],
            },
            {
                op: "ELF信息",
                args: [],
            },
        ],
    },
    {
        name: "ELF Info 64-bit ELF Little Endian.",
        input: ELF64_LE,
        expectedOutput: ELF64_LE_OUTPUT,
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["无"],
            },
            {
                op: "ELF信息",
                args: [],
            },
        ],
    },
    {
        name: "ELF Info 64-bit ELF Big Endian.",
        input: ELF64_BE,
        expectedOutput: ELF64_BE_OUTPUT,
        recipeConfig: [
            {
                op: "十六进制转字符",
                args: ["无"],
            },
            {
                op: "ELF信息",
                args: [],
            },
        ],
    },
]);
