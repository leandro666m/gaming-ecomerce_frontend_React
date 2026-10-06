import * as Yup from 'yup';




export function InitialValues() {
 
 
  return {
    email: '',
    username: '',
    name: '',
    password: ''
  }
}


export function ValidationSchema() {
     
     
    return Yup.object({
        email: Yup.string().email(true).required(true),
        name: Yup.string().required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true)
    })
}