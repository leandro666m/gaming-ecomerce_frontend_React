import { ENV } from '@/utils';

let csrfTokenInMemory = '';

function getCsrfToken() {
    if (csrfTokenInMemory) return csrfTokenInMemory;
    const cookie = document.cookie.split('; ')
        .find((value) => value.startsWith('XSRF-TOKEN='));
    return cookie ? decodeURIComponent(cookie.slice('XSRF-TOKEN='.length)) : '';
}

async function ensureCsrfToken() {
    const existingToken = getCsrfToken();
    if (existingToken) return existingToken;

    const response = await fetch(`${ENV.API_URL.replace(/\/$/, '')}/auth/csrf`, {
        headers: { Accept: 'application/json' },
        credentials: 'include',
    });
    if (!response.ok) throw new Error(`No se pudo iniciar la sesión segura (${response.status}).`);

    const csrf = await response.json();
    csrfTokenInMemory = csrf.token || csrf._csrf || '';
    return getCsrfToken() || csrfTokenInMemory;
}

export async function request(path, options = {}) {
    const headers = new Headers(options.headers);
    const method = (options.method || 'GET').toUpperCase();

    if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
    }

    if (options.body != null && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const endpoint = path.startsWith('/') ? path : `/${path}`;
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const csrfToken = await ensureCsrfToken();
        if (csrfToken) headers.set('X-XSRF-TOKEN', csrfToken);
    }

    const response = await fetch(`${ENV.API_URL.replace(/\/$/, '')}${endpoint}`, {
        ...options,
        method,
        credentials: 'include',
        headers,
    });

    if (!response.ok) {
        const message = await response.text();
        const error = new Error(message || `API ${response.status}: ${response.statusText}`);
        error.status = response.status;
        throw error;
    }

    if (endpoint === '/auth/login' || endpoint === '/auth/logout') {
        csrfTokenInMemory = '';
    }

    return response.status === 204 ? null : response.json();
}