import {
    put,
    take,
    call,
    fork
} from 'redux-saga/effects'
import {
    get,
    post
} from '../../util/fetch'

import { handle_error } from '../../util/error'

import {
    actionsTypes as gobal_action
} from '../../reducers'
import {
    actionsTypes as user_account_action
} from '../../reducers/shipping_platform/user'

import {
    actionTypes as user_order_action
} from '../../reducers/shipping_platform/user/order'

import {
    actionTypes as user_service_action
} from '../../reducers/shipping_platform/user/service'

import {
    actionTypes as tool_action
} from '../../reducers/shipping_platform/tool'

import { history } from '../../container';


export function* login(data) {
    yield put({
        type: gobal_action.FETCH_START
    });
    try {
        
        return yield call(post, '/user/login', data)
    } catch (error) {
        console.log(error.response)
        yield put({
            type: gobal_action.SET_MESSAGE,
            messageContent: error.response.status == 504 ? error.message : error.response.data.message,
            status_code: 1
        });
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
    } finally {
        yield put({
            type: gobal_action.FETCH_END
        });
    }
}

export function* loginFlow() {
    while (true) {
        let request = yield take(user_account_action.USER_LOGIN);
        console.log(request)
        let response = yield call(login, request.data);
        if (response && response.code === 0) {
            yield put({
                type: user_account_action.RESPONSE_USER_INFO,
                data: response.data
            })
            yield put({
                type: gobal_action.SET_MESSAGE,
                messageContent: '登录成功!',
                status_code: 0
            });
            yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
        }
    }
}

export function* logOut() {
    yield put({
        type: gobal_action.FETCH_START
    });
    try {    
        return yield call(get, '/user/logout')
    } catch (error) {
        console.log(error.response)
        yield put({
            type: gobal_action.SET_MESSAGE,
            messageContent: error.response.status == 504 ? error.message : error.response.data.message,
            status_code: 1
        });
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
    } finally {
        yield put({
            type: gobal_action.FETCH_END
        });
    }
}

export function* logOutFlow() {
    while (true) {
        let request = yield take(user_account_action.USER_LOGOUT);
        console.log(request)
        let response = yield call(logOut);
        if (response && response.code === 0) {      
            yield put({
                type: gobal_action.SET_MESSAGE,
                messageContent: '账号已经登出!',
                status_code: 0
            });
            yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
            history.push('/login')
        }
    }
}


export function* register(data) {
    yield put({
        type: gobal_action.FETCH_START
    });
    try {
        return yield call(post, '/user/register', data)
    } catch (error) {
        yield put({
            type: gobal_action.SET_MESSAGE,
            messageContent: '注册失败',
            status_code: 1
        });
    } finally {
        yield put({
            type: gobal_action.FETCH_END
        });
    }
}

export function* registerFlow() {
    while (true) {
        let request = yield take(gobal_action.USER_REGISTER);
        let response = yield call(register, request.data);
        if (response && response.code === 0) {
            yield put({
                type: gobal_action.SET_MESSAGE,
                msgContent: '注册成功!',
                msgType: 1
            });
            yield put({
                type: gobal_action.RESPONSE_USER_INFO,
                data: response.data
            })
        }

    }
}

export function* user_auth() {
    while (true) {
        yield take(user_account_action.USER_AUTH);
        try {
            yield put({
                type: gobal_action.FETCH_START
            });
            let response = yield call(get, '/user/userInfo');
            if (response && response.code === 0) {
                yield put({
                    type: user_account_action.RESPONSE_USER_INFO,
                    data: response.data
                })
            }
            console.log( 'user auth response ' + JSON.stringify(response.data))
        } catch (err) {
            console.log(err)
            yield put({
                type: user_account_action.RESPONSE_USER_INFO,
                data: {}
            })
            history.push('/login')
        } finally {
            yield put({
                type: gobal_action.FETCH_END
            });
        }
    }
}

export function* getAllorder(filter) {
    yield put({ type: gobal_action.FETCH_START });
    try {
        return yield call(post, '/user/get_orders', filter);
    } catch (error) {
        yield put({
            type: gobal_action.SET_MESSAGE,
            messageContent: error.response.data.message,
            status_code: 1
        });
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
        history.push('/login')
    } finally {
        yield put({ type: gobal_action.FETCH_END });
        console.log('Finish fetching')
    }
}

export function* getAllorderFlow() {
    while (true) {
        let req = yield take(user_order_action.GET_ALL_ORDER);//监听action ,req 中包含filter
        let res = yield call(getAllorder, req.data);
        if (res && res.code === 0) {
            let tempArr = [];
            for (let i = 0; i < res.data.length; i++) {
                tempArr.push(res.data[i])
            }
            // result 属性来自于reducer
            yield put({ type: user_order_action.SET_ALL_ORDER, data: { 'result': tempArr } });
        }
    }
}

export function* get_order_count(filter) {
    yield put({ type: gobal_action.FETCH_START });
    try {
        return yield call(post, '/user/get_orders_count', filter);
    } catch (error) {
        yield call(notificition_error, error)
    } finally {
        // yield put({ type: gobal_action.FETCH_END });
    }
}

export function* get_order_count_flow() {
    while (true) {
        let req = yield take(user_order_action.GET_ORDER_COUNT);//监听action ,req 中包含filter
        try {
            let res = yield call(get_order_count, req.data);
            let { count, result } = res.data
            if (res && res.code === 0) {
                yield put({ type: user_order_action.SET_ALL_ORDER, data: { count, result } });
            }
        } catch (error) {
            // console.log('error happened! :' + error)
        }finally {
            yield put({ type: gobal_action.FETCH_END });
        }
    }
}

