# Enorganico Website

Sitio web oficial para la marca **Enorganico**, una empresa dedicada a productos orgánicos y naturales. El sitio presenta una experiencia inmersiva con secciones dinámicas, carruseles de productos, animaciones y integración con Odoo para e-commerce.

## ✨ Características

- **8 secciones de inicio**: Hero con video de fondo, galerías de productos, timeline de procesos, y más.
- **Productos destacados**: Enfocado en crokini (café, matcha, yogur orgánicos).
- **Integración con Odoo**: Sincronización de assets y enlaces para tienda en línea.
- **Animaciones fluidas**: Uso de GSAP y ScrollTrigger para interacciones dinámicas.
- **Responsive**: Optimizado para móviles y escritorio con Bootstrap y TailwindCSS.
- **Carruseles interactivos**: Implementados con Swiper para navegación de productos.

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Astro](https://astro.build/) - Para sitios estáticos rápidos y modulares.
- **Styling**: TailwindCSS, Bootstrap, Sass - Para diseño responsivo y personalizado.
- **JavaScript**: GSAP, ScrollTrigger, Swiper - Para animaciones y carruseles.
- **Backend Integration**: Odoo - Para e-commerce y gestión de contenido.
- **Lenguajes**: TypeScript, HTML, SCSS.
- **Herramientas**: Prettier (formateo), PostCSS (procesamiento CSS).

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   ├── favicon.svg
│   └── assets/ (videos, imágenes de productos, logos)
├── src/
│   ├── assets/ (imágenes base, blog, brand, crokini, icons, videos)
│   ├── components/
│   │   ├── comps/ (Carousel-1.astro, Carousel-2.astro)
│   │   ├── home/ (Section1.astro a Section8.astro)
│   │   ├── SectionGallery.astro
│   │   ├── SectionProductCarousel.astro
│   │   └── SectionProductCarousel2.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   ├── abstracts/ (mixins, variables, maps, loops)
│   │   ├── base/ (reset)
│   │   ├── components/ (buttons, carousel, hamburguer-btn)
│   │   ├── pages/home/ (sección-1.scss a sección-8.scss)
│   │   ├── themes/ (enorganico.scss)
│   │   ├── vendors/ (odoo.scss)
│   │   ├── main.scss
│   │   ├── global.css
│   │   └── odoo-*.css
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .prettierrc
└── deploy.yml
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, en una terminal:

| Comando                    | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio de producción en `./dist/`    |
| `npm run predeploy`       | Prepara el build para despliegue                 |
| `npm run deploy`          | Despliega a GitHub Pages                         |
| `npm run preview`         | Previsualiza el build localmente                 |
| `npm run astro`           | Ejecuta comandos de Astro CLI                    |

## 📦 Instalación y Uso

1. Clona el repositorio:
   ```sh
   git clone https://github.com/JHINDUSTRIES/enorganico.git
   cd enorganico
   ```

2. Instala dependencias:
   ```sh
   npm install
   ```

3. Ejecuta en desarrollo:
   ```sh
   npm run dev
   ```

4. Construye para producción:
   ```sh
   npm run build
   ```

5. Despliega:
   ```sh
   npm run deploy
   ```

## 🌐 Despliegue

El proyecto se despliega automáticamente a GitHub Pages usando `gh-pages`. El script `npm run build` incluye copiar `.nojekyll` para compatibilidad con GitHub Pages. La configuración de Astro apunta a `https://JHINDUSTRIES.github.io/enorganico`.

## 🤝 Contribuir

- Sigue las guías de estilo en `AGENTS.md` (si existe).
- Ejecuta `npm run build` antes de commits para verificar integridad.
- Usa commits descriptivos en inglés o español.

## 📄 Licencia

Este proyecto es privado para Enorganico. Consulta con el propietario para uso.

## 👀 Más Información

- Documentación de Astro: [astro.build](https://docs.astro.build)
- Comunidad: [Discord de Astro](https://astro.build/chat)
- Odoo: [odoo.com](https://www.odoo.com)
