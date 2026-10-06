import {ENV} from '../constants';

export function resolveMediaUrl(url) {
    if (!url) return '';

    try {
        return new URL(url, ENV.SERVER_HOST).toString();
    } catch {
        return url;
    }
}