import * as Yup from 'yup';

export function  initialValues(){
   return {
     password: '',
     repeatPassword: '',
   }
}

export function validationSchema(){
    return Yup.object({
        password: Yup.string().required(true),
        repeatPassword: Yup.string().email(true).required(true)
            .oneOf([Yup.ref('email'), true], 'Los correos deben coincidir')
    })
}