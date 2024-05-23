import { RouterWs } from '@/app';
import { Router } from 'express';

export interface Routes {
  path?: string;
  router: Router;
}
