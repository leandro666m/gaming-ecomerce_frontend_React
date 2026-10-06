
import { BasicLayout } from '@/layouts'
import { Home } from '@/components/Home'
import {BarTrust, Separator, BannerAd, Seo} from "@/components/Shared";
import {Container} from "semantic-ui-react";


const platformId = {
    playstation: 1,
    xbox: 4,
    pc: 3,
    nintendo: 2,
}

export default function HomePage() {


  return (
      <>
          <Seo />
        <BasicLayout>
            <Home.BannerLastGamePublished />

            <Separator height={100} />

            <Container>
                <Home.LatestGames title='Últimos lanzamientos' />
            </Container>
            <Separator height={100} />

            <BarTrust />
            <Separator height={100} />

            <Container>
                <Home.LatestGames title='PlayStation' limit={3} platformId={platformId.playstation} />
            </Container>
            <Separator height={100} />

            <BannerAd title='Registrate y obtené los mejores precios'
                        subtitle='¡Compara con otros juegos y elige el tuyo!'
                        btnTitle='Registrarme'
                        btnLink='/account'
                        image='/images/img01.png'
            />
            <Separator height={50} />

            <Container>
                <Home.LatestGames title='Xbox' limit={3} platformId={platformId.xbox} />
            </Container>
            <Separator height={100} />

        </BasicLayout>
      </>
  )
}
