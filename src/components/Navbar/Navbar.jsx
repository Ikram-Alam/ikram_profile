// import { useState, useEffect } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import { FaGithub, FaLinkedin } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Detect scroll and change navbar background
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Smooth scroll function
//   const handleMenuItemClick = (sectionId) => {
//     setActiveSection(sectionId);
//     setIsOpen(false);

//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const menuItems = [
//     { id: "about", label: "About" },
//     { id: "skills", label: "Skills" },
//     { id: "experience", label: "Experience" },
//     { id: "work", label: "Projects" },
//     { id: "education", label: "Education" },
//     { id: "certifications", label: "certifications" },

//   ];

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${
//         isScrolled ? "bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md" : "bg-transparent"
//       }`}
//     >
//       <div className="text-white py-5 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-lg font-semibold cursor-pointer">
//           <span className="text-[#8245ec]">&lt;</span>
//           <span className="text-white">Ikram</span>
//           <span className="text-[#8245ec]">/</span>
//           <span className="text-white">Alam</span>
//           <span className="text-[#8245ec]">&gt;</span>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-8 text-gray-300">
//           {menuItems.map((item) => (
//             <li
//               key={item.id}
//               className={`cursor-pointer hover:text-[#8245ec] ${
//                 activeSection === item.id ? "text-[#8245ec]" : ""
//               }`}
//             >
//               <button onClick={() => handleMenuItemClick(item.id)}>
//                 {item.label}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Social Icons */}
//         <div className="hidden md:flex space-x-4">
//           <a
//             href="https://github.com/Ikram-Alam"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-300 hover:text-[#8245ec]"
//           >
//             <FaGithub size={24} />
//           </a>
//           <a
//             href="www.linkedin.com/in/muhammad-ikram-alam-4157b7243"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-300 hover:text-[#8245ec]"
//           >
//             <FaLinkedin size={24} />
//           </a>
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           {isOpen ? (
//             <FiX
//               className="text-3xl text-[#8245ec] cursor-pointer"
//               onClick={() => setIsOpen(false)}
//             />
//           ) : (
//             <FiMenu
//               className="text-3xl text-[#8245ec] cursor-pointer"
//               onClick={() => setIsOpen(true)}
//             />
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Items */}
//       {isOpen && (
//         <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden">
//           <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300">
//             {menuItems.map((item) => (
//               <li
//                 key={item.id}
//                 className={`cursor-pointer hover:text-white ${
//                   activeSection === item.id ? "text-[#8245ec]" : ""
//                 }`}
//               >
//                 <button onClick={() => handleMenuItemClick(item.id)}>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//             <div className="flex space-x-4">
//               <a
//                 href="https://github.com/codingmastr"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-300 hover:text-white"
//               >
//                 <FaGithub size={24} />
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/tarun-kaushik-553b441a4"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-300 hover:text-white"
//               >
//                 <FaLinkedin size={24} />
//               </a>
//             </div>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Enhanced scroll detection with direction and visibility
  useEffect(() => {
    let ticking = false;
    let lastY = lastScrollY; // Local reference to avoid dependency

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Background blur effect
          setIsScrolled(currentScrollY > 50);
          
          // Scroll direction detection with improved logic
          if (Math.abs(currentScrollY - lastY) > 5) { // Only change direction after 5px scroll
            if (currentScrollY > lastY && currentScrollY > 150) {
              setScrollDirection("down");
              setIsVisible(false);
            } else if (currentScrollY < lastY) {
              setScrollDirection("up");
              setIsVisible(true);
            }
            
            // Always show navbar at top of page
            if (currentScrollY < 100) {
              setIsVisible(true);
            }
            
            lastY = currentScrollY;
            setLastScrollY(currentScrollY);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Remove lastScrollY from dependencies

  // Intersection Observer for active section detection
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: "-20% 0px -70% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Smooth scroll with easing
  const handleMenuItemClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for navbar height
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });

      // Alternative smooth scroll with custom easing (uncomment if needed)
      // smoothScrollTo(offsetTop, 1000);
    }
  }, []);

  // Custom smooth scroll with easing (rain-like effect)
  const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed / duration);
      
      window.scrollTo(0, startPosition + distance * run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 px-[7vw] md:px-[7vw] lg:px-[20vw] transition-all duration-500 ease-out transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? "bg-[#050414]/80 backdrop-blur-xl shadow-lg shadow-purple-500/10 border-b border-white/5" 
            : "bg-transparent"
        }`}
      >
        <div className="text-white py-5 flex justify-between items-center">
          {/* Logo with hover animation */}
          <div className="text-lg font-semibold cursor-pointer group transition-all duration-300 hover:scale-105">
            <span className="text-[#8245ec] group-hover:text-purple-400 transition-colors duration-300">&lt;</span>
            <span className="text-white group-hover:text-gray-100 transition-colors duration-300">Ikram</span>
            <span className="text-[#8245ec] group-hover:text-purple-400 transition-colors duration-300">/</span>
            <span className="text-white group-hover:text-gray-100 transition-colors duration-300">Alam</span>
            <span className="text-[#8245ec] group-hover:text-purple-400 transition-colors duration-300">&gt;</span>
            
          </div>

          {/* Desktop Menu with staggered animations */}
          <ul className="hidden md:flex space-x-8 text-gray-300">
            {menuItems.map((item, index) => (
              <li
                key={item.id}
                className="relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`relative z-10 transition-all duration-300 hover:text-white hover:scale-105 ${
                    activeSection === item.id ? "text-[#8245ec] font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
                {/* Animated underline */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#8245ec] to-purple-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-[#8245ec]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </li>
            ))}
          </ul>

          {/* Social Icons with hover animations */}
          <div className="hidden md:flex space-x-4">
            <a
              href="https://github.com/Ikram-Alam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110 hover:rotate-12 p-2 rounded-full hover:bg-white/5"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-ikram-alam-4157b7243"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110 hover:rotate-12 p-2 rounded-full hover:bg-white/5"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Mobile Menu Icon with rotation animation */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                {isOpen ? (
                  <FiX className="text-3xl text-[#8245ec]" />
                ) : (
                  <FiMenu className="text-3xl text-[#8245ec]" />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu with slide-down animation */}
      <div
        className={`fixed top-20 left-0 right-0 z-40 md:hidden mobile-menu-container transition-all duration-500 ease-out ${
          isOpen 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-[7vw] bg-[#050414]/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/20 border border-white/10">
          <ul className="flex flex-col items-center space-y-1 py-6 text-gray-300">
            {menuItems.map((item, index) => (
              <li
                key={item.id}
                className={`w-full text-center transition-all duration-500 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${index * 100 + 200}ms` : '0ms'
                }}
              >
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full py-3 px-6 rounded-xl transition-all duration-300 hover:bg-white/5 hover:text-white ${
                    activeSection === item.id ? "text-[#8245ec] bg-white/5 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            
            {/* Mobile Social Icons */}
            <div 
              className={`flex space-x-6 pt-4 transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${menuItems.length * 100 + 400}ms` : '0ms' }}
            >
              <a
                href="https://github.com/Ikram-Alam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/5"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-ikram-alam-4157b7243"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/5"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </ul>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;