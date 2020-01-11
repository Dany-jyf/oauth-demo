function convertParams(str:string, flag?:string){
    interface params {
        [key: string]: string
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

function setCache(key:string, value:string) {
    window.localStorage.setItem(key, value);
}

function getCache(key:string) {
    return window.localStorage.getItem(key);
}

function removeCache(key:string) {
    window.localStorage.removeItem(key);
}

function clearCache() {
    window.localStorage.clear();
}

export {
    convertParams,
    setCache,
    getCache,
    removeCache,
    clearCache
}