import { request } from './request';
import { getGamesByIds } from './game';

async function mapOrder(order) {
    const games = await getGamesByIds(order.items.map((item) => item.gameId));
    const gamesById = new Map(games.map((game) => [game.id, game]));

    return {
        id: order.id,
        attributes: {
            totalPayment: order.totalPayment,
            createdAt: null,
            products: order.items.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                attributes: gamesById.get(item.gameId)?.attributes,
            })).filter((item) => item.attributes),
            addressShipping: {
                attributes: {
                    title: 'Dirección de envío',
                    name: order.shippingName,
                    address: order.shippingAddress,
                    city: order.shippingCity,
                    state: order.shippingState,
                    postal_code: order.shippingPostalCode,
                    phone: order.shippingPhone,
                },
            },
        },
    };
}

export async function getAllOrder(clientId) {
    const orders = await request(`/clients/${clientId}/orders/recent`);
    return { data: await Promise.all(orders.map(mapOrder)) };
}