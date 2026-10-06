# Gaming E-commerce Frontend

## Desarrollo

```powershell
npm install
npm run dev
```

La API local se configura con `VITE_API_URL` (por defecto `http://localhost:8080/api`) y `VITE_SERVER_HOST` (por defecto `http://localhost:8080`).

## Checkout

Configura `VITE_STRIPE_PUBLISHABLE_KEY` con la clave publicable de Stripe para mostrar el formulario de tarjeta. El backend también debe tener `STRIPE_SECRET_KEY` y, opcionalmente, `STRIPE_CURRENCY` (por defecto `ars`). No configures secretos en variables `VITE_*`.

Si falta una clave, el pago queda deshabilitado y el checkout muestra el estado de configuración.
