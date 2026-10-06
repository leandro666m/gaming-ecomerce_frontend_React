import styles from './StepOne.module.scss';
import {Basket} from "@/components/Cart/StepOne/Basket";
import {Resume} from "@/components/Cart/StepOne/Resume";

export function StepOne(props) {

    const { games } = props;


    return (
        <div className={styles.stepOne}>
            <div className={styles.center}>
                <Basket games={games} />
            </div>

            <div className={styles.right}>
                <Resume games={games}/>
            </div>

        </div>
    );
}

