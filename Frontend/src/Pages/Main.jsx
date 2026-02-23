import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Handshake, FileText, Scale, BookOpen, IndianRupee } from "lucide-react";
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

// Main App Component
const App = () => {
   
const navigate = useNavigate();

    const services = [
  {
    title: 'AI-Powered Legal Insights',
    desc: 'Get instant, reliable answers to common legal questions with our advanced AI chatbot, available 24/7.',
    icon: Lightbulb,
    color: 'from-blue-500 to-indigo-600',
    delay: 0.1,
  },
  {
    title: 'Expert Lawyer Consultations',
    desc: 'Connect with verified legal professionals for personalized advice across various law domains.',
    icon: Handshake,
    color: 'from-orange-400 to-red-500',
    delay: 0.2,
  },
  {
    title: 'Document Review & Drafting',
    desc: 'Receive professional assistance with legal document review, drafting, and verification.',
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
    delay: 0.3,
  },
  {
    title: 'Legal Resources & Guides',
    desc: 'Access a comprehensive library of free legal articles, FAQs, and guides on Indian law.',
    icon: BookOpen,
    color: 'from-orange-400 to-yellow-500',
    delay: 0.5,
  },
  
];

   

    return (
        <div className="min-h-screen bg-gray-50 text-[#333] font-inter">
            
            <style>
                {`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }

                /* New animation for the background pattern */
                @keyframes patternPulse {
                    0% { opacity: 0.1; }
                    50% { opacity: 0.15; }
                    100% { opacity: 0.1; }
                }
                .animate-patternPulse {
                    animation: patternPulse 4s ease-in-out infinite;
                }
                `}
            </style>
<Navbar/>
            {/* Hero Section - Reverted to previous design */}
            <section className="relative bg-gradient-to-r from-blue-950 to-blue-900 text-white pt-30 pb-15 md:py-16 md:py-30 overflow-hidden shadow-lg rounded-b-3xl md:px-25  " id='Home'>
                <div className="absolute inset-0 z-0">
                    {/* Subtle geometric pattern with animation */}
                    <svg className="w-full h-full animate-patternPulse" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="gridPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 L 0 10" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#gridPattern)"></rect>
                    </svg>
                </div>
                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 rounded-lg animate-fadeInUp">
                            Your Legal Journey, Simplified.
                        </h1>
                        <p className="text-lg md:text-xl mb-8 opacity-90 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            Get expert legal advice and support, right when you need it. Free and paid options available.
                        </p>
                        <button
                             onClick={() => navigate('/Chat')}
                            className="bg-white text-blue-950 border-2 border-blue-950 font-bold py-3 px-8 rounded-full text-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-950 hover:text-white animate-fadeInUp"
                            style={{ animationDelay: '0.4s' }}
                        >
                            Ask a Lawyer Now <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-end animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                        <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full border-b-4 border-orange-500">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-robot text-blue-950 text-3xl mr-3"></i>
                                <h2 className="text-2xl font-semibold text-gray-800">Hello! How can I help?</h2>
                            </div>
                            <p className="text-gray-700 mb-4">
                                I'm your virtual legal assistant. Ask me anything about Indian law, or connect with a human lawyer.
                            </p>
                            <div className="bg-gray-100 p-3 rounded-lg text-gray-600 text-sm">
                                "Can police take my phone without a warrant?"
                            </div>
                            <button
                              onClick={() => navigate('/Chat')}
                                className="w-full mt-4 bg-blue-950 hover:bg-blue-900 text-white py-2 rounded-lg font-medium transition duration-200"
                            >
                                Start Chat <i className="fas fa-comments ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services & Approach Section */}
             <section className="py-20 bg-gradient-to-b from-blue-50 to-white" id='Services'>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-16">Our Services & Approach</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                   {services.map((service, index) => {
  const IconComponent = service.icon;

  return (
    <motion.div
      key={index}
      className="bg-white bg-opacity-80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border-t-4 hover:shadow-2xl transition-all duration-300 group border-transparent hover:border-blue-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: service.delay }}
      viewport={{ once: true }}
    >
      <div
        className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <IconComponent className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
      <p className="text-gray-600 text-sm">{service.desc}</p>
    </motion.div>
  );
})}

                </div>
            </div>
        </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white" id='About'>
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-16">Why Choose NyaySaathi?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Feature 1 */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Trusted Expertise</h3>
        <p className="text-gray-600">Connect with highly qualified and verified lawyers specializing in various fields of Indian law.</p>
      </div>

      {/* Feature 2 */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Affordable & Transparent</h3>
        <p className="text-gray-600">Access free resources and clear pricing for paid consultations, with no hidden costs.</p>
      </div>

      {/* Feature 3 */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Convenient & Quick</h3>
        <p className="text-gray-600">Get legal help from the comfort of your home, with fast responses and flexible scheduling.</p>
      </div>
    </div>
  </div>
</section>


            {/* Testimonials Section */}
            <section className="py-20 bg-green-50" id='Testimonials'>
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-16">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Testimonial 1 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-600 text-left">
        <p className="text-gray-700 italic mb-6">"NyaySaathi made understanding property laws so simple. The lawyer I connected with was incredibly helpful and professional."</p>
        <div className="flex items-center">
          <img src="https://placehold.co/60x60/BBDEFB/FFFFFF?text=PS" alt="User 1" className="w-12 h-12 rounded-full mr-4 border-2 border-green-600" />
          <div>
            <p className="font-semibold text-gray-800">Priya Sharma</p>
            <p className="text-gray-500 text-sm">Mumbai, Maharashtra</p>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 text-left">
        <p className="text-gray-700 italic mb-6">"I was struggling with a consumer dispute, and NyaySaathi provided clear guidance that led to a quick resolution. Highly recommended!"</p>
        <div className="flex items-center">
          <img src="https://placehold.co/60x60/BBDEFB/FFFFFF?text=RS" alt="User 2" className="w-12 h-12 rounded-full mr-4 border-2 border-orange-500" />
          <div>
            <p className="font-semibold text-gray-800">Rahul Singh</p>
            <p className="text-gray-500 text-sm">Delhi, Delhi</p>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-800 text-left" >
        <p className="text-gray-700 italic mb-6">"The chatbot gave me instant answers to my basic queries, and when I needed more, connecting with a lawyer was seamless."</p>
        <div className="flex items-center">
          <img src="https://placehold.co/60x60/BBDEFB/FFFFFF?text=AG" alt="User 3" className="w-12 h-12 rounded-full mr-4 border-2 border-blue-800" />
          <div>
            <p className="font-semibold text-gray-800">Ananya Gupta</p>
            <p className="text-gray-500 text-sm">Bengaluru, Karnataka</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-10 px-6 md:px-12 lg:px-24" id='Contact'>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* Brand & Mission */}
    <div className="md:col-span-1">
      <h2 className="text-2xl font-bold text-white mb-4">NyaySaathi</h2>
      <p className="text-sm leading-relaxed text-gray-400">
        Your trusted companion for legal guidance in India. We simplify access to legal support and help you understand your rights.
      </p>
    </div>

    {/* Explore */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Explore</h3>
      <ul className="space-y-3 text-sm">
        <li><a href="#About" className="hover:text-white transition-all duration-200">About Us</a></li>
        <li><a href="#Services" className="hover:text-white transition-all duration-200">Our Services</a></li>
        <li><a href="#Testimonials" className="hover:text-white transition-all duration-200">Testimonials</a></li>
        <li><a href="#" className="hover:text-white transition-all duration-200">FAQs</a></li>
      </ul>
    </div>

    {/* Legal Resources */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Legal Resources</h3>
      <ul className="space-y-3 text-sm">
        <li><a href="#" className="hover:text-white transition-all duration-200">Consumer Rights</a></li>
        <li><a href="#" className="hover:text-white transition-all duration-200">File a Complaint</a></li>
        <li><a href="#" className="hover:text-white transition-all duration-200">Find a Lawyer</a></li>
        <li><a href="#" className="hover:text-white transition-all duration-200">Legal Aid</a></li>
      </ul>
    </div>

    {/* Contact Us */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
      <ul className="space-y-2 text-sm">
        <li className="text-gray-400">📍 Bhopal, Madhya Pradesh, India</li>
        <li className="text-gray-400">✉️ omspatil980@gmail.com</li>
        <li className="text-gray-400">📞 +91 98*** ***10</li>
      </ul>
    </div>

  </div>

  {/* Divider */}
  <div className="border-t border-gray-700 mt-12 pt-6 text-sm">
    {/* Disclaimer */}
    <p className="text-gray-500 mb-4">
      <strong className="text-white">Disclaimer:</strong> The information provided on NyaySaathi is for general informational purposes only and does not constitute legal advice. Always consult a qualified legal professional for your situation.
    </p>
    {/* Copyright */}
    <p className="text-gray-500">&copy; 2025 NyaySaathi. All rights reserved.</p>
  </div>
</footer>


           

            
        </div>
    );
};

export default App;
