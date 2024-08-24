import React, { useState } from "react";
import { TbPhoneCall } from "react-icons/tb";

const OurPackages = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const annualPackage = {
    price: "₹ 6699.00/year",
    benefits: [
      "Access to all gym equipment",
      "Unlimited group classes",
      "Personalized nutrition plan",
      "2 free personal training sessions",
      "20% discount on merchandise",
    ],
  };

  const monthlyPackage = {
    price: "₹ 600/month",
    benefits: [
      "Access to all gym equipment",
      "2 group classes per week",
      "Basic nutrition plan",
    ],
  };

  const activePackage = isAnnual ? annualPackage : monthlyPackage;

  return (
    <div className="relative w-full h-auto my-5 md:my-10 px-4 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        {/* Heading */}
        <h1 className="text-xl md:text-3xl font-serif font-semibold text-white text-center mb-4">
          Our <span className="text-secondery">Packages</span>
        </h1>

        {/* Tabs */}
        <div className="flex bg-primarySupp bg-opacity-80 rounded-full p-1 mb-6 font-serif md:my-5">
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              isAnnual ? "bg-secondery text-black" : "text-white hover:bg-secondery hover:bg-opacity-30"
            }`}
            onClick={() => setIsAnnual(true)}
          >
            Billed Annually
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              !isAnnual ? "bg-secondery text-black" : "text-white hover:bg-secondery hover:bg-opacity-30"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Billed Monthly
          </button>
        </div>
      </div>

      {/* Package content */}
      <div className="bg-secondery bg-opacity-90 rounded-lg p-6 md:p-8 min-h-[400px] font-sans shadow-lg">
        <h2 className="text-lg md:text-xl text-black font-bold mb-4">
          {isAnnual ? "Annual Package" : "Monthly Package"}
        </h2>
        <div className="bg-primary bg-opacity-90 text-white text-3xl md:text-4xl font-bold p-4 md:p-6 rounded-lg mb-4 text-center shadow-md">
          {activePackage.price}
        </div>
        <h3 className="text-lg md:text-xl text-black font-semibold mb-2">Benefits:</h3>
        <ul className="list-disc pl-5 md:pl-8">
          {activePackage.benefits.map((benefit, index) => (
            <li key={index} className="text-primary mb-2 md:mb-3">
              {benefit}
            </li>
          ))}
        </ul>
        <div className="w-full justify-center items-center h-auto flex mt-8">
          {/* connect */}
          <button className="bg-primarySupp bg-opacity-90 flex gap-3 items-center text-white hover:scale-105 hover:bg-opacity-100 transition-all duration-300 px-6 py-3 rounded-md shadow-md">
            Connect to Register 
            <TbPhoneCall className="text-secondery" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurPackages;