import { getKVSaveDir, getRootDataDir } from '@/web2share-copy/homedir';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const kvSaveDir = getKVSaveDir();

export const KVUtils = {
  set(key: string, value: string) {
    writeFileSync(path.join(kvSaveDir, key), value);
  },
  get(key: string): string | null {
    const file = path.join(kvSaveDir, key);
    if (!file) return null;
    return readFileSync(file).toString();
  },
  defaultIfNotExists(key: string, defaultValue: string) {
    const v = this.get(key);
    if (v) return v;
    this.set(key, defaultValue);
    return defaultValue;
  }
};
