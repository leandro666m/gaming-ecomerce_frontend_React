import { Button, Icon, Label } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {useAuth, useCart} from "@/hooks";
import styles from './Account.module.scss';
import classNames from "classnames";


export function Account() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const { total } = useCart()

    const goToLogin = () => navigate('/join/sign-in');
    const goToAccount = () => navigate('/account');
    const goToCart = () => {
        if (!user) goToLogin()
        else navigate('/cart')
    }

    return (
        <div className={styles.account}>
            <Button icon className={styles.cart} onClick={goToCart} >
                <Icon name='cart' />
                { total > 0 && <Label circular> {total} </Label> }
            </Button>

            <Button icon className={ classNames({ [styles.user]: user } ) } onClick={user ? goToAccount :goToLogin} >
                <Icon name='user outline' />
            </Button>

        </div>
    )
}
