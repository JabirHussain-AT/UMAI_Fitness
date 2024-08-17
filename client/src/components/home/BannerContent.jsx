import React from "react";
import { motion } from "framer-motion";
import Banner from "../../assets/MainBanner.png";
import { MdArrowRight } from "react-icons/md";

const BannerContent = () => {
  const text =
    "Ready to transform your body and mind? We're more than just a gym, we're your community to conquer your fitness goals. Join us and experience personalized training, motivating classes, and the support you need to achieve greatness. Start your journey today!";

  return (
    <>
      {/* Content div */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start justify-center mb-8 md:mb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className=" mb-7 md:mb-4 font-sans font-bold text-3xl md:text-4xl lg:text-4xl text-white text-center md:text-left ">
          <span className="text-secondery">Unleash</span> Your True Potential.
          <br />
          <span className="text-secondery">Forge</span> Your Future.
        </h1>
        <p className="text-gray-300 text-sm md:text-base text-center md:text-left mb-6 max-w-md font-mono">
          {text}
        </p>
        {/*  Buttons  */}
        <motion.div className={"flex gap-3"}>
          <motion.button
            className="bg-secondery hover:cursor-pointer flex gap-3 items-center text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-opacity-80 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show Workouts
            <span>
              <MdArrowRight />
            </span>
          </motion.button>
          <motion.button
            className="text-white hover:cursor-pointer hover:bg-white hover:duration-100 hover:text-black flex gap-3 items-center px-6 py-3 rounded-full font-serif border-2 border-white text-lg hover:bg-opacity-80 transition duration-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect a call
            <span>
              <MdArrowRight />
            </span>
          </motion.button>
        </motion.div>

        {/* e end */}
      </motion.div>

      <motion.div
        className="relative z-10 w-full md:w-1/2 flex justify-center items-center"
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
    </>
  );
};

export default BannerContent;
