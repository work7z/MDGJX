import { TypeRunItem } from "../items";
import { getAppBootstrapInternalDir } from "../web2share-copy/appdir";
import path from 'path'

// not using this module anyone
// directly reuse web2 auto update logic

let item = {
    load: () => {
        //
    },
} satisfies TypeRunItem

export default item