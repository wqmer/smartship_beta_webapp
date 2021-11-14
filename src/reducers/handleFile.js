const initialState = {

}

export const actionTypes = {
  GET_WORKBOOK: "GET_WORKBOOK",
  SET_WORKBOOK: "SET_WORKBOOK"


};

export const actions = {
  get_workbook: function (data) {
      return {
          type: actionTypes.GET_WORKBOOK,
          data
      }
  } ,
};


export function reducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.SET_WORKBOOK:
    return  action.data ;

      default:
          return state;
  }
}