
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || 'http://localhost:8080';
const API_URL = import.meta.env.VITE_API_URL || `${SERVER_HOST}/api`;

export const ENV = {
    SERVER_HOST,
    API_URL,
    ENDPOINTS: {
        AUTH: {
            REGISTER: 'clients',
            LOGIN: 'auth/login'
        },
        USER_ME: 'auth/me',
        USERS: 'users',
        PLATFORM: 'platforms',
        ADDRESS: 'addresses',
        GAME: 'games',
        WISHLIST: 'wishlists',
        ORDER: 'orders',
    },
    TOKEN: 'token',
    CART: 'cart',
}