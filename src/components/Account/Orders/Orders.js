import {useEffect, useState} from "react";
import {useAuth} from "@/hooks";
import {getAllOrder} from "@/api";
import {NoResult} from "@/components/Shared";
import { Order } from './Order'
import {map} from "lodash";


export function Orders() {

    const [orders, setOrders] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        ( async () =>{
            try{
                const response = await getAllOrder(user.id)
                setOrders(response.data)
            }catch(error){
                console.error('🐞 Orders error: ', error)
            }
        } )()
    }, [user?.id]);

    if(!orders) return <NoResult text="No hay pedidos" />

    return (
        <div>
            { map(orders, (order) => (
                <Order key={order.id} order={order} />
              ))
            }
        </div>
    );
}

