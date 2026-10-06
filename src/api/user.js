import { request } from './request';

export function getMe() {
    return request('/auth/me');
}


export const updateMe = async (userId, data) => {
    try {
        return await request(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

    } catch (error) {
        console.error("🍋 updateMe-error: ", error);
        throw new Error(error)
    }
}