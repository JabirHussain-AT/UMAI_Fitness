import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ExploreSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    { icon: '🏋️', title: 'Weight Training', description: 'Build strength and muscle' },
    { icon: '🏃', title: 'Cardio Workouts', description: 'Improve cardiovascular health' },
    { icon: '👨‍🏫', title: 'Personal Training', description: 'One-on-one coaching' },
    { icon: '👩', title: 'Ladies Training', description: 'Women-focused workouts' },
    { icon: '⚖️', title: 'Weight Loss', description: 'Achieve your weight goals' },
    { icon: '🥊', title: 'Boxing & Martial Arts', description: 'Learn self-defense and discipline' },
  ];

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < items.length - (window.innerWidth >= 768 ? 5 : 1);

  const handlePrev = () => {
    if (showPrev) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (showNext) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="relative w-full h-auto my-5 md:my-10 md:px-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrev}
          className={`mr-2 p-2 rounded-full ${
            showPrev ? 'bg-white text-black' : 'bg-gray-300 text-white'
          }`}
          disabled={!showPrev}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className={`p-2 rounded-full ${
            showNext ? 'bg-white text-black' : 'bg-gray-300 text-white'
          }`}
          disabled={!showNext}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="flex overflow-hidden">
        {items.slice(currentIndex, currentIndex + (window.innerWidth >= 768 ? 5 : 1)).map((item, index) => (
          <div key={index} className="w-full md:w-1/5 p-4">
            <div className="text-4xl mb-2">{item.icon}</div>
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;