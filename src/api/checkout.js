import { request } from './request';

function mapItems(games) {
    return games.map(({ id, quantity }) => ({ gameId: id, quantity }));
}

export function createPaymentIntent(games) {
    return request('/checkout/payment-intent', {
        method: 'POST',
        body: JSON.stringify({ items: mapItems(games) }),
    });
}

export function completeCheckout(paymentIntentId, addressId, games) {
    return request('/checkout/complete', {
        method: 'POST',
        body: JSON.stringify({ paymentIntentId, addressId, items: mapItems(games) }),
    });
}