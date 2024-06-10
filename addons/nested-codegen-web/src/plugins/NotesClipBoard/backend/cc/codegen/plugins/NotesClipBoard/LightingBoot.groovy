
package cc.codegen.plugins.NotesClipBoard

import cc.codegen.plugins.NotesClipBoard.handler.NotesClipBoardHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler
import cn.hutool.core.swing.clipboard.ClipboardUtil

import java.awt.datatransfer.DataFlavor
import java.awt.datatransfer.Transferable
import java.awt.datatransfer.UnsupportedFlavorException

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new NotesClipBoardHandler()
        ]
    }

    static void main(String[] args) {
        def str = ClipboardUtil.getStr()
        println(str)
        def image = ClipboardUtil.getImage()
        println(image)
    }
}
