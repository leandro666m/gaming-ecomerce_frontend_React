import ReactPlayer from 'react-player'
import styles from './Video.module.scss';



export function Video(props) {

    const { video } = props;

    return (
        <ReactPlayer playing={false} controls={true} url={`${video}`} width="100%" height={634} className={styles.video} />
    );
}

