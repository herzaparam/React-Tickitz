// import React, { Component } from 'react'
// import Button from '../../base/Button'
// import Input from '../../base/Input'

// class Formsignin extends Component() {
//     constructor(){
//         super()
//         this.state = {
//           email: '',
//           password: ''
//         }
//       }
//     onChange = (e) =>{
//         this.setState({
//             [e.target.name]: e.target.value
//           })
//     }
//     handleLogin = (e)=>{
//         e.preventDefault()
//         const password = 'risano'
//         const email= 'risano@gmail.com'
//         if (this.state.password === password && this.state.email === email){
//           this.props.history.push('/')
//         }else{
//           alert('email anda salah')
//         }
//       }

//     render (){
//     return (
//         <div>
//             <form>
//                 <Input name="email" type="text" placeholder="write your email" label="email" onChange={this.onChange}/>
//                 <Input name="password" type="password" placeholder="write your password" label="Password" onchange={this.onChange}/>
//                 <Button title="Sign in" color="" onClick={this.handleLogin} size="full" />
//             </form>
//         </div>
//     )
// }
// }

// export default Formsignin
