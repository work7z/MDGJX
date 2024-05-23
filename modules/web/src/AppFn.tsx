import _ from "lodash";

export const mergeWithNoArr = (objValue: any, srcValue: any) => {
    return _.mergeWith(objValue, srcValue, (objValue, srcValue) => {
        if (_.isArray(objValue) || _.isPlainObject(objValue)) {
            return srcValue;
        }
    })
}

export const readStrFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target?.result as string)
        }
        reader.onerror = (e) => {
            reject(e)
        }
        reader.readAsText(file)
    })
}
