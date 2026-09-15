import React, { useState, useEffect } from 'react';
import { ExactServiceName, ServiceRequestPayload } from '../types';
import { X, CheckCircle2, AlertCircle, Send, Loader2, Phone, Mail, Building, Sparkles, MessageCircle } from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

const EXACT_SERVICES: ExactServiceName[] = [
  'Digital Marketing',
  'Social Media Advertising',
  'Marketing Analytics',
  'Branding & Content Creation',
  'Website & Online Promotion',
];

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  preSelectedService,
}) => {
  const [formData, setFormData] = useState<ServiceRequestPayload>({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    service: 'Digital Marketing',
    projectDetails: '',
    preferredContact: 'Phone',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submissionReceipt, setSubmissionReceipt] = useState<{ id: string; time: string; service: string } | null>(null);

  // Update service when preSelectedService prop changes or modal opens
  useEffect(() => {
    if (preSelectedService && EXACT_SERVICES.includes(preSelectedService as ExactServiceName)) {
      setFormData((prev) => ({ ...prev, service: preSelectedService as ExactServiceName }));
    }
    if (isOpen) {
      setStatus('idle');
      setFeedbackMessage('');
      setValidationErrors({});
    }
  }, [preSelectedService, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Fadlan qor magacaaga oo buuxa (Full Name is required).';
    }

    const cleanedPhone = formData.phone.replace(/[^\d+]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 7) {
      errors.phone = 'Fadlan geli lambar telefoon oo sax ah (e.g. 612141414).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Fadlan geli cinwaan email oo sax ah.';
    }

    if (!formData.service) {
      errors.service = 'Fadlan dooro adeegga aad u baahan tahay.';
    }

    if (!formData.projectDetails.trim() || formData.projectDetails.trim().length < 5) {
      errors.projectDetails = 'Fadlan faahfaahi waxa aad u baahan tahay (ugu yaraan 5 xaraf).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus('idle');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.warn('Response was not JSON:', parseErr);
      }

      if (response.ok && data?.success) {
        setStatus('success');
        setFeedbackMessage(
          data.message ||
            'Dalabkaaga si guul leh ayaa loo diray. Horyaal Digital Agency ayaa kula soo xiriiri doonta sida ugu dhakhsaha badan.'
        );
        setSubmissionReceipt({
          id: data.submissionId || `HD-${Date.now().toString(36).toUpperCase()}`,
          time: data.submittedAt || new Date().toLocaleString(),
          service: formData.service,
        });
      } else {
        setStatus('error');
        setFeedbackMessage(
          data?.message ||
            'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.'
        );
      }
    } catch (err) {
      setStatus('error');
      setFeedbackMessage(
        'Dalabka lama diri karin. Fadlan mar kale isku day ama nala soo xiriir telefoonka 612141414.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      companyName: '',
      service: 'Digital Marketing',
      projectDetails: '',
      preferredContact: 'Phone',
      honeypot: '',
    });
    setStatus('idle');
    setValidationErrors({});
    setSubmissionReceipt(null);
  };

  return (
    <div
      id="service-request-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="service-request-modal-content"
        className="relative w-full max-w-2xl bg-[#090C14] border-2 border-[#D4AF37]/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden my-6 text-slate-100 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gold-gradient" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <CircularLogo size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                  HORYAAL DIGITAL AGENCY
                </span>
                <span className="text-[10px] bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full font-semibold">
                  OFFICIAL PORTAL
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                Dalbo Adeeg Gaar Ah
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Buuxi foomka hoose si dalabkaagu toos ugu gaaro kooxda Horyaal Digital Agency.
              </p>
            </div>
          </div>

          <button
            id="close-service-request-modal"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-full transition-colors border border-transparent hover:border-slate-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {status === 'success' ? (
            /* SUCCESS STATE */
            <div id="service-request-success-view" className="py-6 px-4 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Dalabkaaga Waa La Guddoomay!</h3>
                <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 p-3.5 rounded-xl max-w-lg mx-auto leading-relaxed">
                  {feedbackMessage}
                </p>
              </div>

              {submissionReceipt && (
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-left max-w-md mx-auto space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Tixraaca Dalabka (Receipt ID):</span>
                    <span className="font-mono font-bold text-[#D4AF37]">{submissionReceipt.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Adeegga La Dalbaday:</span>
                    <span className="font-semibold text-white">{submissionReceipt.service}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Toos Loo Diray:</span>
                    <span className="font-mono text-slate-300">horyaalgrowth@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Waqtiga:</span>
                    <span className="text-slate-300">{submissionReceipt.time}</span>
                  </div>
                </div>
              )}

              <div className="pt-3 flex flex-wrap gap-3 justify-center">
                <a
                  href={`https://wa.me/252612141414?text=${encodeURIComponent(
                    `Asc Horyaal Digital Agency (HD)!\nWaxaan website-ka idinkaga soo diray dalab cusub oo ku saabsan: ${submissionReceipt?.service || formData.service}.\nMagaca: ${formData.fullName}\nTelefoonka: ${formData.phone}\nIimeylka: ${formData.email}\nTixraaca: ${submissionReceipt?.id || ''}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>Ku Xaqiiji WhatsApp (612141414)</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Dalbo Adeeg Kale
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-gold-gradient text-black text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
                >
                  Xir Daaqadda
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form id="service-request-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Error banner if submission failed */}
              {status === 'error' && (
                <div
                  id="service-request-error-alert"
                  className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-sm space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{feedbackMessage}</p>
                      <p className="text-xs text-red-300/80 mt-1">
                        Wac telefoonka tooska ah: <a href="tel:612141414" className="underline font-bold text-white">612141414</a> ama iimeyl u dir <span className="font-bold text-white">horyaalgrowth@gmail.com</span>
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-red-900/60 flex flex-wrap items-center gap-2">
                    <a
                      href={`https://wa.me/252612141414?text=${encodeURIComponent(
                        `Asc Horyaal Digital Agency (HD)!\nWaxaan rabaa adeegga: ${formData.service}\nMagacaaga: ${formData.fullName || 'Macmiil'}\nTelefoonka: ${formData.phone || '612141414'}\nGanacsiga: ${formData.companyName || 'Ma jiro'}\nFaahfaahinta: ${formData.projectDetails || 'Faahfaahin la’aan'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase tracking-wider shadow flex items-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 text-black" />
                      <span>Ku Xiriir WhatsApp Toos Ah (612141414)</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Anti-spam honeypot (hidden) */}
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
                {/* Full Name */}
                <div>
                  <label htmlFor="service-req-fullname" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Magacaaga oo Buuxa <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="service-req-fullname"
                    type="text"
                    required
                    placeholder="Tusaale: Axmed Cali"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      validationErrors.fullName
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-slate-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                    }`}
                  />
                  {validationErrors.fullName && (
                    <p className="text-[11px] text-red-400 mt-1">{validationErrors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="service-req-phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Lambarka Telefoonka <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="service-req-phone"
                    type="tel"
                    required
                    placeholder="Tusaale: 612141414"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      validationErrors.phone
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-slate-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                    }`}
                  />
                  {validationErrors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="service-req-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="service-req-email"
                    type="email"
                    required
                    placeholder="adiga@tusaale.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      validationErrors.email
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-slate-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-[11px] text-red-400 mt-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Business / Company Name */}
                <div>
                  <label htmlFor="service-req-company" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Magaca Ganacsiga / Shirkadda
                  </label>
                  <input
                    id="service-req-company"
                    type="text"
                    placeholder="Tusaale: Som Retail Group"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Service Selection Dropdown */}
              <div>
                <label htmlFor="service-req-dropdown" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Dooro Adeegga (Select Service) <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="service-req-dropdown"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value as ExactServiceName })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-[#D4AF37]/50 text-sm text-white font-medium focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none cursor-pointer"
                  >
                    {EXACT_SERVICES.map((srv) => (
                      <option key={srv} value={srv} className="bg-[#0B0F19] text-white py-1">
                        {srv}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#D4AF37]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Sida Aad Jeceshahay In Lagula Soo Xiriiro
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Phone', 'WhatsApp', 'Email'] as const).map((method) => {
                    const isSelected = formData.preferredContact === method;
                    return (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                          isSelected
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                            : 'bg-slate-900 border-slate-700/60 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {method}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="service-req-details" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Faahfaahinta Mashruucaaga (Project Details) <span className="text-[#D4AF37]">*</span>
                </label>
                <textarea
                  id="service-req-details"
                  rows={3}
                  required
                  placeholder="Noo sheeg ganacsigaaga, waxa aad u baahan tahay, iyo hadafka aad doonayso inaad gaarto..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none ${
                    validationErrors.projectDetails
                      ? 'border-red-500 ring-1 ring-red-500'
                      : 'border-slate-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                  }`}
                />
                {validationErrors.projectDetails && (
                  <p className="text-[11px] text-red-400 mt-1">{validationErrors.projectDetails}</p>
                )}
              </div>

              {/* Notice & Security */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 flex items-center justify-between">
                <span>
                  📩 Toos loogu dirayaa: <strong className="text-slate-200">horyaalgrowth@gmail.com</strong>
                </span>
                <span className="text-amber-300/80 font-medium">Ammaan &amp; Xog Dhowr</span>
              </div>

              {/* Submit Button */}
              <button
                id="submit-service-request-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.65)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>DALABKA WAA LA DIRAYAA...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>DALABKA DIR (SUBMIT SERVICE REQUEST)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
