import { useState } from 'react'
import styles from './Address.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { BasicModal, Confirm } from '@/components/Shared';
import { AddressForm } from '../../AddressForm';
import {deleteAddress} from "@/api";



export function Address(props) {

    const { addressId, address, onReload } = props
    const [showEdit, setShowEdit] = useState(false)
    const openCloseEdit = () => setShowEdit( (prevState)=> !prevState)

    const [showConfirm, setShowConfirm] = useState(false)
    const openCloseConfirm = () => setShowConfirm( (prevState)=> !prevState)

    const onDelete = async () => {
        try {
            await deleteAddress(addressId)
            onReload()
        }catch (error){
            console.error('Error: ', error)
        }
    }

    return (
        <>
            <div className={styles.address}>
                <div>
                    <p className={styles.title}>{address.title}: </p>
                    <p className={styles.addressInfo}>
                        {address.name}, {address.address}, {address.state}, {address.city}, {address.postal_code}
                    </p>
                </div>

                <div className={styles.actions}>
                    <Button primary icon onClick={openCloseEdit}>
                        <Icon name='pencil' />
                    </Button>
                    
                    <Button primary icon>
                        <Icon name='delete' onClick={openCloseConfirm}/>
                    </Button>
                </div>

            <Confirm open={showConfirm} onCancel={openCloseConfirm} onConfirm={onDelete} content='¿Estas seguro de que quieres eliminar la dirección?' />

            <BasicModal show={showEdit} onClose={openCloseEdit} title="Edit Address">
                <AddressForm onClose={openCloseEdit} onReload={onReload} addressId={addressId} address={address} />
            </BasicModal>

            </div>
        </>
    )
}
