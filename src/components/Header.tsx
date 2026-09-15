import React, { useState, useEffect } from 'react';
import { CircularLogo } from './CircularLogo';
import { PageView } from '../types';
import { Phone, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenServiceRequest: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenServiceRequest,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Why Choose Us', page: 'why-choose-us' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090E]/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
          : 'bg-[#07090E]/80 backdrop-blur-sm border-b border-[#D4AF37]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Circular HD Logo + Brand Name outside */}
          <button
            id="brand-logo-button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
            aria-label="Horyaal Digital Agency Home"
          >
            <CircularLogo size="md" withOuterGlow={isScrolled} />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-wider text-white group-hover:text-gold-gradient transition-colors uppercase font-display">
                HORYAAL <span className="text-[#D4AF37]">DIGITAL</span> AGENCY
              </span>
              <span className="text-[11px] font-medium tracking-wide text-amber-200/70 hidden sm:block">
                GANACSIGAAGA AYAAN KOR U QAADAYNAA 🚀
              </span>
            </div>
          </button>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Phone + GET STARTED Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              id="header-phone-link"
              href="tel:612141414"
              className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-[#D4AF37] transition-colors py-2 px-3 rounded-lg hover:bg-slate-900/50 border border-transparent hover:border-[#D4AF37]/20"
              title="Wac Horyaal Digital Agency"
            >
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Phone className="w-4 h-4" />
              </div>
              <span className="tracking-wide">612141414</span>
            </a>

            <button
              id="header-get-started-button"
              onClick={() => onOpenServiceRequest()}
              className="bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.55)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:612141414"
              className="p-2 text-[#D4AF37] bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 md:hidden"
              aria-label="Call 612141414"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-700/50 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#07090E] border-b border-[#D4AF37]/30 shadow-2xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`mobile-nav-link-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-l-4 border-[#D4AF37]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="tel:612141414"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/80 border border-[#D4AF37]/30 text-slate-100 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Tel: 612141414</span>
            </a>

            <button
              id="mobile-get-started-button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenServiceRequest();
              }}
              className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
