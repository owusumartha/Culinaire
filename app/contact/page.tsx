'use client';

import { useState, useMemo } from 'react';
import { useToast } from '../lib/contexts';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, ShieldIcon } from '../components/Icons';

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', captcha: '' });
  const [captchaError, setCaptchaError] = useState('');

  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setCaptchaError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(form.captcha) !== captcha.answer) {
      setCaptchaError('Incorrect answer. Please try again.');
      return;
    }
    showToast('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '', captcha: '' });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Contact Us</h1></div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <div className="icon"><MapPinIcon size={24} color="#c9a227" /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Konongo, Ghana</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon"><PhoneIcon size={24} color="#c9a227" /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>0245009447</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon"><MailIcon size={24} color="#c9a227" /></div>
                <div>
                  <h4>Email Us</h4>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=owusumartha2005@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#c9a227', fontWeight: 600 }}
                  >
                    owusumartha2005@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon"><ClockIcon size={24} color="#c9a227" /></div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
                  <p>Sat: 9:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            <div>
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Returns & Refunds">Returns & Refunds</option>
                    <option value="Wholesale / Bulk Orders">Wholesale / Bulk Orders</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={5} required />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldIcon size={16} color="#c9a227" /> What is {captcha.a} + {captcha.b}?
                  </label>
                  <input
                    type="number"
                    name="captcha"
                    value={form.captcha}
                    onChange={handleChange}
                    placeholder="Enter the answer"
                    required
                    style={captchaError ? { borderColor: '#c0392b' } : {}}
                  />
                  {captchaError && <div className="error-msg" style={{ display: 'block', color: '#c0392b', fontSize: '0.8rem', marginTop: 4 }}>{captchaError}</div>}
                </div>
                <button type="submit" className="btn btn-gold btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="qr-contact" style={{ textAlign: 'center' }}>
            <h2>Chat With Us on WhatsApp</h2>
            <p style={{ color: '#6b6b6b', marginBottom: 20 }}>Scan the QR code or tap the button to start a conversation.</p>
            <div className="qr-box" style={{ display: 'inline-block', padding: 20, background: '#fff', borderRadius: 12, boxShadow: 'var(--shadow)' }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://wa.me/233245009447?text=Hello%20Culinaire!')}`}
                alt="WhatsApp QR Code"
                style={{ width: 200, height: 200 }}
              />
              <p style={{ marginTop: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><PhoneIcon size={16} color="#c9a227" /> 0245009447</p>
            </div>
            <div style={{ marginTop: 20 }}>
              <a href="https://wa.me/233245009447?text=Hello%20Culinaire!" target="_blank" rel="noopener" className="btn btn-gold">
                Open WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
