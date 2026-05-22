# GymBase Marketing Site

Marketing site estático para gymbase.com. Construido con Astro + Tailwind CSS v4.

## Stack

- **Framework:** Astro 5
- **Estilos:** Tailwind CSS v4
- **Tipografía:** Barlow Condensed (headings) + DM Sans (body)
- **Formulario:** Resend API
- **Deploy:** Vercel

## Instalación

```bash
npm install
```

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|----------|-------------|
| `RESEND_API_KEY` | API key de Resend para envío de emails |
| `CONTACT_EMAIL` | Email destino para los contactos del formulario |

## Comandos

```bash
npm run dev      # Servidor de desarrollo en localhost:4321
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Deploy en Vercel

1. Importá el repo en Vercel
2. Configurá las variables de entorno (`RESEND_API_KEY`, `CONTACT_EMAIL`)
3. Deploy automático en cada push a main

## Placeholders a reemplazar

Buscá `[MAYÚSCULAS]` en el código para encontrar todos los placeholders:

- `[CORREO_DESTINO]` — Email de contacto real
- `[GYMBASE_INSTAGRAM]` — Handle de Instagram (sin @)
- `[FECHA]` — Fecha de última actualización en páginas legales
