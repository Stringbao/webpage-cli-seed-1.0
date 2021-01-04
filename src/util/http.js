
let url_not_be_null = "<#Request URL can not be null#>";
let server_error = "<#Server error#>";

const responseResult = (res, resolve, reject) => {
    let code = res.status;
    let message = res.msg;
    let data = res.data;
    let params = res.params;
    let tmp = { data: data, params: params, msg: message, status:code};
    if (code == "200") {
        resolve(tmp);
    } else if (code == "701") {
        reject(tmp);
    } else {
        reject(tmp);
    }
}

let Ajax = {
    jsonp(url,callbackKey,data=null){
        if (!url) {
            return Promise.reject({data:null, msg:url_not_be_null});
        }
        return new Promise((resolve, reject) =>{
            $.ajax({
                type:'get',
                url:url,
                dataType: "jsonp",
                jsonp:callbackKey,
                data:data,
                success:function(res){
                    responseResult(res, resolve, reject);
                },
                error:function(err){
                    return Promise.reject({data:null, msg:server_error});
                }
            })
        })
    },
    get(url) {
        if (!url) {
            return Promise.reject({data:null, msg:url_not_be_null});
        }
        return new Promise((resolve, reject) =>{
            $.ajax({
                url:url,
                type: "get",
                contentType: 'application/json',
                dataType:"json",
                success:function(res){
                    responseResult(res, resolve, reject);
                },
                error:function(error){
                    return Promise.reject({data:null, msg:server_error});
                }
            });
        });
    },
    post(url, data, opts = {}) {
        if (!url) {
            return Promise.reject({data:null, msg:url_not_be_null});
        }
        return new Promise((resolve, reject) =>{
            let defaultParams = {
                url:url,
                type: "post",
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(data),
                dataType:"json"
            }
            let params = Object.assign(defaultParams, opts);
            $.ajax({
                ...params,
                success(res){
                    responseResult(res, resolve, reject);
                },
                error:function(err){
                    return Promise.reject({data:null, msg:server_error});
                }
            });
        })
    },
    upload(url,formData) {
        if (!url) {
            return Promise.reject({data:null, msg:url_not_be_null});
        }
        return new Promise((resolve, reject) =>{
            $.ajax({
                url:url,
                type: "post",
                data:formData,
                contentType:"multipart/form-data",
                dataType: "json",
                success:function(res){
                    responseResult(res, resolve, reject);
                },
                error:function(err){
                    return Promise.reject({data:null, msg:server_error});
                }
            });
        })
    },
    all(promises) {
        return Promise.all(promises);
    }
}

export default Ajax;