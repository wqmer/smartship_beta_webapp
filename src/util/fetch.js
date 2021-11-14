import axios from 'axios'
import Qs from 'qs'
import {
    resolve
} from 'url';
import {
    rejects
} from 'assert';

let config = {
    baseURL: '/api',
    // transformRequest: [
    //     function (data) {
    //         let ret = '';
    //         for (let it in data) {
    //             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //         }
    //         return ret
    //     }
    // ],
    transformResponse: [
        function (data) {
            return data
        }
    ],
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
    },
    timeout: 60000,
    responseType: 'json',
};

axios.interceptors.response.use(function (res) {
    //相应拦截器
    return res.data;
});

// axios.interceptors.request.use(config => {
//     if(config.type == 'formData' || config.method != 'post'){
//       return config
//     }
//     config.data = qs.stringify(config.data)
//     return config
//   }, (err) =>{
//     Message.error({
//       message: '加载超时'
//     });
//     return Promise.reject(err);
//   })


export function get(url, cancel_token = undefined) {
    return axios.get(url, { ...config, ...cancel_token })
}

export function post(url, data) {
    return axios.post(url, data, config)
}

export function remove(url,) {
    return axios.delete(url, config)
}

export function patch(url, data) {
    return axios.patch(url, data, config)
}

export function put(url, data) {
    return axios.put(url, data, config)
}
// export function SourceCancel() {
//     return axiosCancelSource.cancel()
// }

// export function PromisePost(url, data) {
//     return Promise.resolve( axios.post(url, data, config) )
// }