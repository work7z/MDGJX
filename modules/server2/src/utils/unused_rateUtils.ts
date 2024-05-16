import _ from 'lodash';

const runningArr: {
  [key: string]: { timestamp: number }[];
} = {};
export type NothingFn = () => void;
const waitArr: {
  [key: string]: NothingFn[];
} = {};

export type waitConfig = {
  timesPerSecond: number;
};

export const rateUtils = {
  wait: async (key: string, config: waitConfig): Promise<void> => {
    if (!runningArr[key]) {
      runningArr[key] = [];
    }
    let waitArrKeyArr = waitArr[key];
    if (!waitArrKeyArr) {
      waitArrKeyArr = [];
      waitArr[key] = waitArrKeyArr;
    }
    const now = new Date().getTime();
    runningArr[key] = runningArr[key].filter(item => now - item.timestamp < 1000);
    if (runningArr[key].length >= config.timesPerSecond) {
      const p = new Promise<number>(resolve => {
        if (resolve) {
          waitArrKeyArr.push(() => {
            resolve(1);
          });
        }
      });
      await p;
    }
    runningArr[key].push({ timestamp: now });
    if (
      _.size(runningArr[key]) >= config.timesPerSecond &&
      !_.isEmpty(runningArr[key]) &&
      runningArr[key][0].timestamp - runningArr[key][runningArr[key].length - 1].timestamp < 1000
    ) {
      runningArr[key].shift();
    }
    if (!_.isEmpty(waitArr[key])) {
      waitArr[key][0]();
      waitArr[key].shift();
    }
  },
};
