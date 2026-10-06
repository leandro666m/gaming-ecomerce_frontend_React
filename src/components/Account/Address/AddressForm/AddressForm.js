import {Form} from "semantic-ui-react";
import { useFormik} from "formik";
import { initialValues, validationSchema } from './AddressForm.form'
import {createAddress, updateAddress} from "@/api";
import {useAuth} from "@/hooks";


export  function AddressForm( props ) {

    const { onClose, onReload, addressId, address } = props

    const { user } = useAuth()
    const formik = useFormik( {
            initialValues: initialValues(address),
            validationSchema: validationSchema(),
            validateOnChange: false,
            onSubmit: async ( formValue) => {
                try{
                    if( addressId ){
                        await updateAddress( formValue, addressId )
                    } else {
                        await createAddress( formValue, user.id )
                    }

                    formik.handleReset()
                    onReload()
                    onClose()
                }catch (error){
                    console.error(error)
                }
            }
    }  )

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input name='title' placeholder='Título' value={formik.values.title} onChange={formik.handleChange} error={formik.errors.title}/>

            <Form.Group widths='equal'>
                <Form.Input name='name' placeholder='Nombre'  value={formik.values.name} onChange={formik.handleChange} error={formik.errors.name} />
                <Form.Input name='address' placeholder='Dirección'  value={formik.values.address} onChange={formik.handleChange} error={formik.errors.address}/>
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Input name='state' placeholder='Provincia'  value={formik.values.state} onChange={formik.handleChange} error={formik.errors.state} />
                <Form.Input name='city' placeholder='Ciudad'  value={formik.values.city} onChange={formik.handleChange} error={formik.errors.city} />
            </Form.Group>

            <Form.Group widths='equal'>
                <Form.Input name='postal_code' placeholder='Código postal'  value={formik.values.postal_code} onChange={formik.handleChange} error={formik.errors.postal_code} />
                <Form.Input name='phone' placeholder='Teléfono' value={formik.values.phone} onChange={formik.handleChange} error={formik.errors.phone} />
            </Form.Group>

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting} > Guardar </Form.Button>

        </Form>
    )
}
