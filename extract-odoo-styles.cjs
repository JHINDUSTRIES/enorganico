const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  console.log("🚀 Iniciando extracción de estilos de Odoo...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Configurar User-Agent para evitar bloqueos
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

  // Interceptar y mostrar qué CSS se carga
  await page.setRequestInterception(true);
  const cssFiles = [];

  page.on("request", (request) => {
    if (request.resourceType() === "stylesheet") {
      const url = request.url();
      cssFiles.push(url);
      console.log(`📦 CSS: ${url.substring(0, 80)}${url.length > 80 ? "..." : ""}`);
    }
    request.continue();
  });

  try {
    console.log("🌐 Navegando a https://enorganico.odoo.com...");
    await page.goto("https://enorganico.odoo.com", {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    console.log("✅ Página cargada. Extrayendo estilos...");

    // 1. Extraer CSS de hojas de estilo externas
    const externalStyles = await page.evaluate(() => {
      let css = "";
      for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i];
        try {
          // Solo procesar hojas de estilo del mismo dominio o que sean accesibles
          if (sheet.href && sheet.href.includes("odoo.com")) {
            for (let j = 0; j < (sheet.cssRules || sheet.rules || []).length; j++) {
              const rule = (sheet.cssRules || sheet.rules)[j];
              if (rule.cssText) {
                css += rule.cssText + "\n";
              }
            }
          }
        } catch (e) {
          // Ignorar hojas de estilo con restricciones CORS
        }
      }
      return css;
    });

    // 2. Extraer estilos inline (<style> tags)
    const inlineStyles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("style"))
        .map((style) => style.textContent || style.innerHTML)
        .join("\n");
    });

    // 3. Extraer estilos de atributos 'style'
    const inlineAttrs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("[style]"))
        .map((el) => `/* Inline: ${el.tagName}.${el.className} */\n${el.getAttribute("style")}`)
        .join("\n");
    });

    // 4. Extraer variables CSS (muy importante)
    const cssVariables = await page.evaluate(() => {
      const rootStyles = getComputedStyle(document.documentElement);
      const vars = {};

      // Obtener todas las propiedades que empiezan con --
      for (let i = 0; i < rootStyles.length; i++) {
        const prop = rootStyles[i];
        if (prop.startsWith("--")) {
          vars[prop] = rootStyles.getPropertyValue(prop).trim();
        }
      }

      return Object.entries(vars)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n");
    });

    // Combinar todo
    const allStyles = ["/* ===== VARIABLES CSS DE ODOO ===== */", ":root {", cssVariables, "}", "\n/* ===== ESTILOS EXTERNOS ===== */", externalStyles, "\n/* ===== ESTILOS INLINE ===== */", inlineStyles, "\n/* ===== ATRIBUTOS STYLE ===== */", inlineAttrs].join("\n");

    // Filtrar lo más relevante para desarrollo
    const relevantStyles = allStyles
      .split("\n")
      .filter((line) => {
        // Mantener líneas importantes
        const keep =
          line.includes(":root") ||
          line.includes("--o-") ||
          line.includes("--bs-") ||
          line.includes("--gl-") ||
          line.includes(".o_") ||
          line.includes(".btn") ||
          line.includes(".container") ||
          line.includes(".row") ||
          line.includes(".col-") ||
          line.includes("#wrap") ||
          line.includes(".navbar") ||
          line.includes(".dropdown") ||
          line.includes(".modal") ||
          line.includes(".card") ||
          line.includes(".form-") ||
          line.includes("background") ||
          line.includes("color:") ||
          line.includes("font-") ||
          line.includes("padding") ||
          line.includes("margin") ||
          line.includes("border") ||
          line.includes("transition") ||
          line.startsWith("/*");

        // Eliminar líneas innecesarias
        const remove = line.includes("/web/content/") || line.includes("data:image") || line.includes('url("http') || line.trim() === "" || line.trim() === "}" || line.trim() === "{";

        return keep && !remove;
      })
      .join("\n");

    // Guardar archivos
    fs.writeFileSync("odoo-full-styles.css", allStyles);
    fs.writeFileSync("odoo-relevant-styles.css", relevantStyles);

    // Crear versión simplificada para Astro
    const astroStyles = [
      "/* src/styles/odoo-overrides.css */",
      "/* Variables CSS extraídas de enorganico.odoo.com */",
      ":root {",
      cssVariables,
      "  /* Colores principales Odoo 19 */",
      "  --o-primary: #017e84;",
      "  --o-secondary: #6c757d;",
      "  --o-success: #28a745;",
      "  --o-info: #17a2b8;",
      "  --o-warning: #ffc107;",
      "  --o-danger: #dc3545;",
      "  /* Espaciados */",
      "  --o-gap: 16px;",
      "  --o-border-radius: 0.25rem;",
      "}",
      "\n/* Clases utilitarias Odoo */",
      ...allStyles.split("\n").filter((l) => l.includes(".o_")),
      "\n/* Overrides para Bootstrap */",
      ...allStyles.split("\n").filter((l) => l.includes(".btn") || l.includes(".form-")),
    ].join("\n");

    fs.writeFileSync("src/styles/odoo-overrides.css", astroStyles);

    console.log("\n✅ ¡Extracción completada!");
    console.log("📊 Archivos generados:");
    console.log("  1. odoo-full-styles.css (todos los estilos)");
    console.log("  2. odoo-relevant-styles.css (estilos filtrados)");
    console.log("  3. src/styles/odoo-overrides.css (listo para Astro)");
    console.log(`\n🎯 CSS cargados encontrados: ${cssFiles.length}`);
    console.log(`📏 Estilos extraídos: ${allStyles.length.toLocaleString()} caracteres`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await browser.close();
  }
})();
