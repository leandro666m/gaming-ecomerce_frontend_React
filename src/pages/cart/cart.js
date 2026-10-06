import {CartLayout} from "@/layouts";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCart} from "@/hooks";
import {getGameById} from "@/api";
import {Cart} from '@/components/Cart'
import {Seo} from "@/components/Shared";
import {useAuth} from '@/hooks';
import {Navigate} from 'react-router-dom';


export default function CartPage(){

    const [searchParams] = useSearchParams()
    const step = searchParams.get('step') || 1
    const currentStep = Number(step);
    const [games, setGames] = useState()
    const { cart } = useCart()
    const { user } = useAuth()

    useEffect(() => {
        if (!cart) return

        (  async () => {
                try {
                    const data = []
                    for await (const item of cart) {
                        const response =  await getGameById(item.id)
                        data.push({ ...response, quantity: item.quantity })
                    }
                    setGames(data)
                } catch (error) {
                    console.error('🐞 CartPage error: ', error)
                }
            }
        )()
    }, [cart]);

    if (currentStep > 1 && !user) {
        return <Navigate to="/join/sign-in?redirect=%2Fcart%3Fstep%3D2" replace />;
    }


    return(
        <>
            <Seo title="Carrito" />

            <CartLayout>
                {currentStep === 1 && <Cart.StepOne games={games} />}

                {currentStep === 2 && <Cart.StepTwo games={games} />}

                {currentStep === 3 && <Cart.StepThree />}

            </CartLayout>
        </>
    )
}