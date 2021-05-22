import Axios from 'axios'

export const login = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${process.env.REACT_APP_API_TICKITZ}user/login`, data)
            .then((res) => {
                const dataUser = res.data.data[0]
                dispatch({ type: 'LOGIN', payload: dataUser })
                localStorage.setItem('token', dataUser.token)
                resolve(dataUser)
            }).catch((err) => {
                reject(err)
            })
    })

}

export const getUser = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${process.env.REACT_APP_API_TICKITZ}user/profile`, { headers: { Authorization: localStorage.getItem('token') } })
            .then((res) => {
                const dataUser = res.data.user
                dispatch({ type: 'GET_USER_LOGGED_IN', payload: dataUser })
                resolve(dataUser)
            }).catch((err) => {
                reject(err)
            })
    })
}





