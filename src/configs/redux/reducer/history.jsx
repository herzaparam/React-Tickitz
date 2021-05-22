const initialState = {
    order: {
        activeBtn: 0,
        btnId: 0,
        cinemaImg: "",
        city: "",
        date: "",
        films: {

        },
        price: "",
        time: "",
        totalPrice: "",
        selectedSeat: []
    }
   
    
}
const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
        return{
            ...state,
            order: {
                ...state.order,
                ...action.payload
            }
        }
        case 'UPDATE_ORDER':
        return{
            ...state,
            order: {
                ...state.order,
                ...action.payload
            }
        }
        default:
            return state
    }
}
export default historyReducer