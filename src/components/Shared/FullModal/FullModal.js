import styles from './FullModal.module.scss';
import {Icon, Modal} from "semantic-ui-react";



export function FullModal(props) {

    const { show, onClose, children } = props;


    return (
        <Modal open={show} className={styles.fullModal} >
            <Modal.Content>{children}</Modal.Content>

            <Icon name='close' className={styles.close} onClick={onClose} />
        </Modal>
    );
}

