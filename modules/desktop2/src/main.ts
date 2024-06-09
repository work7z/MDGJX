import path from "path";
import { DMainPassProps } from "./core/d-types";
import dMain from "./core/d-main";
import { logger } from './core/utils/logger';

let props: DMainPassProps = {
  MAIN_WINDOW_VITE_DEV_SERVER_URL: process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL,
};
try{
  
dMain(props);

}catch(e){
  console.error(e)
  logger.error(e)
  process.exit(1)
}