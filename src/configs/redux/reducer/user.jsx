const initialState = {
    user: {
        email: '',
        password: '',
    },
    isLoggedIn : false
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
        return{
            ...state,
            user: {
                ...state.user,
                ...action.payload
            },
            isLoggedIn : true
        }
        case 'GET_USER_LOGGED_IN':
        return{
            ...state,
            user: {
                ...state.user,
                ...action.payload
            },
            isLoggedIn : true
        }
        default:
            return state
    }
}
export default userReducer