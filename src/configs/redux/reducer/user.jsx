const initialState = {
    user: {
        email: '',
        password: '',
    },
    isLoggedIn: false,
    role: ""
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                isLoggedIn: true,
                role: action.payload.role
            }
        case 'GET_USER_LOGGED_IN':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                isLoggedIn: true,
                role: action.payload.role
            }
        default:
            return state
    }
}
export default userReducer