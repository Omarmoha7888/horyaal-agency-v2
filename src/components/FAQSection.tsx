import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faqData';
import { ChevronDown, Sparkles, HelpCircle, Phone, Mail } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-[#06080F] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              FAQ &amp; SUPPORT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Su'aalaha Inta Badan <span className="text-gold-gradient">La Isweydiiyo</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Halkan ka hel jawaabaha su'aalaha ugu muhiimsan ee ku saabsan adeegyada iyo habka shaqo ee Horyaal Digital Agency
          </p>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`card-luxury rounded-2xl overflow-hidden transition-all duration-300 border ${
                  isOpen ? 'border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(212,175,55,0.15)]' : 'border-slate-800'
                }`}
              >
                <button
                  id={`faq-toggle-button-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white flex items-center gap-3 pr-4 font-display">
                    <span className="text-xs font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      0{index + 1}
                    </span>
                    <span className={isOpen ? 'text-[#D4AF37]' : 'text-white'}>
                      {item.question}
                    </span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#D4AF37] text-black' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact info strip */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Ma qabtaa su'aal kale oo aan halkan ku jirin?</h4>
            <p className="text-xs text-slate-400">Kooxdeenu waxay diyaar u tahay inay si toos ah kaaga caawiso.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:612141414"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>612141414</span>
            </a>
            <a
              href="mailto:horyaalgrowth@gmail.com"
              className="px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs font-semibold flex items-center gap-1.5 border border-[#D4AF37]/30"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
