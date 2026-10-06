
export function calcDiscountedPrice(price, discount) {
    if(!discount) return price;

    const discountAmount = (price * discount ) / 100;
    return price - discountAmount;

}