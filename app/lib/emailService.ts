'use client';

import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const ADMIN_EMAIL = 'owusumartha2005@gmail.com';

export function initEmailJS() {
  if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

export async function sendIntruderAlert(intruderEmail: string, password: string) {
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
    console.warn('EmailJS not configured. Alert not sent.');
    return false;
  }

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: ADMIN_EMAIL,
      subject: 'Culinaire Admin - Unauthorized Access Attempt',
      intruder_email: intruderEmail,
      password_attempted: password,
      timestamp: new Date().toLocaleString(),
      message: `Someone tried to access your Culinaire admin panel with email: ${intruderEmail} and password: ${password}. Time: ${new Date().toLocaleString()}`
    });
    return true;
  } catch (err) {
    console.error('Failed to send alert:', err);
    return false;
  }
}

export function getAdminEmail(): string | null {
  return localStorage.getItem('culinaireAdminEmail');
}

export function setAdminEmail(email: string) {
  localStorage.setItem('culinaireAdminEmail', email);
}

export function isFirstLogin(): boolean {
  return !localStorage.getItem('culinaireAdminEmail');
}

export function isAuthorizedAdmin(email: string): boolean {
  const saved = localStorage.getItem('culinaireAdminEmail');
  return saved === email;
}
