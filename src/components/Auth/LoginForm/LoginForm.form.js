import * as Yup from 'yup';


export function InitialValues() {
 
 
  return {
    identifier: '',
    password: ''
  }
}


export function ValidationSchema() {
     
     
    return Yup.object({
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    })
}