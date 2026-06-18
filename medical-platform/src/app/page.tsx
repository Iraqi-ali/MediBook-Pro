'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

const features = [
  { icon: '🗺️', title: 'خريطة تفاعلية', desc: 'اعثر على أقرب العيادات والصيدليات بسهولة' },
  { icon: '👨‍⚕️', title: 'أطباء متخصصون', desc: 'احجز مع أفضل الأطباء حسب الاختصاص' },
  { icon: '💊', title: 'صرف إلكتروني', desc: 'احصل على وصفاتك الطبية إلكترونياً' },
  { icon: '📅', title: 'حجز مواعيد', desc: 'احجز موعدك في أي وقت وبسهولة' },
];

const stats = [
  { number: '+500', label: 'عيادة ومستشفى' },
  { number: '+1200', label: 'طبيب متخصص' },
  { number: '+50K', label: 'مريض سعيد' },
  { number: '24/7', label: 'دعم متواصل' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-70"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-l from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
                رعايتك الصحية
              </span>
              <br />
              <span className="text-gray-800">تبدأ من هنا</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              منصة متكاملة للحجز الطبي والاستشارات مع خرائط تفاعلية للعيادات والصيدليات. 
              احجز موعدك الآن مع أفضل الأطباء بأقرب وقت وأفضل سعر.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link 
                href="/map" 
                className="px-8 py-4 bg-gradient-to-l from-primary-600 to-primary-500 text-white font-bold text-lg rounded-2xl hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-500/30 transform hover:-translate-y-1"
              >
                🗺️ تصفح الخريطة
              </Link>
              <Link 
                href="/register" 
                className="px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-2xl border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                ✨ سجل مجاناً
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-l from-primary-600 to-accent-600 bg-clip-text text-transparent">
                لماذا تختار منصتنا؟
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">نقدم لك تجربة حجز طبي متكاملة وسهلة الاستخدام</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-200"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">جاهز لبدء رحلتك الصحية؟</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">سجل الآن واحصل على وصول مجاني لجميع خدماتنا</p>
          <Link 
            href="/register" 
            className="inline-block px-10 py-5 bg-white text-primary-600 font-bold text-xl rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
          >
            🚀 ابدأ مجاناً
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold">منصتي الطبية</h3>
              </div>
              <p className="text-gray-400 text-sm">رعايتك الصحية هي أولويتنا</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/map" className="hover:text-white transition-colors">الخريطة</Link></li>
                <li><Link href="/doctors" className="hover:text-white transition-colors">الأطباء</Link></li>
                <li><Link href="/clinics" className="hover:text-white transition-colors">العيادات</Link></li>
                <li><Link href="/pharmacies" className="hover:text-white transition-colors">الصيدليات</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">📘</a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">🐦</a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">📷</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2024 منصتي الطبية. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
