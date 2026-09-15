import React from 'react';
import { SERVICES_LIST } from '../data/servicesData';
import { ServiceDetail } from '../types';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceDetail) => void;
  onOpenServiceRequest: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenServiceRequest,
}) => {
  return (
    <section id="services-section" className="py-20 bg-[#06080F] relative">
      {/* Background Accent Lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                ADEEGYADA AAN BIXINNO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
              Adeegyadeenna <span className="text-gold-gradient">Digital-ka Ah</span>
            </h2>
            <p className="text-base text-slate-300">
              Waxaan ganacsiyada siinaa adeegyo digital ah oo dhammeystiran, laga bilaabo branding ilaa marketing iyo online growth.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => onOpenServiceRequest()}
              className="px-6 py-3 rounded-full bg-[#0D1220] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <span>Dhammaan Adeegyada</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES_LIST.map((service, index) => {
            const isFullSpanOnDesktop = index === 4; // 5th item centered nicely
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`card-luxury rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 ${
                  isFullSpanOnDesktop ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Service Image Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C16] via-transparent to-transparent" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 bg-[#090A0F]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] font-mono font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md">
                    SERVICE {service.serviceNumber}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-gold-gradient transition-colors font-display">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Features checklist (first 4 items) */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      {service.features.slice(0, 4).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                    <button
                      id={`btn-learn-more-${service.id}`}
                      onClick={() => onSelectService(service)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37]/50 text-xs font-bold text-slate-200 hover:text-white uppercase tracking-wider transition-all text-center"
                    >
                      LEARN MORE
                    </button>

                    <button
                      id={`btn-order-service-${service.id}`}
                      onClick={() => onOpenServiceRequest(service.exactName)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gold-gradient text-black text-xs font-extrabold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-[0.98] transition-all text-center"
                    >
                      DALBO ADEEGGAN
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
