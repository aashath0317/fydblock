import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="pt-32 pb-20 relative z-10 animate-in fade-in duration-500">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-gray-400 text-lg">Any question or remarks? Just write us a message!</p>
        </div>

        {/* Contact Card */}
        <div className="bg-[#1f2937]/50 backdrop-blur-md border border-white/10 rounded-2xl p-3 max-w-6xl mx-auto shadow-2xl flex flex-col lg:flex-row gap-4 overflow-hidden">
          
          {/* Left Side - Info */}
          <div className="bg-[#050B0D] rounded-xl p-8 lg:p-12 lg:w-1/3 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Decor Circle */}
            <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-[#00FF9D]/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-[20px] right-[20px] w-24 h-24 bg-[#00FF9D] rounded-full opacity-80"></div>
            <div className="absolute bottom-[60px] right-[80px] w-12 h-12 bg-[#333] rounded-full opacity-50"></div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Contact Information</h3>
              <p className="text-gray-400 mb-12">Say something to start a live chat!</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4 text-gray-300">
                  <Phone size={20} className="text-[#00FF9D]" />
                  <span>+1 012 3456 789</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <Mail size={20} className="text-[#00FF9D]" />
                  <span>demo@gmail.com</span>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <MapPin size={20} className="text-[#00FF9D] mt-1" />
                  <span className="max-w-[200px]">132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
                </div>
              </div>
            </div>

            {/* Social Icons Mini */}
            <div className="flex gap-4 mt-12 relative z-10">
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00FF9D] hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white"><span className="text-xs">Tw</span></div>
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00FF9D] hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white"><span className="text-xs">Ig</span></div>
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00FF9D] hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white"><span className="text-xs">Di</span></div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-2/3 p-8 lg:p-12">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-600 focus:border-[#00FF9D] py-2 outline-none transition-colors text-white" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-600 focus:border-[#00FF9D] py-2 outline-none transition-colors text-white" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-600 focus:border-[#00FF9D] py-2 outline-none transition-colors text-white" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Phone Number</label>
                  <input type="tel" className="w-full bg-transparent border-b border-gray-600 focus:border-[#00FF9D] py-2 outline-none transition-colors text-white" placeholder="+1 012 3456 789" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-white">Select Subject?</label>
                <div className="flex flex-wrap gap-6">
                  {['General Inquiry', 'Technical Support', 'Billing & Payments', 'Bot Setup & Config'].map((opt, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="subject" className="peer sr-only" />
                      <div className="w-4 h-4 rounded-full border border-gray-500 peer-checked:bg-[#00FF9D] peer-checked:border-[#00FF9D] relative">
                         <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-black opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-medium">Message</label>
                <textarea rows="1" className="w-full bg-transparent border-b border-gray-600 focus:border-[#00FF9D] py-2 outline-none transition-colors resize-none text-white" placeholder="Write your message.."></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button type="button" className="bg-[#050B0D] hover:bg-black text-white px-8 py-3 rounded-lg font-bold border border-[#00FF9D]/30 hover:border-[#00FF9D] transition-all shadow-[0_0_15px_rgba(0,255,157,0.1)]">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Join Community Banner */}
        <div className="mt-20 max-w-5xl mx-auto bg-gradient-to-r from-[#00FF9D]/20 to-[#00A3FF]/20 border border-[#00FF9D]/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
             <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Join 15,000+ Active FydBlock Members!</h3>
             <p className="text-gray-300 max-w-xl">Become part of a thriving community of traders. Share strategies, get expert insights, and find support.</p>
           </div>
           <button className="relative z-10 bg-transparent border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-lg font-bold transition-all">
             Join us
           </button>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 max-w-5xl mx-auto h-[300px] rounded-3xl relative overflow-hidden flex items-center justify-center text-center">
           <div className="absolute inset-0 bg-gradient-to-b from-[#00FF9D]/10 to-transparent"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00FF9D_0%,transparent_70%)] opacity-20"></div>
           
           <div className="relative z-10 px-6 w-full max-w-2xl">
             <h2 className="text-3xl font-bold mb-4 text-white">Sign up to our newsletter</h2>
             <p className="text-gray-300 mb-8">Receive latest news, updates, and trading tips every week.</p>
             
             <div className="relative">
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="w-full bg-white text-black px-6 py-4 rounded-full outline-none pr-16"
               />
               <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#00FF9D] hover:text-black transition-colors">
                 <Send size={18} />
               </button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
