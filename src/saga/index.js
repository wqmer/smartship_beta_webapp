import { fork } from 'redux-saga/effects'
import { getWorkbookFlow } from './file'
import {
    logOutFlow,
    loginFlow,
    getAllorderFlow,
    user_auth,
    delete_drafts_flow,
    get_service_flow,
    reset_service_flow,
    submit_draft_flow,
    get_tracking_flow,
    get_order_count_flow,
    reset_order_result_flow,
    set_order_number_flow
} from './shipping_platform/user'
import { get_form_info_flow, reset_form_info_flow, reset_service_info_flow , update_form_info_flow} from './shipping_platform/single_order_form'


export default function* rootSaga() {
    //legcy
    // yield fork(getAllorderFlow);
    // yield fork(saveOrderFlow);
    // yield fork(deleteOrderFlow);
    // yield fork(deleteOrdersFlow);
    // yield fork(convertAndSaveOrderFlow);
    // yield fork(updateOrdersFlow);
    // yield fork(updateOrdersFlow);
    // yield fork(getWorkbookFlow);
    
    yield fork(user_auth);
    yield fork(get_form_info_flow);
    yield fork(reset_form_info_flow);
    yield fork(reset_service_info_flow);
    yield fork(submit_draft_flow);
    yield fork(get_tracking_flow);
    yield fork(get_order_count_flow);
    yield fork(reset_order_result_flow);
    yield fork(update_form_info_flow);
    // yield fork(set_order_number_flow);

    yield fork(loginFlow);
    yield fork(logOutFlow);
    yield fork(getAllorderFlow);
    yield fork(delete_drafts_flow);

    yield fork(get_service_flow);
    yield fork(reset_service_flow);
}
