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

export {
    convertParams
}