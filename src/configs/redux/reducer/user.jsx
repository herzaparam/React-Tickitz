const initialState = {
    user: {
        email: '',
        password: '',
    },
    isLoggedIn: false,
    role: null
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
            case 'LOG_OUT':
                return {
                    user: {
                        email: '',
                        password: '',
                    },
                    isLoggedIn: false,
                    role: null
                }

        default:
            return state
    }
}
export default userReducer