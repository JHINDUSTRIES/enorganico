// middleware-dev.js
export function onRequest(context, next) {
  return next().then((response) => {
    // Solo en desarrollo
    if (import.meta.env.DEV) {
      return response.text().then((html) => {
        // Transformar todas las rutas /web/... en tiempo real
        const transformed = html.replace(/(src|href)=["'](\/web\/[^"']*)["']/g, `$1="https://enorganico.odoo.com$2"`);

        return new Response(transformed, response);
      });
    }
    return response;
  });
}
