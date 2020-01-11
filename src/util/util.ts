const convertParams = (str:string, flag?:string) => {
    interface params {
        [key: string]: any
    }
    let arr = str.split(flag || '&'),
        result:params = {};
    arr && arr.length && arr.forEach(function(item, index) {
        let arrTemp = item.split('=');
        if (arrTemp && arrTemp.length === 2) {
            result[arrTemp[0]] = arrTemp[1];
        }
    })
    return result;
}

const setCache = (key:string, value:string) => {
    window.localStorage.setItem(key, value);
}

const getCache = (key:string) => {
    return window.localStorage.getItem(key);
}

const removeCache = (key:string) => {
    window.localStorage.removeItem(key);
}

const clearCache = () => {
    window.localStorage.clear();
}

export {
    convertParams,
    setCache,
    getCache,
    removeCache,
    clearCache
}