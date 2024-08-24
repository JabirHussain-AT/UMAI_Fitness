import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className="bg-primary text-secondery py-6 px-4 text-xs md:text-sm pt-16 border-t border-dashed border-seconderySupp">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
          <h3 className="text-base md:text-lg font-bold mb-2">Contact Us</h3>
          <div className="flex items-center mb-1">
            <MdEmail className="mr-1 text-sm" />
            <a href="mailto:info@gymname.com">info@gymname.com</a>
          </div>
          <div className="flex items-center mb-1">
            <MdPhone className="mr-1 text-sm" />
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
          <h3 className="text-base md:text-lg font-bold mb-2">Location</h3>
          <div className="flex items-start">
            <MdLocationOn className="mr-1 mt-1 text-sm" />
            <p>123 Fitness Street, Gym City, State - 123456</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
          <h3 className="text-base md:text-lg font-bold mb-2">Quick Links</h3>
          <ul>
            <li className="mb-1">
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
            </li>
            <li className="mb-1">
              <a href="/packages" className="hover:text-white transition-colors">Our Packages</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
          <h3 className="text-base md:text-lg font-bold mb-2">Follow Us</h3>
          <a href="https://www.instagram.com/gymname" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors">
            <FaInstagram className="mr-1 text-sm" />
            @gymname
          </a>
        </div>
      </div>
      <div className="text-center mt-4 text-xs">
        <p>&copy; 2023 GymName. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer