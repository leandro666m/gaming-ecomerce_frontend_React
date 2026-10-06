
import { JoinLayout } from '@/layouts'
import styles from './sign-in.module.scss'
import { Link } from 'react-router-dom'
import { LoginForm } from '@/components/Auth'
import {Seo} from "@/components/Shared";



export default function SignInPage() {


  return (
      <>
          <Seo />
        <JoinLayout>
            <div className={styles.signIn}>
                <h3>Iniciar sesión</h3>

                <LoginForm />


                <div className={styles.actions}>
                  <Link to="/join/sign-up">¿No tienes cuenta? Regístrate</Link>
                </div>

            </div>
        </JoinLayout>
      </>
  )
}
