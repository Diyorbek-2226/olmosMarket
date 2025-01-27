import { useState, useEffect } from "react"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    talim: false,
    axborot: false,
  })
  const [bruto, setBruto] = useState(0)
  const [isLooping, setIsLooping] = useState(false)

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const handleRegistrationClick = () => {
    setIsLooping(true)
    setBruto(0)
  }

  useEffect(() => {
    if (isLooping && bruto < bruto+1) {
      const timer = setTimeout(() => {
        setBruto((prevBruto) => prevBruto + 1)
      }, 100)
      return () => clearTimeout(timer)
    } else if (bruto === Infinity) {
      setIsLooping(false)
    }
  }, [isLooping, bruto])

  return (
    <header className="bg-[#8860D0] p-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between pt-4 pb-4 px-4 text-white rounded-lg">
        {/* Logo va Mobil Menu Toggle */}
        <div className="flex justify-between w-full md:w-auto items-center mb-4 md:mb-0">
          <span className="text-xl font-bold">Logo</span>
          <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop va Mobil Menyu */}
        {(isMenuOpen || window.innerWidth >= 768) && (
          <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row items-center gap-6">
              <li className="hover:text-gray-200 transition-colors cursor-pointer">Bosh sahifa</li>
              <li className="relative group">
                <button
                  onClick={() => toggleDropdown("talim")}
                  className="flex items-center hover:text-gray-200 transition-colors"
                >
                  Ta'lim olish tartibi
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen.talim && (
                  <ul className="absolute left-0 mt-2 bg-white text-[#8860D0] rounded-md shadow-lg w-56">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Rahbarlar tarkibi va mas'ul hodimlar</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Mustaqil ta'lim oluvchilar</li>
                  </ul>
                )}
              </li>
              <li className="hover:text-gray-200 transition-colors cursor-pointer">Kurslar</li>
              <li className="relative group">
                <button
                  onClick={() => toggleDropdown("axborot")}
                  className="flex items-center hover:text-gray-200 transition-colors"
                >
                  Axborot resurslari
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen.axborot && (
                  <ul className="absolute left-0 mt-2 bg-white text-[#8860D0] rounded-md shadow-lg w-56">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Elektron darsliklar</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Maqolalar va tadqiqotlar</li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        )}

        {/* Login va Registratsiya */}
        {(isMenuOpen || window.innerWidth >= 768) && (
          <ul className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
            <li>
              <button
                onClick={handleRegistrationClick}
                className="bg-white text-[#8860D0] px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isLooping}
              >
                Registratsiya: {bruto}
              </button>
            </li>
            <li>
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#8860D0] transition-colors">
                Login
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default Navbar

