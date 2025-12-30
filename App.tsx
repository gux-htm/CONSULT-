import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { Globe3D } from './components/Globe3D';
import { Phone, Mail, MapPin, ChevronRight, CheckCircle, GraduationCap, Globe, BookOpen, User } from 'lucide-react';
import { COUNTRIES } from './constants';
import { COMPANY_INFO, SERVICES, TEAM_MEMBERS, COUNTRY_DETAILS } from './data';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500/30">
      <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div>
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
            AZM Consultant
          </Link>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollToSection('destinations')} className="hover:text-white transition-colors">Destinations</button>
          <button onClick={() => scrollToSection('team')} className="hover:text-white transition-colors">Team</button>
        </div>
        <button onClick={() => scrollToSection('contact')} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-full transition-colors shadow-lg shadow-red-900/20">
          Contact Us
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0"></div>
        
        <div className="flex-grow z-10 w-full flex items-center justify-center mt-10 md:mt-0 opacity-60 md:opacity-100 transition-opacity duration-1000">
          <Globe3D />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-20 pointer-events-none">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-[1.1] drop-shadow-xl">
              Achieving Zest <br /> for Mastery
            </h1>
            <p className="text-slate-300 text-xl md:text-2xl font-light border-l-4 border-red-500 pl-6 bg-black/40 backdrop-blur-sm py-4 rounded-r-lg max-w-xl">
              From ambition to admission: Your journey with AZM Consultants.
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex justify-center z-20 animate-bounce">
           <span className="text-slate-500 text-sm">Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-red-500 font-semibold uppercase tracking-wider mb-2">Who We Are</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Your Pathway to Global Academic Excellence</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {COMPANY_INFO.intro}
            </p>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-red-500">
                <h4 className="font-bold text-lg mb-2 text-white">Our Vision</h4>
                <p className="text-slate-400 text-sm">{COMPANY_INFO.vision}</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-orange-500">
                <h4 className="font-bold text-lg mb-2 text-white">Our Mission</h4>
                <p className="text-slate-400 text-sm">{COMPANY_INFO.mission}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-800 h-48 rounded-2xl flex items-center justify-center border border-white/5">
                <div className="text-center p-4">
                    <span className="block text-4xl font-bold text-white mb-2">2022</span>
                    <span className="text-slate-400 text-sm">Established</span>
                </div>
             </div>
             <div className="bg-slate-800 h-48 rounded-2xl flex items-center justify-center border border-white/5 mt-8">
                <div className="text-center p-4">
                    <span className="block text-4xl font-bold text-red-500 mb-2">SECP</span>
                    <span className="text-slate-400 text-sm">Registered 2025</span>
                </div>
             </div>
             <div className="bg-slate-800 h-48 rounded-2xl flex items-center justify-center border border-white/5">
                <div className="text-center p-4">
                    <span className="block text-4xl font-bold text-orange-400 mb-2">15+</span>
                    <span className="text-slate-400 text-sm">Partner Countries</span>
                </div>
             </div>
             <div className="bg-slate-800 h-48 rounded-2xl flex items-center justify-center border border-white/5 mt-8">
                <div className="text-center p-4">
                    <span className="block text-4xl font-bold text-white mb-2">100%</span>
                    <span className="text-slate-400 text-sm">Commitment</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 md:px-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">End-to-end guidance tailored to each student’s aspirations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="bg-slate-900 border border-white/5 p-6 rounded-2xl hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors">
                  {service.icon === 'Globe' && <Globe className="text-red-500 group-hover:text-white" size={24} />}
                  {service.icon === 'Award' && <GraduationCap className="text-red-500 group-hover:text-white" size={24} />}
                  {service.icon === 'BookOpen' && <BookOpen className="text-red-500 group-hover:text-white" size={24} />}
                  {service.icon === 'FileCheck' && <CheckCircle className="text-red-500 group-hover:text-white" size={24} />}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 px-6 md:px-20 bg-slate-900/30 border-y border-white/5">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Countries We Deal</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {COUNTRIES.filter(c => c.id !== 'pk').map((country) => (
                    <Link to={`/country/${country.id}`} key={country.id} className="group bg-slate-950 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-red-500/50 transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                        <span className="font-medium text-slate-200 group-hover:text-white">{country.name}</span>
                        <ChevronRight size={16} className="text-slate-500 group-hover:text-red-500 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Leadership & Team</h2>
            <p className="text-slate-400">Led by distinguished professionals with decades of experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="bg-slate-900 rounded-2xl overflow-hidden border border-white/5">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-xl font-bold text-red-500 border-2 border-slate-700">
                      {member.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <span className="text-red-500 text-sm font-medium">{member.role}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-20 bg-gradient-to-t from-black to-slate-950">
        <div className="max-w-6xl mx-auto bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-slate-400 mb-8">
                Your journey to academic and linguistic mastery begins here. Let AZM Consultants guide you every step of the way.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-red-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white">Faisalabad Office</h3>
                    <p className="text-slate-400 text-sm">HT Center, Hockey Stadium Sussan Road,<br/>Faisalabad, Punjab, Pakistan 38001</p>
                    <a href="https://maps.app.goo.gl/v4X1bCQt9CUSYRrj6" target="_blank" rel="noopener noreferrer" className="text-red-500 text-xs mt-1 hover:underline inline-block">View on Google Maps</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-red-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white">Phone Numbers</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-slate-400 text-sm">
                      <p>+92 303 0646464</p>
                      <p>+92 318 7524442</p>
                      <p>+92 41 5484701</p>
                      <p>0322-6630053</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-red-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <p className="text-slate-400 text-sm">consultfsd@azm.edu.pk</p>
                    <p className="text-slate-400 text-sm">azmconsultantfsd@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden bg-slate-800">
               {/* Placeholder for a map or form */}
               <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-center p-6">
                  <div>
                    <Globe size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Visit us at HT Center, Hockey Stadium</p>
                    <p className="text-sm mt-2">Open Mon-Sat, 9am - 6pm</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <div className="text-center text-slate-600 text-sm mt-12">
          &copy; 2025 AZM Consultant. All rights reserved.
        </div>
      </section>
    </div>
  );
}

function CountryProfile() {
  const { id } = useParams();
  const data = COUNTRY_DETAILS[id as string];

  if (!data) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
                  <Link to="/" className="text-red-500 hover:underline">Return Home</Link>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-20 pb-20">
      <ScrollToTop />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ChevronRight className="rotate-180" size={20} /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-2">{data.title}</h1>
        <h2 className="text-xl text-red-500 font-medium mb-8">{data.subtitle}</h2>
        
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 mb-8">
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {data.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                <span className="text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-2xl p-8 text-center">
           <h3 className="text-2xl font-bold mb-4">Ready to start your journey to {data.title}?</h3>
           <p className="text-slate-400 mb-6">Contact AZM Consultants today for a personalized roadmap.</p>
           <button onClick={() => document.getElementById('footer-contact')?.scrollIntoView()} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-medium transition-colors">
             Book Consultation
           </button>
        </div>
        
        <div id="footer-contact" className="mt-12 pt-12 border-t border-slate-800 text-center">
             <p className="text-slate-500">AZM Consultants - Faisalabad</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/country/:id" element={<CountryProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}