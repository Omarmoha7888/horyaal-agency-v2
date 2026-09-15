import React from 'react';
import { MessageSquareQuote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface TestimonialsSectionProps {
  onOpenServiceRequest: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenServiceRequest,
}) => {
  return (
    <section id="testimonials-section" className="py-16 bg-[#07090E] border-t border-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              MACAAMIILKEENNA (TESTIMONIALS)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Macaamiilkeenna &amp; <span className="text-gold-gradient">Waaya-Aragnimadooda</span>
          </h2>
        </div>

        {/* Testimonial Card Structure with exact specified placeholder */}
        <div className="card-luxury p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/30 max-w-2xl mx-auto shadow-2xl relative">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto mb-5">
            <MessageSquareQuote className="w-6 h-6" />
          </div>

          {/* Specified Placeholder */}
          <blockquote className="text-lg sm:text-xl font-medium text-slate-200 italic leading-relaxed mb-6 font-display">
            "Your testimonial could appear here."
          </blockquote>

          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Ku biir liiska macaamiisha horumarka la gaaray Horyaal Digital Agency. Qeybtani waxay diyaar u tahay fikradaha iyo aragtiyaha macaamiisheenna dhabta ah.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={onOpenServiceRequest}
              className="px-5 py-2 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
            >
              Nala Shaqee Hadda
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
