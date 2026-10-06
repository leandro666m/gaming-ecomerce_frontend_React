
import { JoinLayout } from '@/layouts'
import styles from './sign-up.module.scss'
import { Link } from 'react-router-dom'
import { RegisterForm } from '@/components/Auth/RegisterForm/RegisterForm'
import {Seo} from "@/components/Shared";


export default function SignUpPage() {


  return (
      <>
          <Seo title='Registrarse' />
    <JoinLayout>
        <div className={styles.signIn}>
          <h3>Crear cuenta</h3>
          
          <RegisterForm />

          <div className={styles.actions}>
            <Link to="/join/sign-in" >Atras</Link>
          </div>

        </div>
    </JoinLayout>
  </>
  )
}
