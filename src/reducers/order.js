const initialState = [
    
]


export const actionTypes = {
    GET_ALL_ORDER: "GET_ALL_ORDER",
    SET_ALL_ORDER: "SET_ALL_ORDER",
    SAVE_ORDERS :  "SAVE_ORDERS",
    DELETE_ORDERS: "DELETE_ORDERS",
    UPDATE_ORDERS: "UPDATE_ORDERS" 
};

export const actions = {
    get_all_order: function () {
        return {
            type: actionTypes.GET_ALL_ORDER,
        }
    },

    save_orders: function (data) {
        return {
            type: actionTypes.SAVE_ORDERS,
            data
        }
    } ,
    delete_orders: function (data) {
        return {
            type: actionTypes.DELETE_ORDERS,
            data
        }
    } ,

    update_orders: function (data) {
        return {
            type: actionTypes.UPDATE_ORDERS,
            data
        }
    } ,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_ALL_ORDER:
            return [ ...action.data ];

        default:
            return state;
    }
}
