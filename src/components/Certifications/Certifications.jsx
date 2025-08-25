import { useState } from "react";
import { certifications } from "../../constants";


const Certifications = () => {
  const [selectedCertification, setSelectedCertification] = useState(null);

  const handleOpenModal = (certification) => {
    setSelectedCertification(certification);
  };

  const handleCloseModal = () => {
    setSelectedCertification(null);
  };

  return (
    <section
      id="certifications"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative bg-gray-950"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CERTIFICATIONS</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          Professional certifications that validate my expertise in AI, data science, 
          and machine learning technologies
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification) => (
          <div
            key={certification.id}
            onClick={() => handleOpenModal(certification)}
            className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="p-4">
              <img
                src={certification.img}
                alt={certification.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white leading-tight">
                  {certification.title}
                </h3>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-purple-400 font-semibold">
                  {certification.provider}
                </p>
                <p className="text-gray-400 text-sm">
                  {certification.date}
                </p>
              </div>
              <p className="text-gray-500 mb-4 pt-2 line-clamp-3">
                {certification.desc}
              </p>
              <div className="mb-4">
                {certification.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Container */}
      {selectedCertification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative">
            <div className="flex justify-end p-4">
              <button
                onClick={handleCloseModal}
                className="text-white text-3xl font-bold hover:text-purple-500"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col">
              <div className="w-full flex justify-center bg-gray-900 px-4">
                <img
                  src={selectedCertification.img}
                  alt={selectedCertification.title}
                  className="lg:w-full w-[95%] h-64 object-contain rounded-xl shadow-2xl"
                />
              </div>
              <div className="lg:p-8 p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <h3 className="lg:text-3xl font-bold text-white mb-2 lg:mb-0 text-xl">
                    {selectedCertification.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold text-lg">
                      {selectedCertification.provider}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {selectedCertification.date}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 lg:text-base text-sm leading-relaxed">
                  {selectedCertification.desc}
                </p>
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 text-lg">Skills Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertification.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#251f38] text-sm font-semibold text-purple-500 rounded-full px-3 py-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* <div className="flex gap-4">
                  <button className="w-1/2 bg-gray-800 hover:bg-purple-800 text-gray-400 lg:px-6 lg:py-3 px-4 py-2 rounded-xl lg:text-lg text-sm font-semibold text-center transition-colors duration-300">
                    View Certificate
                  </button>
                  <button className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white lg:px-6 lg:py-3 px-4 py-2 rounded-xl lg:text-lg text-sm font-semibold text-center transition-colors duration-300">
                    Verify Credential
                  </button>
                </div> */}
                                <div className="flex gap-4">
                  <a
                    href={selectedCertification.View_Certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-gray-800 hover:bg-purple-800 text-gray-400 lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
                  >
                    View Certificate
                  </a>
                  <a
                    href={selectedCertification.Verify_Credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-purple-600 hover:bg-purple-800 text-white lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center"
                  >
                    Verify Credential
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;