import Axios from 'axios'

export const getLocation = () => {
    return (dispatch) => {
        Axios.get(`${process.env.REACT_APP_API_TICKITZ}location`)
            .then((res) => {
                console.log(res.data.location);
                const dataMovie = res.data.location
                dispatch({ type: 'GET_LOCATION', payload: dataMovie })
            }).catch(() => {
                alert('cannot get movies ')
            })
        }
    }