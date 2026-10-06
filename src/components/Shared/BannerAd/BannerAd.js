import styles from  './BannerAd.module.scss';
import {Button, Container, Image} from "semantic-ui-react";
import { Link } from "react-router-dom";



export function BannerAd(props) {

    const { title, subtitle, btnTitle, btnLink, image } = props;


    return (
        <div className={styles.container}>
            <Container className={styles.containerImage}>
                <Image src={image} />
            </Container>

            <div className={styles.infoContainer}>
                <Container>
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>

                    <Button as={Link} to={btnLink} primary>
                        {btnTitle}
                    </Button>
                </Container>
            </div>

        </div>
    );
}

