//   let crtBucketNum = Math.floor(idx / obj.readBatchSize);
//   let findIdxFIFOItemItem = _.find(
//     lc_store.bucketDataFIFO,
//     (x) => x.bucketNum == crtBucketNum
//   );
//   console.log(`Handling bucket number`, crtBucketNum);
//   if (_.isNil(findIdxFIFOItemItem)) {
//   if (_.isNil(lc_store.needDataLoadObj[crtBucketNum])) {
//     lc_store.needDataLoadObj[crtBucketNum] = {
//       needLoad: true,
//       eachBucketNum: crtBucketNum,
//     };
//   } else {
//     lc_store.needDataLoadObj[crtBucketNum].needLoad = true;
//   }
//     return {
//       jsx: <Cell loading={true}>Loading</Cell>,
//     };
//   }
//   // crt index: 51, batch 50, then should be 51-50-1
//   let preBaseIndex = 0;
//   if (crtBucketNum != 0) {
//     preBaseIndex = crtBucketNum * obj.readBatchSize - 1;
//   }
//   let dataList = findIdxFIFOItemItem.dataList;
//   let tVal = _.get(dataList, [
//     idx - preBaseIndex,
//     x.columnPropName,
//     "value",
//   ]);
//   if (_.isNil(tVal)) {
//     return `[NULL]`;
//   }
//   return {
//     jsx: <Cell>{tVal}</Cell>,
//   };
