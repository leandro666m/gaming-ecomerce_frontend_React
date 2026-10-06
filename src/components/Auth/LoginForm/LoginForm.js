import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { Message } from 'semantic-ui-react';
import { InitialValues, ValidationSchema } from "./LoginForm.form";
import { useAuth } from "@/hooks";
import { useNavigate, useSearchParams } from 'react-router-dom';



export function LoginForm() {

    const { login } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const formik = useFormik({
      initialValues: InitialValues(),
      validationSchema: ValidationSchema(),
      validateOnChange: false,
      onSubmit: async (formValues) => {
        try {
          await login(formValues)
          navigate(searchParams.get('redirect') || '/account', { replace: true })

        } catch (error) {
          formik.setStatus(error.message || 'No se pudo iniciar sesión.');
        }
      }
    })
  
  
    return (
      <Form onSubmit={formik.handleSubmit}>
        {formik.status && <Message error content={formik.status} />}
        <Form.Input name='identifier' type="email" placeholder='Correo electrónico' value={formik.values.identifier} onChange={formik.handleChange} error={formik.errors.identifier}/>

        <Form.Input name='password' type='password' placeholder='Contraseña' value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password}/>

        <Form.Button type='submit' fluid loading={formik.isSubmitting}>Iniciar sesión</Form.Button>
      
    </Form>
  )
}
