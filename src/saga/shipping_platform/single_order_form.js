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
import {
    actionsTypes as gobal_action
} from '../../reducers'
import {
    actionTypes as single_order_action
} from '../../reducers/shipping_platform/single_order_form'


export function* get_form_info(data) {
    yield put({ type: single_order_action.SET_INFO, data: data });
}

export function* update_form_info(data) {
    yield put({ type: single_order_action.UPDATE_FORM_INFO , data: data });
}


export function* reset_form_info(address_data) {
    yield put({ type: single_order_action.RESET_ALL_INFO });
}

export function* reset_service_info() {
    yield put({ type: single_order_action.RESET_SERVICE_INFO });
}

export function* update_form_info_flow() {
    while (true) {
        let action = yield take(single_order_action.UPDATE_FORM_INFO);
        yield call(update_form_info,action.data)
    }
}

export function* get_form_info_flow() {
    while (true) {
        let action = yield take(single_order_action.GET_FORM_INFO);
        yield call(get_form_info, action.data)
    }
}

export function* reset_form_info_flow() {
    while (true) {
        let action = yield take(single_order_action.RESET_ALL_INFO);
        yield call(reset_form_info)
    }
}

export function* reset_service_info_flow() {
    while (true) {
        let action = yield take(single_order_action.RESET_SERVICE_INFO);
        yield call(reset_service_info)
    }
}


