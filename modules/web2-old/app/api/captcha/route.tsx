import os from 'os'
import path from 'path';
import fileSystem from 'fs'
import { readFileSync } from 'fs';
import dao from '@/app/__CORE__/dao';
import { setCookie, getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic' // defaults to auto
import { randomUUID } from 'crypto';
import { getLafToolsDataDir } from '@/app/__CORE__/share/homedir';




