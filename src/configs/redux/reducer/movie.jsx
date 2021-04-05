const initialState ={
    allFilms:[],
    nowFilms:[],
    upFilms:[],
    loading: false
}

const movieReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'LOADING_MOVIE':
            return {
                ...state,
                loading: true
            }
        case 'GET_ALL_MOVIE':
            return {
                ...state,
                allFilms: action.payload,
                loading: false
            }
        case 'GET_NOW_MOVIE':
            return{
                ...state,
                nowFilms: action.payload,
                loading: false
            }
            case 'GET_UP_MOVIE':
                return {
                    ...state,
                upFilms: action.payload,
                loading: false
                }
        default:
            return state
    }
}
export default movieReducer