import _ from "lodash";

export const mergeWithNoArr = (objValue: any, srcValue: any) => {
    return _.merge(objValue, srcValue, (objValue, srcValue) => {
        if (_.isArray(objValue)) {
            return srcValue;
        }
    })
}