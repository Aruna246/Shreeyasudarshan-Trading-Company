
- Keep shared shopping state and shopping dialogs in the root Storefront provider so navigating between pages preserves the current bag and favourites.
- Render the continuous decorative logo in the root Storefront provider with pointer events disabled so all pages share one watermark without blocking shopping controls.
- Store illustrative product data in the browser-safe catalog module; no ordering or payment service is connected for this UI-only storefront.
- Use the supplied logo through its asset pointer and generated editorial imagery through bundled imports to preserve source fidelity.
- Pre-optimize storefront UI dependencies alongside React in Vite to prevent dependency discovery from replacing the React module graph during an active preview session.
