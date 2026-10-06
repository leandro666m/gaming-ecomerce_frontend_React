import { request } from './request';

export function mapPlatform(platform) {
    return {
        id: platform.id,
        attributes: {
            id: platform.id,
            title: platform.name,
            slug: platform.slug,
            icon: {
                data: platform.iconUrl ? { attributes: { url: platform.iconUrl } } : null,
            },
        },
    };
}

export async function getAllPlatform() {
    const platforms = await request('/platforms');
    return { data: platforms.map(mapPlatform) };
}

export async function getPlatformBySlug(slug) {
    const platform = await request(`/platforms/slug/${encodeURIComponent(slug)}`);
    return mapPlatform(platform);
}