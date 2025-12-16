"use client"
import React from 'react';
import { ShoppingCart, ShoppingBag, User, CreditCard, Store, FileText, MessageCircle, ChevronRight, Package, Wallet, UserCircle, Building2, HelpCircle, Sparkles } from 'lucide-react';


export default function HelpCenter() {
  const whatsappNumber = '919569125048';
  
  const handleTopicClick = (topic) => {
    const message = encodeURIComponent(`Hi, I need help with ${topic}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleChatClick = () => {
    const message = encodeURIComponent('Hi, I need assistance');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const topics = [
    { 
      icon: Package, 
      label: 'Order Related', 
      color: 'bg-gradient-to-br from-purple-100 to-purple-50',
      iconColor: 'text-purple-600',
      shadowColor: 'group-hover:shadow-purple-200'
    },
    { 
      icon: ShoppingBag, 
      label: 'Shopping', 
      color: 'bg-gradient-to-br from-pink-100 to-pink-50',
      iconColor: 'text-pink-600',
      shadowColor: 'group-hover:shadow-pink-200'
    },
    { 
      icon: UserCircle, 
      label: 'StylishHim Account', 
      color: 'bg-gradient-to-br from-blue-100 to-blue-50',
      iconColor: 'text-blue-600',
      shadowColor: 'group-hover:shadow-blue-200'
    },
    { 
      icon: Wallet, 
      label: 'Payments', 
      color: 'bg-gradient-to-br from-green-100 to-green-50',
      iconColor: 'text-green-600',
      shadowColor: 'group-hover:shadow-green-200'
    },
    { 
      icon: Building2, 
      label: 'Sell On StylishHim', 
      color: 'bg-gradient-to-br from-amber-100 to-amber-50',
      iconColor: 'text-amber-600',
      shadowColor: 'group-hover:shadow-amber-200'
    },
    { 
      icon: HelpCircle, 
      label: 'Others', 
      color: 'bg-gradient-to-br from-indigo-100 to-indigo-50',
      iconColor: 'text-indigo-600',
      shadowColor: 'group-hover:shadow-indigo-200'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Sign In Card */}
        <div className="bg-white rounded-2xl   border border-gray-100 p-6 mb-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          <div style={{background: `linear-gradient(to bottom right, ${"var(--theme-color)"}15, transparent)`}} className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div style={{background: `linear-gradient(to bottom right, ${"var(--theme-color)"}, #8d7662)`}} className="w-12 h-12 rounded-xl flex items-center justify-center  ">
                  <User className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                  Getting help is easy
                  <Sparkles style={{color: "var(--theme-color)"}} className="w-4 h-4" />
                </h3>
                <p className="text-sm text-gray-600">
                  Sign in to get help with recent orders
                </p>
              </div>
            </div>
            <button 
              style={{background: `linear-gradient(to right, ${"var(--theme-color)"}, #8d7662)`}}
              className="hover:from-[#9d8672] hover:to-[#7d6652] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 whitespace-nowrap w-full sm:w-auto"
            >
              Sign in
            </button>
          </div>
        </div>

        {/* Browse Topics Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Browse Topics
            <div style={{background: `linear-gradient(to right, ${"var(--theme-color)"}, transparent)`}} className="h-1 w-12 rounded-full"></div>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic.label)}
                style={{borderColor: "var(--theme-color)"}}
                className={`bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group ${topic.shadowColor}`}
              >
                <div className={`${topic.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 `}>
                  <topic.icon className={`w-8 h-8 ${topic.iconColor}`} strokeWidth={2} />
                </div>
                <h3 style={{color: 'inherit'}} className="text-sm font-bold text-gray-900 group-hover:transition-colors duration-300 leading-tight" onMouseEnter={(e) => e.target.style.color = "var(--theme-color)"} onMouseLeave={(e) => e.target.style.color = '#111827'}>
                  {topic.label}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* Need More Help Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Need more help?
            <div style={{background: `linear-gradient(to right, ${"var(--theme-color)"}, transparent)`}} className="h-1 w-12 rounded-full"></div>
          </h2>
          <button
            onClick={handleChatClick}
            style={{borderColor: "var(--theme-color)"}}
            className="w-full bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <div style={{background: `linear-gradient(to right, ${"var(--theme-color)"}, #8d7662, ${"var(--theme-color)"})`}} className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div style={{background: `linear-gradient(to bottom right, ${"var(--theme-color)"}, #8d7662)`}} className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg relative">
                  <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="text-left">
                  <h3 style={{color: 'inherit'}} className="text-lg font-bold text-gray-900 mb-1 transition-colors duration-300" onMouseEnter={(e) => e.target.style.color = "var(--theme-color)"} onMouseLeave={(e) => e.target.style.color = '#111827'}>
                    Chat with us
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    Get instant query assistance
                  </p>
                </div>
              </div>
              <ChevronRight style={{color: 'inherit'}} className="w-7 h-7 text-gray-400 group-hover:translate-x-2 transition-all duration-300" strokeWidth={2.5} onMouseEnter={(e) => e.target.style.color = "var(--theme-color)"} onMouseLeave={(e) => e.target.style.color = '#9ca3af'} />
            </div>
          </button>
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 font-medium">
            We are here to help you 24/7. Click any topic or chat with us directly on WhatsApp.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Online now
          </div>
        </div>
      </div>
    </div>
  );
}