import axios from 'axios'

// export const addOrder = (data) => (dispatch) => {
//     return new Promise((resolve, reject) => {
//         Axios.post(`${process.env.REACT_APP_API_TICKITZ}user/login`, data)
//             .then((res) => {
//                 const dataUser = res.data.data[0]
//                 dispatch({ type: 'LOGIN', payload: dataUser })
//                 localStorage.setItem('token', dataUser.token)
//                 resolve(dataUser)
//             }).catch((err) => {
//                 reject(err)
//             })
//     })

// }