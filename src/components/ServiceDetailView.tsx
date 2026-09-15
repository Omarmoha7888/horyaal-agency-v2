import React from 'react';
import { ServiceDetail } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Briefcase,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface ServiceDetailViewProps {
  service: ServiceDetail;
  onBack: () => void;
  onOpenServiceRequest: (serviceName: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  onBack,
  onOpenServiceRequest,
}) => {
  return (
    <div id="service-detail-page" className="py-10 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-[#D4AF37] transition-colors p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ku Noqo Adeegyada (Back to Services)</span>
          </button>

          <div className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
            SERVICE {service.serviceNumber} / 05
          </div>
        </div>

        {/* HERO BANNER */}
        <div className="card-luxury rounded-3xl overflow-hidden border-[#D4AF37]/30 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Horyaal Digital Service</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {service.shortDesc}
              </p>

              {/* Primary Action */}
              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <button
                  id={`detail-order-btn-${service.id}`}
                  onClick={() => onOpenServiceRequest(service.exactName)}
                  className="bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span>DALBO ADEEGGAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-xs text-slate-400">
                  ⚡ Diyaarinta dalab toos ah oo degdeg ah
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#090D18] lg:via-transparent lg:to-transparent" />
            </div>

          </div>
        </div>

        {/* DETAILED EXPLANATION */}
        <div className="card-luxury p-8 rounded-2xl space-y-4">
          <h2 className="text-2xl font-bold text-white font-display flex items-center gap-3">
            <CircularLogo size="sm" />
            <span>Faahfaahinta Adeegga (Detailed Overview)</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            {service.longDesc}
          </p>

          {/* Included Features list */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Waxyaabaha Ku Jira Adeeggan:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHAT WE PROVIDE & BENEFITS (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* WHAT WE PROVIDE */}
          <div className="card-luxury p-8 rounded-2xl space-y-5 border-l-4 border-l-[#D4AF37]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Waxaan Bixinaa (What We Provide)
              </h3>
            </div>
            <ul className="space-y-3">
              {service.whatWeProvide.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BENEFITS */}
          <div className="card-luxury p-8 rounded-2xl space-y-5 border-l-4 border-l-amber-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Faa'iidooyinka Ganacsigaaga (Benefits)
              </h3>
            </div>
            <ul className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* HOW THE SERVICE WORKS */}
        <div className="card-luxury p-8 rounded-2xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white font-display">
              Sidee Adeeggani U Shaqeeyaa?
            </h3>
            <p className="text-xs text-slate-400">
              Habka xirfadeed ee 4-ta tallaabo ah ee loo maamulo adeeggan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {service.howItWorks.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono font-bold text-xs flex items-center justify-center">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EXAMPLES / SAMPLE DELIVERABLES */}
        <div className="card-luxury p-8 rounded-2xl space-y-5">
          <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <span className="text-[#D4AF37]">✦</span>
            <span>Tusaalooyinka Shaqooyinka La Qabto (Examples)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.examples.map((ex, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <h4 className="text-sm font-bold text-[#D4AF37]">{ex.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ex.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICE SPECIFIC FAQ */}
        <div className="card-luxury p-8 rounded-2xl space-y-5">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-xl font-bold text-white font-display">
              Su'aalaha La Xiriira Adeeggan (FAQ)
            </h3>
          </div>
          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                <div className="font-semibold text-sm text-white flex items-center gap-2">
                  <span className="text-[#D4AF37]">Q:</span>
                  <span>{faq.question}</span>
                </div>
                <div className="text-xs text-slate-300 pl-4 border-l-2 border-[#D4AF37]/40 leading-relaxed pt-1">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM DEDICATED CTA BANNER */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0C1222] via-[#090D18] to-[#141A2E] border-2 border-[#D4AF37]/50 shadow-[0_10px_40px_rgba(212,175,55,0.25)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black text-white font-display">
              Diyaar ma u tahay inaad dalbato <span className="text-gold-gradient">{service.title}</span>?
            </h3>
            <p className="text-sm text-slate-300">
              Buuxi foomka dalabka si toos ah, Horyaal Digital Agency waxay kula soo xiriiri doontaa isla markiiba.
            </p>
          </div>

          <button
            id="detail-bottom-order-btn"
            onClick={() => onOpenServiceRequest(service.exactName)}
            className="bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.5)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>DALBO ADEEGGAN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
