import { join } from "path";
import fs from 'fs';

export type PkgInfo = {
    version: string,
    releaseDate: string,
    platform: string
}

export let readPkgInfoFromDir = (dir: string): PkgInfo => {
    let versionTxt = fs.readFileSync(join(dir, 'version.txt'), 'utf-8');
    let releaseDateTxt = fs.readFileSync(join(dir, 'releaseDate.txt'), 'utf-8');
    let platformTxt = fs.readFileSync(join(dir, 'platform.txt'), 'utf-8');
    return {
        version: versionTxt,
        releaseDate: releaseDateTxt,
        platform: platformTxt
    }
}
