import { request } from './request';

function mapAddress(address) {
    return {
        id: address.id,
        attributes: {
            ...address,
            postal_code: address.postalCode,
        },
    };
}

function toAddressRequest(data) {
    return {
        title: data.title,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postal_code,
        phone: data.phone,
    };
}

export async function getAddressById(clientId) {
    const addresses = await request(`/clients/${clientId}/addresses`);
    return { data: addresses.map(mapAddress) };
}

export async function createAddress(data, clientId) {
    const address = await request(`/clients/${clientId}/addresses`, {
        method: 'POST',
        body: JSON.stringify(toAddressRequest(data)),
    });
    return mapAddress(address);
}

export async function updateAddress(data, addressId) {
    const address = await request(`/addresses/${addressId}`, {
        method: 'PUT',
        body: JSON.stringify(toAddressRequest(data)),
    });
    return mapAddress(address);
}

export function deleteAddress(addressId) {
    return request(`/addresses/${addressId}`, { method: 'DELETE' });
}