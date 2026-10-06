
import styles from './ListAddresses.module.scss';
import {useEffect, useState} from "react";
import {getAddressById} from "@/api";
import {useAuth} from "@/hooks";
import {map} from "lodash";
import {Address} from "@/components/Account/Address/ListAddresses/Address";



export function ListAddresses(props) {

    const { reload, onReload } = props
    const { user } = useAuth()
    const [addresses, setAddresses] = useState(null)

    useEffect(() => {
        ( async ()=> {
            try{
                const response = await getAddressById( user.id )
                setAddresses(response.data)
            }catch (error) {
                console.error("🍋 ListAddresses-error: ", error);
            }
        } )()
    }, [reload, user?.id] )

    if (!addresses) return <p>Loading...</p>

    return (
        <div className={styles.addresses}>
            { map(addresses, (address)=>(
                <Address key={address.id} addressId={address.id} address={address.attributes} onReload={onReload} />
                ) )
            }
        </div>
    )
}
