import React from "react";
import BackgroundImage from "../assets/bg-home.png";
import BannerContent from "../components/home/BannerContent";
import ExploreSection from "../components/home/ExploreSection";
import OurPackages from "../components/home/OurPackages";

const Home = () => {
  return (
    <div className=" bg-primary min-h-screen px-5">
      {/* Background image div with pointer-events:none */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          pointerEvents: "none",
        }}
      ></div>
      <div className="relative w-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 md:mb-16 md:pt-32 py-16">
        <BannerContent />
      </div>
      <div className="md:pb-10 pb-10" >
        <ExploreSection />
      </div>
      <div className="md:pb-16 pb-10" >
        <OurPackages />
      </div>
    </div>
  );
};

export default Home;
