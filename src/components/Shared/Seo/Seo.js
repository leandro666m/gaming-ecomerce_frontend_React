import { useEffect } from 'react';

export function Seo(props){

    const {title = 'Gaming - Tus juegos favoritos',
        description = 'Tus juegos favoritos para Steam, PS4, Xbox, Switch y más.'
    } = props;

    useEffect(() => {
        document.title = title;

        let descriptionMeta = document.querySelector('meta[name="description"]');
        if (!descriptionMeta) {
            descriptionMeta = document.createElement('meta');
            descriptionMeta.setAttribute('name', 'description');
            document.head.appendChild(descriptionMeta);
        }
        descriptionMeta.setAttribute('content', description);
    }, [title, description]);

    return null;

}