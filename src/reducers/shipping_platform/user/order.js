
import merge from 'lodash/merge'

const initialState = {
    count: undefined,
    result: []
}

export const actionTypes = {
    GET_ALL_ORDER: "GET_ALL_ORDER",
    GET_ORDER_COUNT: "GET_ORDER_COUNT",
    SET_ORDER_COUNT: "SET_ORDER_COUNT",
    RESET_ORDER_RESULT:"RESET_ORDER_RESULT",
    SET_ORDER_COUNT:"SET_ORDER_COUNT",
    SET_ALL_ORDER: "SET_ALL_ORDER",
    SAVE_ORDERS: "SAVE_ORDERS",
    DELETE_ORDERS: "DELETE_ORDERS",
    UPDATE_ORDER: "UPDATE_ORDER"
};

export const actions = {
    get_all_order: function (data) {
        return {
            type: actionTypes.GET_ALL_ORDER,
            data
        }
    },

    reset_order_result: function () {
        return {
            type: actionTypes.RESET_ORDER_RESULT,
        }
    },

    get_order_count: function (data) {
        return {
            type: actionTypes.GET_ORDER_COUNT,
            data
        }
    },
    save_orders: function (data) {
        return {
            type: actionTypes.SAVE_ORDERS,
            data
        }
    },
    delete_orders: function (data) {
        return {
            type: actionTypes.DELETE_ORDERS,
            data
        }
    },
    update_order: function (data) {
        return {
            type: actionTypes.UPDATE_ORDER,
            data
        }
    },

    set_order_count: function (data) {
        return {
            type: actionTypes.SET_ORDER_COUNT,
            data
        }
    },  
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_ALL_ORDER:
            return { ...action.data}
        case actionTypes.SET_ORDER_COUNT:
            return { ...action.data}
        case actionTypes.RESET_ORDER_RESULT:
            return  {
                    ...state,
                    result: []
                }
        default:
            return state;
    }
}
