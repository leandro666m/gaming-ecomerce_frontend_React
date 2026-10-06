import { request } from './request';
import { getGamesByIds } from './game';

async function getClientWishlist(clientId) {
    try {
        return await request(`/clients/${clientId}/wishlist`);
    } catch (error) {
        if (error.status === 404) return null;
        throw error;
    }
}

export async function getCheckWishlist(clientId, gameId) {
    const wishlist = await getClientWishlist(clientId);
    if (!wishlist?.gameIds.includes(Number(gameId))) return false;
    return { id: wishlist.id, gameId: Number(gameId) };
}

export async function addToMyWishlist(clientId, gameId) {
    let wishlist = await getClientWishlist(clientId);
    if (!wishlist) {
        wishlist = await request(`/clients/${clientId}/wishlist`, {
            method: 'POST',
            body: JSON.stringify({ gameIds: [] }),
        });
    }

    const updatedWishlist = await request(`/wishlists/${wishlist.id}/games/${gameId}`, {
        method: 'POST',
    });
    return { id: updatedWishlist.id, gameId: Number(gameId) };
}

export function deleteFromMyWishlist(wishlistId, gameId) {
    return request(`/wishlists/${wishlistId}/games/${gameId}`, { method: 'DELETE' });
}

export async function getAllMyWishlist(clientId) {
    const wishlist = await getClientWishlist(clientId);
    if (!wishlist) return [];

    const games = await getGamesByIds(wishlist.gameIds);
    return games.map((game) => ({
        id: game.id,
        attributes: {
            game: { data: game },
        },
    }));
}