import { request } from './request';

export async function RegisterApi(data) {
    const [firstName, ...lastNameParts] = data.name.trim().split(/\s+/);
    return request('/clients', {
        method: 'POST',
        body: JSON.stringify({
            email: data.email.trim(),
            username: data.username.trim(),
            password: data.password,
            firstName,
            lastName: lastNameParts.join(' ') || firstName,
        }),
    });
}

export function LoginApi(data) {
    return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email: (data.email || data.identifier).trim(),
            password: data.password,
        }),
    });
}

export function LogoutApi() {
    return request('/auth/logout', { method: 'POST' });
}


