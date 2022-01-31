import Axios from 'axios'
import Swal from 'sweetalert2'

export const getLocation = (city) =>  (dispatch) => {
    return new Promise((resolve, reject)=>{
        Axios.get(`${process.env.REACT_APP_API_TICKITZ}location/?city=${city}`)
            .then((res) => {
                const dataMovie = res.data.data
                dispatch({ type: 'GET_LOCATION', payload: dataMovie })
            })
            .catch((err) => {
                reject(Swal.fire({
                    icon: "error",
                    title: "Unfortunately",
                    text: "Order ticket feature isn't available right now",
                }))
            })
        })
    }