export function* delete_drafts(data) {
    yield put({ type: gobal_action.FETCH_START });
    try {
        return yield call(post, '/user/delete_drafts', data.req_body);
    } catch (error) {
        yield call(notificition_error, error)
    } finally {  
     
    }
}

export function* delete_drafts_flow() {
    while (true) {
        let payload = yield take(user_order_action.DELETE_ORDERS);
        let res = yield call(delete_drafts, payload.data);
        if (res) {
            yield call(set_order_count , payload.data.from_page);
            yield call(message_success, res)
        }
        yield put({ type: gobal_action.FETCH_END });
    }
}

export function* get_service(data) {
    yield put({ type: gobal_action.FETCH_START });
    try {
        return yield call(post, '/user/get_service_rate');
    } catch (error) {
        yield put({
            type: gobal_action.SET_MESSAGE,
            messageContent: error.response.data.message,
            status_code: 1
        });
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
        history.push('/login')
    } finally {
        yield put({ type: gobal_action.FETCH_END });
    }
}

export function* get_service_flow() {
    while (true) {
        let request = yield take(user_service_action.GET_SERVICE);//监听action
        let res = yield call(get_service);
        if (res && res.code === 0) {
            yield put({ type: user_service_action.SET_SERVICE, data: res.data });
        }
    }
}

export function* reset_service() {
    yield put({ type: user_service_action.RESET_SERVICE });
}

export function* reset_service_flow() {
    while (true) {
        let action = yield take(user_service_action.RESET_SERVICE);
        yield call(reset_service)
    }
}

export function* submit_draft(data) {
    yield put({ type: gobal_action.FETCH_START });
    try {
        return yield call(post, '/user/update_drafts', data.req_body);
    } catch (error) {
        yield put({
            type: gobal_action.SET_MESSAGE,
            messageContent: error.response.data.message,
            status_code: 1
        })
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
        history.push('/login')
    } finally {
        try {
            //from_page shows request from current page .
            let res = yield call(get_order_count, { 'status': data.from_page });
            if (res && res.code === 0) {
                let { count, result } = res.data
                yield put({ type: user_order_action.SET_ALL_ORDER, data: { count, result } });
            }
        } catch (error) {
            console.log('Error happened!: ' + error)
        }
        yield put({ type: gobal_action.FETCH_END });
    }
}

export function* submit_draft_flow() {
    while (true) {
        //payload 来自前端的object , payload 包含 actiion type ，data 以及附属数据
        let payload = yield take(user_order_action.UPDATE_ORDER);
        let res = yield call(submit_draft, payload.data);
        if (res) {
            let message = ''
            res.code == 0 ? message = '更新成功' : message = res.message
            yield put({ type: gobal_action.SET_MESSAGE, messageContent: message, status_code: 0 });
        }
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
    }
}

export function* get_tracking(request_body) {
    yield put({ type: gobal_action.FETCH_START });
    yield put({ type: tool_action.RESET_TRACKING_RESULT });
    try {
        return yield call(post, '/user/get_tracking', request_body);
    } catch (error) {
        yield call(notificition_error, error)
    } finally {
        // yield put({ type: tool_action.SET_RESULT, data: res.data });

    }
}

export function* get_tracking_flow() {
    while (true) {
        let req = yield take(tool_action.GET_TRACKING);
        let res = yield call(get_tracking, req.data);
        if (res) {
            let res_data = { tracking_result: res.data.result }
            let message = ''
            res.code == 0 ? message = '查询成功' : message = res.message
            yield put({ type: gobal_action.SET_MESSAGE, messageContent: message, status_code: 0 });
            yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
            yield put({ type: tool_action.SET_RESULT, data: res_data });
        }
        yield put({ type: gobal_action.FETCH_END });
    }
}

export function* notificition_error(error) {
    yield put({
        type: gobal_action.SET_MESSAGE,
        messageContent: handle_error(error).message,
        status_code: 1
    });
    if (!handle_error(error).is_authed) history.push('/login')
    yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 })
}

export function* message_success(res) {  
        let message = ''
        message = res.message
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: message, status_code: 0 });
        yield put({ type: gobal_action.SET_MESSAGE, messageContent: '', status_code: 0 });
}

export function* set_order_count(current_page) {
    let res = yield call(get_order_count, { 'status': current_page });
    if (res && res.code === 0) {
        let { count, result } = res.data
        yield put({ type: user_order_action.SET_ALL_ORDER, data: { count, result } });
    }
}

export function* reset_order_result() {
    yield put({ type: user_order_action.RESET_ORDER_RESULT });
}

export function* reset_order_result_flow() {
    while (true) {
        let action = yield take(user_order_action.RESET_ORDER_RESULT);      
        let result = yield call(reset_order_result)
    }
}

// export function* set_order_number(data) {
//     let payload = yield call(set_order_number);
//     console.log(payload)
//     let {count} = payload
//     yield put({ type: user_order_action.SET_ORDER_COUNT, data: { count } });
// }

// export function* set_order_number_flow() {
//     while (true) {
//         let action = yield take(user_order_action.SET_ORDER_COUNT);  
//         console.log(action.data)
//         // let {count} = action   
//         yield put({ type: user_order_action.SET_ALL_ORDER, data: { count : action.data} });
//         // console.log(action)
//     }
// }







