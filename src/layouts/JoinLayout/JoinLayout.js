
import { Link, Navigate } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import styles from './JoinLayout.module.scss';
import { useAuth } from '@/hooks';



export function JoinLayout(props) {

  const { children } = props;
  const { user } = useAuth();

  if(user) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className={styles.container}>

    <div className={styles.topBar}>
      <Link to='/'> 
        <Image src='/images/logo.png' alt='gaming' />
      </Link>

      <Link to='/'>
        <Icon name='close' /> 
      </Link>
    </div>

        <div className={styles.blockLeft}>{children}</div>

        <div className={styles.blockRight}> </div>

    </div>
  )
}
