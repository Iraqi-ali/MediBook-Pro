'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300 transform group-hover:scale-105">
              <span className="text-2xl md:text-3xl">🏥</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-l from-primary-600 to-accent-600 bg-clip-text text-transparent">
                منصتي الطبية
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">رعايتك الصحية تبدأ من هنا</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              الرئيسية
              <span className="absolute bottom-[-4px] right-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              الخريطة
              <span className="absolute bottom-[-4px] right-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/doctors" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              الأطباء
              <span className="absolute bottom-[-4px] right-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/clinics" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              العيادات
              <span className="absolute bottom-[-4px] right-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/pharmacies" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
              الصيدليات
              <span className="absolute bottom-[-4px] right-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="px-4 py-2 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-200">
                  لوحة التحكم
                </Link>
                <button className="px-5 py-2.5 bg-gradient-to-l from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  تسجيل خروج
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-200 border-2 border-primary-200 hover:border-primary-300">
                  دخول
                </Link>
                <Link href="/register" className="px-5 py-2.5 bg-gradient-to-l from-primary-600 to-primary-500 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-0.5">
                  تسجيل جديد
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col gap-3">
              <Link href="/" className="px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium">الرئيسية</Link>
              <Link href="/map" className="px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium">الخريطة</Link>
              <Link href="/doctors" className="px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium">الأطباء</Link>
              <Link href="/clinics" className="px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium">العيادات</Link>
              <Link href="/pharmacies" className="px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium">الصيدليات</Link>
              
              <div className="border-t border-gray-200 my-2"></div>
              
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="mx-4 px-4 py-3 text-primary-600 font-semibold">لوحة التحكم</Link>
                  <button className="mx-4 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg">تسجيل خروج</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="mx-4 px-4 py-3 text-primary-600 font-semibold border-2 border-primary-200 rounded-lg text-center">دخول</Link>
                  <Link href="/register" className="mx-4 px-4 py-3 bg-gradient-to-l from-primary-600 to-primary-500 text-white font-semibold rounded-lg text-center">تسجيل جديد</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
