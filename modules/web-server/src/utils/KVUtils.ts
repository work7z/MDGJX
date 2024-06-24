import { getKVSaveDir, getRootDataDir } from '@/web2share-copy/homedir';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const kvSaveDir = getKVSaveDir();

export const KVUtils = {
  set(key: string, value: string) {
    writeFileSync(path.join(kvSaveDir, key), value);
  },
  get(key: string): string | null {
    const file = path.join(kvSaveDir, key);
    if (!existsSync(file)) return null;
    return readFileSync(file,{encoding:'utf-8'});
  },
  defaultIfNotExists(key: string, defaultValue: string) {
    const v = KVUtils.get(key);
    if (v) return v;
    KVUtils.set(key, defaultValue);
    return defaultValue;
  }
};
