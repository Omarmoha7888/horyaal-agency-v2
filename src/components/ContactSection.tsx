import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle, Sparkles, MessageSquare, MessageCircle } from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface ContactSectionProps {
  onOpenServiceRequest?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenServiceRequest }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    service: 'Digital Marketing',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const services = [
    'Digital Marketing',
    'Social Media Advertising',
    'Marketing Analytics',
    'Branding & Content Creation',
    'Website & Online Promotion',
    'General Inquiry',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Farriintaada si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta sida ugu dhakhsaha badan.');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          company: '',
          service: 'Digital Marketing',
          message: '',
          honeypot: '',
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.message || 'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.');
      }
    } catch (err) {
      setStatus('error');
      setFeedbackMessage('Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-[#06080F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              NALA SOO XIRIIR
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Nala Soo Xiriir — <span className="text-gold-gradient">Horyaal Agency</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Waxaan diyaar u nahay inaan ka wada hadalno sidii ganacsigaaga loogu samayn lahaa joogitaan xooggan oo digital ah
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Contact Information & Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Agency Card */}
            <div className="card-luxury p-8 rounded-2xl border-[#D4AF37]/30 space-y-5">
              <div className="flex items-center gap-3.5">
                <CircularLogo size="md" />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    HORYAAL DIGITAL AGENCY
                  </h3>
                  <p className="text-xs text-gold-gradient font-semibold">
                    GANACSIGAAGA AYAAN KOR U QAADAYNAA 🚀
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Waxaan u heellannahay inaan si degdeg ah oo xirfadeysan kugu taageerno dhammaan adeegyada digital-ka.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                {/* Phone */}
                <a
                  href="tel:612141414"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Telefoonka Tooska ah</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#D4AF37]">
                      612141414
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:horyaalgrowth@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Email-ka Rasmiga ah</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#D4AF37] font-mono">
                      horyaalgrowth@gmail.com
                    </div>
                  </div>
                </a>

                {/* Working Hours / Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Saacadaha Shaqada</div>
                    <div className="text-sm font-semibold text-white">
                      Sabti – Khamiis: 8:00 AM – 6:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Service Request Callout */}
            {onOpenServiceRequest && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0E1528] to-[#0A0E1A] border border-[#D4AF37]/40 text-center space-y-3 shadow-xl">
                <h4 className="text-base font-bold text-white font-display">
                  Ma doonaysaa inaad adeeg toos u dalbato?
                </h4>
                <p className="text-xs text-slate-300">
                  Adeegso foomka dalabka gaarka ah si aad u hesho adeegga aad u baahan tahay.
                </p>
                <button
                  onClick={onOpenServiceRequest}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
                >
                  Furo Foomka Dalabka (Service Request)
                </button>
              </div>
            )}

          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="card-luxury p-8 sm:p-10 rounded-2xl border-[#D4AF37]/30 shadow-2xl">
              <div className="mb-6 space-y-1">
                <h3 className="text-2xl font-bold text-white font-display">
                  Noo Soo Dir Farriin (Send Message)
                </h3>
                <p className="text-xs text-slate-400">
                  Farriin kasta waxaa si toos ah loogu gudbinayaa: <strong className="text-[#D4AF37]">horyaalgrowth@gmail.com</strong>
                </p>
              </div>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{feedbackMessage}</p>
                      <p className="text-xs text-emerald-300/80 mt-0.5">Mahadsanid! Farriintaada waxaa loo diray horyaalgrowth@gmail.com.</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-emerald-800/50 flex flex-wrap gap-2 items-center">
                    <a
                      href="https://wa.me/252612141414?text=Asc%20Horyaal%20Digital%20Agency,%20waxaan%20website-ka%20idinkaga%20soo%20diray%20farriin."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase tracking-wider shadow flex items-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 text-black" />
                      <span>Farriinta WhatsApp ugu dir (612141414)</span>
                    </a>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p>{feedbackMessage}</p>
                  </div>
                  <div className="pt-2 border-t border-red-900/60 flex flex-wrap items-center gap-2">
                    <a
                      href={`https://wa.me/252612141414?text=${encodeURIComponent(
                        `Asc Horyaal Digital Agency (HD)!\nWaxaan website-ka idinkaga soo diray farriin.\nMagaca: ${formData.fullName || 'Macmiil'}\nTelefoonka: ${formData.phone || '612141414'}\nFarriinta: ${formData.message || 'Farriin la’aan'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase tracking-wider shadow flex items-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 text-black" />
                      <span>Farriinta WhatsApp Toos ugu Dir (612141414)</span>
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Hidden Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Magacaaga oo Buuxa <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Magacaaga"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Telefoon <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 612141414"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="adiga@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Shirkadda / Ganacsiga
                    </label>
                    <input
                      type="text"
                      placeholder="Magaca ganacsigaaga"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Adeegga Aad Danaynayso (Service)
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Farriintaada (Message) <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Qor farriintaada ama faahfaahinta aad doonayso inaad nala wadaagto..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>DIRAYA FARRIINTA...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
