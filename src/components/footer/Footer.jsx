export default function Footer() {
    return (
      <footer className="bg-[#B388FF] text-white py-8 md:py-12">
        <div className="container w-[95%] md:w-4/5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start">
            {/* Logo and Title Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left border-b md:border-b-0 pb-6 md:pb-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NobjOh2SogA4yFJAIPMeRLfakgHd92.png"
                alt="Organization Logo"
                className="w-20 h-20 md:w-16 md:h-16 object-contain hover:scale-105 transition-transform duration-300"
              />
              <div className="text-sm space-y-1">
                <p className="font-medium text-base mb-2">O'ZBEKISTON RESPUBLIKASI FAVQULODDA</p>
                <p className="text-gray-100">VAZIYATLAR VAZIRLIGI AKADEMIYASI HUZURIDAGI</p>
                <p className="text-gray-100">FUQARO MUHOFAZASI INSTITUTI</p>
                <p className="text-gray-100">AHOLINI ZILZILAGA TAYYORLASH</p>
                <p className="text-gray-100">MILLIY TA'LIM PLATFORMASI</p>
              </div>
            </div>
  
            {/* Address Section */}
            <div className="text-center text-sm border-b md:border-b-0 pb-6 md:pb-0">
              <div className="mb-4 transform hover:-translate-y-1 transition-transform duration-300">
                <a href="/" className="hover:underline inline-flex items-center gap-2 text-base font-medium">
                  🏠 <span>Manzil</span>
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-gray-100">111221, Toshkent viloyati, Qibray tumani,</p>
                <p className="text-gray-100">Geofizika qo'rg'oni, Anaybuloq ko'chasi 3-uy</p>
                <p className="mt-4">
                  <a
                    href="tel:+998712305023"
                    className="inline-flex items-center gap-2 hover:underline transition-colors duration-300"
                  >
                    📞 <span>+998 71 230 50 23</span>
                  </a>
                </p>
              </div>
            </div>
  
            {/* Contact Section */}
            <div className="text-sm text-center md:text-right">
              <div className="mb-6 transform hover:-translate-y-1 transition-transform duration-300">
                <a
                  href="mailto:igz_mchs@mail.ru"
                  className="hover:underline inline-flex items-center justify-center md:justify-end gap-2 text-base font-medium w-full"
                >
                  📧 <span>E-Manzil: igz_mchs@mail.ru</span>
                </a>
              </div>
              <div className="space-y-2">
                <a href="mailto:fvvfmi@gmail.uz" className="block hover:underline transition-colors duration-300">
                  fvvfmi@gmail.uz
                </a>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center justify-center md:justify-end gap-2">
                    <span>Sayt IGZ:</span>
                    <a href="https://fvvfmi.uz" className="hover:underline transition-colors duration-300">
                      fvvfmi.uz
                    </a>
                  </p>
                  <p className="flex items-center justify-center md:justify-end gap-2">
                    <span>Sayt FVV:</span>
                    <a href="https://fvv.uz" className="hover:underline transition-colors duration-300">
                      fvv.uz
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="text-center mt-8 pt-6 text-sm border-t border-white/20">
            <p className="text-gray-100">© 2022 InTech NamMQI</p>
          </div>
        </div>
      </footer>
    )
  }
  
  