export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, gym, phone, email, message, terms } = body;

  if (!name || !gym || !phone || !email || !terms) {
    return new Response(JSON.stringify({ error: 'Campos requeridos faltantes' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const dest = import.meta.env.CONTACT_EMAIL;
  const timestamp = new Date().toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' });

  try {
    await resend.emails.send({
      from: 'GymBase <contacto@gymbase.fit>',
      to: dest,
      subject: `Nuevo contacto de ${gym} — GymBase`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
          <h2 style="color: #FF5E14; margin-bottom: 24px; font-size: 24px;">Nuevo contacto desde gymbase.fit</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a0a0a0; width: 160px;">Nombre</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #a0a0a0;">Gimnasio</td><td style="padding: 8px 0;">${gym}</td></tr>
            <tr><td style="padding: 8px 0; color: #a0a0a0;">WhatsApp</td><td style="padding: 8px 0;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #a0a0a0;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #a0a0a0;">T&C aceptados</td><td style="padding: 8px 0;">${terms ? '✅ Sí' : '❌ No'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a0a0a0;">Timestamp</td><td style="padding: 8px 0;">${timestamp}</td></tr>
          </table>

          ${message ? `
          <div style="margin-top: 24px; padding: 16px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #FF5E14;">
            <p style="color: #a0a0a0; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje</p>
            <p style="margin: 0;">${message}</p>
          </div>` : ''}
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resend error:', err);
    return new Response(JSON.stringify({ error: 'Error al enviar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
