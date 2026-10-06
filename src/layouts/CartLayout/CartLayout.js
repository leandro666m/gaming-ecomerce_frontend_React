import {Container} from "semantic-ui-react";
import {Separator} from "@/components/Shared";
import {Footer, HeaderCart} from "@/components/Layout";


export function CartLayout(props){

    const { children } = props;


    return(
        <>
            <HeaderCart />
            <Separator height={150} />
            <Container> { children } </Container>
            <Separator height={70} />

            <Footer />
        </>
    )
}