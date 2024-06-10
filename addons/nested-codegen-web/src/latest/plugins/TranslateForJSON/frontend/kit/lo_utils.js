let lo_utils = {
  templateSettings: (...x) => {
    return _.templateSettings(...x);
  },
  after: (...x) => {
    return _.after(...x);
  },
  ary: (...x) => {
    return _.ary(...x);
  },
  assign: (...x) => {
    return _.assign(...x);
  },
  assignIn: (...x) => {
    return _.assignIn(...x);
  },
  assignInWith: (...x) => {
    return _.assignInWith(...x);
  },
  assignWith: (...x) => {
    return _.assignWith(...x);
  },
  at: (...x) => {
    return _.at(...x);
  },
  before: (...x) => {
    return _.before(...x);
  },
  bind: (...x) => {
    return _.bind(...x);
  },
  bindAll: (...x) => {
    return _.bindAll(...x);
  },
  bindKey: (...x) => {
    return _.bindKey(...x);
  },
  castArray: (...x) => {
    return _.castArray(...x);
  },
  chain: (...x) => {
    return _.chain(...x);
  },
  chunk: (...x) => {
    return _.chunk(...x);
  },
  compact: (...x) => {
    return _.compact(...x);
  },
  concat: (...x) => {
    return _.concat(...x);
  },
  cond: (...x) => {
    return _.cond(...x);
  },
  conforms: (...x) => {
    return _.conforms(...x);
  },
  constant: (...x) => {
    return _.constant(...x);
  },
  countBy: (...x) => {
    return _.countBy(...x);
  },
  create: (...x) => {
    return _.create(...x);
  },
  curry: (...x) => {
    return _.curry(...x);
  },
  curryRight: (...x) => {
    return _.curryRight(...x);
  },
  debounce: (...x) => {
    return _.debounce(...x);
  },
  defaults: (...x) => {
    return _.defaults(...x);
  },
  defaultsDeep: (...x) => {
    return _.defaultsDeep(...x);
  },
  defer: (...x) => {
    return _.defer(...x);
  },
  delay: (...x) => {
    return _.delay(...x);
  },
  difference: (...x) => {
    return _.difference(...x);
  },
  differenceBy: (...x) => {
    return _.differenceBy(...x);
  },
  differenceWith: (...x) => {
    return _.differenceWith(...x);
  },
  drop: (...x) => {
    return _.drop(...x);
  },
  dropRight: (...x) => {
    return _.dropRight(...x);
  },
  dropRightWhile: (...x) => {
    return _.dropRightWhile(...x);
  },
  dropWhile: (...x) => {
    return _.dropWhile(...x);
  },
  fill: (...x) => {
    return _.fill(...x);
  },
  filter: (...x) => {
    return _.filter(...x);
  },
  flatMap: (...x) => {
    return _.flatMap(...x);
  },
  flatMapDeep: (...x) => {
    return _.flatMapDeep(...x);
  },
  flatMapDepth: (...x) => {
    return _.flatMapDepth(...x);
  },
  flatten: (...x) => {
    return _.flatten(...x);
  },
  flattenDeep: (...x) => {
    return _.flattenDeep(...x);
  },
  flattenDepth: (...x) => {
    return _.flattenDepth(...x);
  },
  flip: (...x) => {
    return _.flip(...x);
  },
  flow: (...x) => {
    return _.flow(...x);
  },
  flowRight: (...x) => {
    return _.flowRight(...x);
  },
  fromPairs: (...x) => {
    return _.fromPairs(...x);
  },
  functions: (...x) => {
    return _.functions(...x);
  },
  functionsIn: (...x) => {
    return _.functionsIn(...x);
  },
  groupBy: (...x) => {
    return _.groupBy(...x);
  },
  initial: (...x) => {
    return _.initial(...x);
  },
  intersection: (...x) => {
    return _.intersection(...x);
  },
  intersectionBy: (...x) => {
    return _.intersectionBy(...x);
  },
  intersectionWith: (...x) => {
    return _.intersectionWith(...x);
  },
  invert: (...x) => {
    return _.invert(...x);
  },
  invertBy: (...x) => {
    return _.invertBy(...x);
  },
  invokeMap: (...x) => {
    return _.invokeMap(...x);
  },
  iteratee: (...x) => {
    return _.iteratee(...x);
  },
  keyBy: (...x) => {
    return _.keyBy(...x);
  },
  keys: (...x) => {
    return _.keys(...x);
  },
  keysIn: (...x) => {
    return _.keysIn(...x);
  },
  map: (...x) => {
    return _.map(...x);
  },
  mapKeys: (...x) => {
    return _.mapKeys(...x);
  },
  mapValues: (...x) => {
    return _.mapValues(...x);
  },
  matches: (...x) => {
    return _.matches(...x);
  },
  matchesProperty: (...x) => {
    return _.matchesProperty(...x);
  },
  memoize: (...x) => {
    return _.memoize(...x);
  },
  merge: (...x) => {
    return _.merge(...x);
  },
  mergeWith: (...x) => {
    return _.mergeWith(...x);
  },
  method: (...x) => {
    return _.method(...x);
  },
  methodOf: (...x) => {
    return _.methodOf(...x);
  },
  mixin: (...x) => {
    return _.mixin(...x);
  },
  negate: (...x) => {
    return _.negate(...x);
  },
  nthArg: (...x) => {
    return _.nthArg(...x);
  },
  omit: (...x) => {
    return _.omit(...x);
  },
  omitBy: (...x) => {
    return _.omitBy(...x);
  },
  once: (...x) => {
    return _.once(...x);
  },
  orderBy: (...x) => {
    return _.orderBy(...x);
  },
  over: (...x) => {
    return _.over(...x);
  },
  overArgs: (...x) => {
    return _.overArgs(...x);
  },
  overEvery: (...x) => {
    return _.overEvery(...x);
  },
  overSome: (...x) => {
    return _.overSome(...x);
  },
  partial: (...x) => {
    return _.partial(...x);
  },
  partialRight: (...x) => {
    return _.partialRight(...x);
  },
  partition: (...x) => {
    return _.partition(...x);
  },
  pick: (...x) => {
    return _.pick(...x);
  },
  pickBy: (...x) => {
    return _.pickBy(...x);
  },
  property: (...x) => {
    return _.property(...x);
  },
  propertyOf: (...x) => {
    return _.propertyOf(...x);
  },
  pull: (...x) => {
    return _.pull(...x);
  },
  pullAll: (...x) => {
    return _.pullAll(...x);
  },
  pullAllBy: (...x) => {
    return _.pullAllBy(...x);
  },
  pullAllWith: (...x) => {
    return _.pullAllWith(...x);
  },
  pullAt: (...x) => {
    return _.pullAt(...x);
  },
  range: (...x) => {
    return _.range(...x);
  },
  rangeRight: (...x) => {
    return _.rangeRight(...x);
  },
  rearg: (...x) => {
    return _.rearg(...x);
  },
  reject: (...x) => {
    return _.reject(...x);
  },
  remove: (...x) => {
    return _.remove(...x);
  },
  rest: (...x) => {
    return _.rest(...x);
  },
  reverse: (...x) => {
    return _.reverse(...x);
  },
  sampleSize: (...x) => {
    return _.sampleSize(...x);
  },
  set: (...x) => {
    return _.set(...x);
  },
  setWith: (...x) => {
    return _.setWith(...x);
  },
  shuffle: (...x) => {
    return _.shuffle(...x);
  },
  slice: (...x) => {
    return _.slice(...x);
  },
  sortBy: (...x) => {
    return _.sortBy(...x);
  },
  sortedUniq: (...x) => {
    return _.sortedUniq(...x);
  },
  sortedUniqBy: (...x) => {
    return _.sortedUniqBy(...x);
  },
  split: (...x) => {
    return _.split(...x);
  },
  spread: (...x) => {
    return _.spread(...x);
  },
  tail: (...x) => {
    return _.tail(...x);
  },
  take: (...x) => {
    return _.take(...x);
  },
  takeRight: (...x) => {
    return _.takeRight(...x);
  },
  takeRightWhile: (...x) => {
    return _.takeRightWhile(...x);
  },
  takeWhile: (...x) => {
    return _.takeWhile(...x);
  },
  tap: (...x) => {
    return _.tap(...x);
  },
  throttle: (...x) => {
    return _.throttle(...x);
  },
  thru: (...x) => {
    return _.thru(...x);
  },
  toArray: (...x) => {
    return _.toArray(...x);
  },
  toPairs: (...x) => {
    return _.toPairs(...x);
  },
  toPairsIn: (...x) => {
    return _.toPairsIn(...x);
  },
  toPath: (...x) => {
    return _.toPath(...x);
  },
  toPlainObject: (...x) => {
    return _.toPlainObject(...x);
  },
  transform: (...x) => {
    return _.transform(...x);
  },
  unary: (...x) => {
    return _.unary(...x);
  },
  union: (...x) => {
    return _.union(...x);
  },
  unionBy: (...x) => {
    return _.unionBy(...x);
  },
  unionWith: (...x) => {
    return _.unionWith(...x);
  },
  uniq: (...x) => {
    return _.uniq(...x);
  },
  uniqBy: (...x) => {
    return _.uniqBy(...x);
  },
  uniqWith: (...x) => {
    return _.uniqWith(...x);
  },
  unset: (...x) => {
    return _.unset(...x);
  },
  unzip: (...x) => {
    return _.unzip(...x);
  },
  unzipWith: (...x) => {
    return _.unzipWith(...x);
  },
  update: (...x) => {
    return _.update(...x);
  },
  updateWith: (...x) => {
    return _.updateWith(...x);
  },
  values: (...x) => {
    return _.values(...x);
  },
  valuesIn: (...x) => {
    return _.valuesIn(...x);
  },
  without: (...x) => {
    return _.without(...x);
  },
  words: (...x) => {
    return _.words(...x);
  },
  wrap: (...x) => {
    return _.wrap(...x);
  },
  xor: (...x) => {
    return _.xor(...x);
  },
  xorBy: (...x) => {
    return _.xorBy(...x);
  },
  xorWith: (...x) => {
    return _.xorWith(...x);
  },
  zip: (...x) => {
    return _.zip(...x);
  },
  zipObject: (...x) => {
    return _.zipObject(...x);
  },
  zipObjectDeep: (...x) => {
    return _.zipObjectDeep(...x);
  },
  zipWith: (...x) => {
    return _.zipWith(...x);
  },
  entries: (...x) => {
    return _.entries(...x);
  },
  entriesIn: (...x) => {
    return _.entriesIn(...x);
  },
  extend: (...x) => {
    return _.extend(...x);
  },
  extendWith: (...x) => {
    return _.extendWith(...x);
  },
  add: (...x) => {
    return _.add(...x);
  },
  attempt: (...x) => {
    return _.attempt(...x);
  },
  camelCase: (...x) => {
    return _.camelCase(...x);
  },
  capitalize: (...x) => {
    return _.capitalize(...x);
  },
  ceil: (...x) => {
    return _.ceil(...x);
  },
  clamp: (...x) => {
    return _.clamp(...x);
  },
  clone: (...x) => {
    return _.clone(...x);
  },
  cloneDeep: (...x) => {
    return _.cloneDeep(...x);
  },
  cloneDeepWith: (...x) => {
    return _.cloneDeepWith(...x);
  },
  cloneWith: (...x) => {
    return _.cloneWith(...x);
  },
  conformsTo: (...x) => {
    return _.conformsTo(...x);
  },
  deburr: (...x) => {
    return _.deburr(...x);
  },
  defaultTo: (...x) => {
    return _.defaultTo(...x);
  },
  divide: (...x) => {
    return _.divide(...x);
  },
  endsWith: (...x) => {
    return _.endsWith(...x);
  },
  eq: (...x) => {
    return _.eq(...x);
  },
  escape: (...x) => {
    return _.escape(...x);
  },
  escapeRegExp: (...x) => {
    return _.escapeRegExp(...x);
  },
  every: (...x) => {
    return _.every(...x);
  },
  find: (...x) => {
    return _.find(...x);
  },
  findIndex: (...x) => {
    return _.findIndex(...x);
  },
  findKey: (...x) => {
    return _.findKey(...x);
  },
  findLast: (...x) => {
    return _.findLast(...x);
  },
  findLastIndex: (...x) => {
    return _.findLastIndex(...x);
  },
  findLastKey: (...x) => {
    return _.findLastKey(...x);
  },
  floor: (...x) => {
    return _.floor(...x);
  },
  forEach: (...x) => {
    return _.forEach(...x);
  },
  forEachRight: (...x) => {
    return _.forEachRight(...x);
  },
  forIn: (...x) => {
    return _.forIn(...x);
  },
  forInRight: (...x) => {
    return _.forInRight(...x);
  },
  forOwn: (...x) => {
    return _.forOwn(...x);
  },
  forOwnRight: (...x) => {
    return _.forOwnRight(...x);
  },
  get: (...x) => {
    return _.get(...x);
  },
  gt: (...x) => {
    return _.gt(...x);
  },
  gte: (...x) => {
    return _.gte(...x);
  },
  has: (...x) => {
    return _.has(...x);
  },
  hasIn: (...x) => {
    return _.hasIn(...x);
  },
  head: (...x) => {
    return _.head(...x);
  },
  identity: (...x) => {
    return _.identity(...x);
  },
  includes: (...x) => {
    return _.includes(...x);
  },
  indexOf: (...x) => {
    return _.indexOf(...x);
  },
  inRange: (...x) => {
    return _.inRange(...x);
  },
  invoke: (...x) => {
    return _.invoke(...x);
  },
  isArguments: (...x) => {
    return _.isArguments(...x);
  },
  isArray: (...x) => {
    return _.isArray(...x);
  },
  isArrayBuffer: (...x) => {
    return _.isArrayBuffer(...x);
  },
  isArrayLike: (...x) => {
    return _.isArrayLike(...x);
  },
  isArrayLikeObject: (...x) => {
    return _.isArrayLikeObject(...x);
  },
  isBoolean: (...x) => {
    return _.isBoolean(...x);
  },
  isBuffer: (...x) => {
    return _.isBuffer(...x);
  },
  isDate: (...x) => {
    return _.isDate(...x);
  },
  isElement: (...x) => {
    return _.isElement(...x);
  },
  isEmpty: (...x) => {
    return _.isEmpty(...x);
  },
  isEqual: (...x) => {
    return _.isEqual(...x);
  },
  isEqualWith: (...x) => {
    return _.isEqualWith(...x);
  },
  isError: (...x) => {
    return _.isError(...x);
  },
  isFinite: (...x) => {
    return _.isFinite(...x);
  },
  isFunction: (...x) => {
    return _.isFunction(...x);
  },
  isInteger: (...x) => {
    return _.isInteger(...x);
  },
  isLength: (...x) => {
    return _.isLength(...x);
  },
  isMap: (...x) => {
    return _.isMap(...x);
  },
  isMatch: (...x) => {
    return _.isMatch(...x);
  },
  isMatchWith: (...x) => {
    return _.isMatchWith(...x);
  },
  isNaN: (...x) => {
    return _.isNaN(...x);
  },
  isNative: (...x) => {
    return _.isNative(...x);
  },
  isNil: (...x) => {
    return _.isNil(...x);
  },
  isNull: (...x) => {
    return _.isNull(...x);
  },
  isNumber: (...x) => {
    return _.isNumber(...x);
  },
  isObject: (...x) => {
    return _.isObject(...x);
  },
  isObjectLike: (...x) => {
    return _.isObjectLike(...x);
  },
  isPlainObject: (...x) => {
    return _.isPlainObject(...x);
  },
  isRegExp: (...x) => {
    return _.isRegExp(...x);
  },
  isSafeInteger: (...x) => {
    return _.isSafeInteger(...x);
  },
  isSet: (...x) => {
    return _.isSet(...x);
  },
  isString: (...x) => {
    return _.isString(...x);
  },
  isSymbol: (...x) => {
    return _.isSymbol(...x);
  },
  isTypedArray: (...x) => {
    return _.isTypedArray(...x);
  },
  isUndefined: (...x) => {
    return _.isUndefined(...x);
  },
  isWeakMap: (...x) => {
    return _.isWeakMap(...x);
  },
  isWeakSet: (...x) => {
    return _.isWeakSet(...x);
  },
  join: (...x) => {
    return _.join(...x);
  },
  kebabCase: (...x) => {
    return _.kebabCase(...x);
  },
  last: (...x) => {
    return _.last(...x);
  },
  lastIndexOf: (...x) => {
    return _.lastIndexOf(...x);
  },
  lowerCase: (...x) => {
    return _.lowerCase(...x);
  },
  lowerFirst: (...x) => {
    return _.lowerFirst(...x);
  },
  lt: (...x) => {
    return _.lt(...x);
  },
  lte: (...x) => {
    return _.lte(...x);
  },
  max: (...x) => {
    return _.max(...x);
  },
  maxBy: (...x) => {
    return _.maxBy(...x);
  },
  mean: (...x) => {
    return _.mean(...x);
  },
  meanBy: (...x) => {
    return _.meanBy(...x);
  },
  min: (...x) => {
    return _.min(...x);
  },
  minBy: (...x) => {
    return _.minBy(...x);
  },
  stubArray: (...x) => {
    return _.stubArray(...x);
  },
  stubFalse: (...x) => {
    return _.stubFalse(...x);
  },
  stubObject: (...x) => {
    return _.stubObject(...x);
  },
  stubString: (...x) => {
    return _.stubString(...x);
  },
  stubTrue: (...x) => {
    return _.stubTrue(...x);
  },
  multiply: (...x) => {
    return _.multiply(...x);
  },
  nth: (...x) => {
    return _.nth(...x);
  },
  noConflict: (...x) => {
    return _.noConflict(...x);
  },
  noop: (...x) => {
    return _.noop(...x);
  },
  now: (...x) => {
    return _.now(...x);
  },
  pad: (...x) => {
    return _.pad(...x);
  },
  padEnd: (...x) => {
    return _.padEnd(...x);
  },
  padStart: (...x) => {
    return _.padStart(...x);
  },
  parseInt: (...x) => {
    return _.parseInt(...x);
  },
  random: (...x) => {
    return _.random(...x);
  },
  reduce: (...x) => {
    return _.reduce(...x);
  },
  reduceRight: (...x) => {
    return _.reduceRight(...x);
  },
  repeat: (...x) => {
    return _.repeat(...x);
  },
  replace: (...x) => {
    return _.replace(...x);
  },
  result: (...x) => {
    return _.result(...x);
  },
  round: (...x) => {
    return _.round(...x);
  },
  runInContext: (...x) => {
    return _.runInContext(...x);
  },
  sample: (...x) => {
    return _.sample(...x);
  },
  size: (...x) => {
    return _.size(...x);
  },
  snakeCase: (...x) => {
    return _.snakeCase(...x);
  },
  some: (...x) => {
    return _.some(...x);
  },
  sortedIndex: (...x) => {
    return _.sortedIndex(...x);
  },
  sortedIndexBy: (...x) => {
    return _.sortedIndexBy(...x);
  },
  sortedIndexOf: (...x) => {
    return _.sortedIndexOf(...x);
  },
  sortedLastIndex: (...x) => {
    return _.sortedLastIndex(...x);
  },
  sortedLastIndexBy: (...x) => {
    return _.sortedLastIndexBy(...x);
  },
  sortedLastIndexOf: (...x) => {
    return _.sortedLastIndexOf(...x);
  },
  startCase: (...x) => {
    return _.startCase(...x);
  },
  startsWith: (...x) => {
    return _.startsWith(...x);
  },
  subtract: (...x) => {
    return _.subtract(...x);
  },
  sum: (...x) => {
    return _.sum(...x);
  },
  sumBy: (...x) => {
    return _.sumBy(...x);
  },
  template: (...x) => {
    return _.template(...x);
  },
  times: (...x) => {
    return _.times(...x);
  },
  toFinite: (...x) => {
    return _.toFinite(...x);
  },
  toInteger: (...x) => {
    return _.toInteger(...x);
  },
  toLength: (...x) => {
    return _.toLength(...x);
  },
  toLower: (...x) => {
    return _.toLower(...x);
  },
  toNumber: (...x) => {
    return _.toNumber(...x);
  },
  toSafeInteger: (...x) => {
    return _.toSafeInteger(...x);
  },
  toString: (...x) => {
    return _.toString(...x);
  },
  toUpper: (...x) => {
    return _.toUpper(...x);
  },
  trim: (...x) => {
    return _.trim(...x);
  },
  trimEnd: (...x) => {
    return _.trimEnd(...x);
  },
  trimStart: (...x) => {
    return _.trimStart(...x);
  },
  truncate: (...x) => {
    return _.truncate(...x);
  },
  unescape: (...x) => {
    return _.unescape(...x);
  },
  uniqueId: (...x) => {
    return _.uniqueId(...x);
  },
  upperCase: (...x) => {
    return _.upperCase(...x);
  },
  upperFirst: (...x) => {
    return _.upperFirst(...x);
  },
  each: (...x) => {
    return _.each(...x);
  },
  eachRight: (...x) => {
    return _.eachRight(...x);
  },
  first: (...x) => {
    return _.first(...x);
  },
  VERSION: (...x) => {
    return _.VERSION(...arg);
  },
};

export default lo_utils;
