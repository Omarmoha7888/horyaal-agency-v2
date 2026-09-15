import React from 'react';
import { CircularLogo } from './CircularLogo';
import { PageView } from '../types';
import { Phone, Mail, ArrowRight, Instagram, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenServiceRequest: (serviceName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenServiceRequest,
}) => {
  const quickLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Why Choose Us', page: 'why-choose-us' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  const services = [
    'Digital Marketing',
    'Social Media Advertising',
    'Marketing Analytics',
    'Branding & Content Creation',
    'Website & Online Promotion',
  ];

  const handleLink = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#040508] border-t border-[#D4AF37]/25 text-slate-300 pt-16 pb-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-900">
          
          {/* Col 1: Brand & Slogan (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <CircularLogo size="md" />
              <div>
                <span className="text-lg font-extrabold text-white tracking-wider font-display">
                  HORYAAL <span className="text-[#D4AF37]">DIGITAL</span> AGENCY
                </span>
                <p className="text-[11px] text-slate-400">Digital Growth &amp; Branding</p>
              </div>
            </div>

            {/* Slogan */}
            <p className="text-sm font-bold text-gold-gradient tracking-wide">
              GANACSIGAAGA AYAAN KOR U QAADAYNAA 🚀
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Waxaan ganacsiyada ka caawinnaa inay si wanaagsan uga muuqdaan internetka, macaamiil badan gaaraan, sumcad xooggan dhistaan, isla markaana ganacsigooda kobciyaan.
            </p>

            {/* Social Media Icons (Placeholders) */}
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                Baraha Bulshada (Official Channels)
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#social-fb"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#D4AF37] hover:text-[#D4AF37] text-slate-300 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#social-ig"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#D4AF37] hover:text-[#D4AF37] text-slate-300 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#social-in"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#D4AF37] hover:text-[#D4AF37] text-slate-300 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#social-x"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#D4AF37] hover:text-[#D4AF37] text-slate-300 flex items-center justify-center transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#social-yt"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#D4AF37] hover:text-[#D4AF37] text-slate-300 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleLink(link.page)}
                    className="text-xs text-slate-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2">
              {services.map((srv) => (
                <li key={srv}>
                  <button
                    onClick={() => onOpenServiceRequest(srv)}
                    className="text-xs text-slate-400 hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span>{srv}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Contact</span>
            </h4>
            
            <div className="space-y-3 text-xs">
              <a
                href="tel:612141414"
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#D4AF37] transition-colors p-2 rounded-lg bg-slate-900/60 border border-slate-800"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="font-semibold tracking-wide">612141414</span>
              </a>

              <a
                href="mailto:horyaalgrowth@gmail.com"
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#D4AF37] transition-colors p-2 rounded-lg bg-slate-900/60 border border-slate-800 truncate"
              >
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">horyaalgrowth@gmail.com</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenServiceRequest()}
                className="w-full py-2.5 rounded-lg bg-gold-gradient text-black font-extrabold text-[11px] uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
              >
                Dalbo Adeeg
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CircularLogo size="sm" />
            <span>© 2026 Horyaal Digital Agency. All Rights Reserved.</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Horyaal Digital Agency (HD) • Built for Somali &amp; Global Business Growth
          </div>
        </div>

      </div>
    </footer>
  );
};
