
import { Form, Message } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { InitialValues, ValidationSchema } from './RegisterForm.form' 
import { useNavigate } from 'react-router-dom'
import { RegisterApi } from '@/api'



export function RegisterForm() {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: InitialValues(),
    validationSchema: ValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await RegisterApi(formValues)
        navigate('/join/sign-in')
      } catch (error) {
        formik.setStatus(error.message || 'No se pudo crear la cuenta.');
      }
    }
  })


  return (
    <Form onSubmit={formik.handleSubmit}>
      {formik.status && <Message error content={formik.status} />}
      <Form.Group widths='equal'>
        <Form.Input name='email' type='email' placeholder='Correo electrónico' value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email}/>
        <Form.Input name='username' type='text' placeholder='Nombre de usuario' value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username}/>
      </Form.Group>


      <Form.Group widths='equal'>
        <Form.Input name='name' type='text' placeholder='Nombre y apellido' value={formik.values.name} onChange={formik.handleChange} error={formik.errors.name}/>
        <Form.Input name='password' type='password' placeholder='Contraseña' value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password}/>
      </Form.Group>

      <Form.Button type='submit' fluid loading={formik.isSubmitting}>Registrarse</Form.Button>
    </Form>
  )
}
