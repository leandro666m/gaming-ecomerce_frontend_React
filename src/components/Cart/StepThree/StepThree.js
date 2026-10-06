import styles from './StepThree.module.scss'
import {Button, Icon} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {Separator} from "@/components/Shared";



export function StepThree() {


    return (
        <div className={styles.stepThree}>
            <Icon name={'check circle'} size={'massive'} color={'green'}/>
            <Separator height={20}/>
            <h2>¡Compra exitosa!</h2>
            <Separator height={50}/>

            <Button as={Link} to={'/account'} primary> Ver mis pedidos </Button>

        </div>
    );
}

