import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Weight, Ruler, Calendar, AlertCircle, Eye } from "lucide-react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// Updated validation schema
const profileValidationSchema = yup.object().shape({
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  age: yup.number().positive().integer().required("Age is required"),
  address: yup.string().required("Address is required"),
  job: yup.string().required("Job is required"),
  weight: yup.number().positive().required("Weight is required"),
  height: yup.number().positive().required("Height is required").typeError("Height must be a number"),
  dob: yup.date().required("Date of birth is required"),
  physicalIssues: yup.string().nullable(),
  vision: yup.string().required("Vision is required"),
});

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joiningDate] = useState("2023-01-01");

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      phoneNumber: "123-456-7890",
      email: "example@email.com",
      age: 28,
      address: "123 Main St, City, Country",
      job: "Software Developer",
      weight: 70,
      height: 175,
      dob: "1995-01-01",
      physicalIssues: "",
      vision: "",
    }
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const getIcon = (key) => {
    switch (key) {
      case "phoneNumber": return <Phone size={20} />;
      case "email": return <Mail size={20} />;
      case "age": return <User size={20} />;
      case "address": return <MapPin size={20} />;
      case "job": return <Briefcase size={20} />;
      case "weight": return <Weight size={20} />;
      case "height": return <Ruler size={20} />;
      case "dob": return <Calendar size={20} />;
      case "physicalIssues": return <AlertCircle size={20} />;
      case "vision": return <Eye size={20} />;
      default: return null;
    }
  };

  const formatDate = (date) => {
    return moment(date).format('MMMM Do, YYYY');
  };

  // Define the onSubmit function to handle form submission
  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate a form submission API call
    setTimeout(() => {
      console.log("Form Data:", data);
      setIsSubmitting(false);
      setIsEditing(false);  // End editing after submitting
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-primary via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-primarySupp bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <button 
          onClick={() => navigate('/')} 
          className="mb-8 flex items-center text-secondery hover:text-white transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </button>
        <div className="flex flex-col items-center mb-8">
          <div className="w-40 h-40 mb-4 rounded-full overflow-hidden bg-gray-200 border-4 border-purple-500 shadow-lg">
            {photo ? (
              <img src={photo} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <User size={64} />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            disabled={!isEditing}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {Object.entries(profileValidationSchema.fields).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-4">
              <div className="text-seconderySupp">{getIcon(key)}</div>
              <div className="flex-grow">
                <label className="text-sm font-medium text-secondery capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                {isEditing ? (
                  key === 'physicalIssues' ? (
                    <textarea
                      {...register(key)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="List any physical issues (optional)"
                    />
                  ) : key === 'vision' ? (
                    <select
                      {...register(key)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select Vision</option>
                      <option value="weight gain">Weight Gain</option>
                      <option value="weight loss">Weight Loss</option>
                      <option value="athlete">Athlete</option>
                      <option value="kickboxing">Kickboxing</option>
                      <option value="wushu">Wushu</option>
                      <option value="physique">Physique</option>
                    </select>
                  ) : key === 'height' ? (
                    <input
                      {...register(key)}
                      type="number"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Height in cm"
                    />
                  ) : (
                    <input
                      {...register(key)}
                      type={key === 'dob' ? 'date' : 'text'}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  )
                ) : (
                  <p className="mt-1 text-gray-400 font-medium">
                    {key === 'dob' ? formatDate(watch(key)) : 
                     key === 'height' ? `${watch(key)} cm` :
                     key === 'weight' ? `${watch(key)} kg` :
                     key === 'physicalIssues' ? (watch(key) && watch(key).length > 0 ? watch(key) : 'None') :
                     watch(key)}
                  </p>
                )}
                {errors[key] && <p className="mt-1 text-red-500 text-sm">{errors[key].message}</p>}
              </div>
            </div>
          ))}

          {/* Joining Date Field */}
          <div className="flex items-center space-x-4">
            <div className="text-seconderySupp"><Calendar size={20} /></div>
            <div className="flex-grow">
              <label className="text-sm font-medium text-secondery">Joining Date</label>
              <p className="mt-1 text-gray-400 font-medium">{formatDate(joiningDate)}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            {isEditing ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-secondery text-primarySupp hover:border-white hover:border-2 font-semibold rounded-full shadow-lg hover:bg-primary hover:text-seconderySupp focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
              >
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-secondery text-primarySupp hover:border-white hover:border-2 font-semibold rounded-full shadow-lg hover:bg-primary hover:text-seconderySupp focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
