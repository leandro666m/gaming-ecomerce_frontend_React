import styles from './ChangePasswordForm.module.scss'
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./ChangePasswordForm.form";
import {Form} from "semantic-ui-react";
import {useAuth} from "@/hooks";
import {updateMe} from "@/api";


export function ChangePasswordForm() {

    const { user, logout } = useAuth()


    const formik = useFormik( {
         initialValues: initialValues(  ),
         validationSchema: validationSchema(),
         validateOnChange: false,
         onSubmit: async (formValue) => {
             try {
                 await updateMe(user.id, { password: formValue.password })
                 logout()
             } catch (error) {
                 console.error(error)
             }
            }
     } )

    return (
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
            <label>Cambiar contraseña</label>
                <Form.Input type='password' name='password' placeholder='Nueva contraseña' value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password} />
                <Form.Input type='password' name='repeatPassword' placeholder='Repetir nueva contraseña' value={formik.values.repeatPassword} onChange={formik.handleChange} error={formik.errors.repeatPassword} />
                <Form.Button type='submit' loading={formik.isSubmitting}> Enviar </Form.Button>

        </Form>
    )
}
