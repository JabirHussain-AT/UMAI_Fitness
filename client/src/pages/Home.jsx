import React from "react";
import { motion } from "framer-motion";
import { MdArrowRight } from "react-icons/md";
import Banner from "../assets/MainBanner.png";
import BackgroundImage from "../assets/bg-home.png";

const Home = () => {
  const text =
    "Ready to transform your body and mind? We're more than just a gym, we're your community to conquer your fitness goals. Join us and experience personalized training, motivating classes, and the support you need to achieve greatness. Start your journey today!";

  return (
    <div className="w-full bg-primary min-h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
      {/*  */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>
      {/* motion div */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center mb-8 md:mb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >


        <h1 className="font-sans font-bold text-3xl md:text-4xl lg:text-4xl text-white text-center md:text-left mb-4">
          <span className="text-secondery">Unleash</span> Your True Potential.
          <br />
          <span className="text-secondery">Forge</span> Your Future.
        </h1>
        <p className="text-gray-300 text-sm md:text-base text-center md:text-left mb-6 max-w-md font-mono">
          {text}
        </p>


        <motion.button
          className="bg-secondery hover:cursor-pointer   flex gap-3 items-center text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-opacity-80 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Workouts{" "}
          <span>
            {" "}
            <MdArrowRight />{" "}
          </span>
        </motion.button>
      </motion.div>


      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          className="rounded-md shadow-2xl w-full max-w-md lg:max-w-lg xl:max-w-xl hover:scale-105 transition duration-1000"
          src={Banner}
          alt="BannerImage"
        />
      </motion.div>

      
    </div>
  );
};

export default Home;
