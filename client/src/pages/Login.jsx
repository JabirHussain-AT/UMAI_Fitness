import { GoogleLogin } from "@react-oauth/google";
import Logo from "../assets/Logo.png";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google login successful:", credentialResponse);
    // Handle successful login here (e.g., send to your backend, update state, etc.)
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    // Handle login error here (e.g., show error message to user)
  };

  return (
    <div className="bg-[url('https://mcdn.wallpapersafari.com/medium/63/72/sEtnjN.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 w-80 md:w-96 p-8 shadow-2xl rounded-lg hover:scale-105 duration-700 transition-all">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo Section */}
          <img
            src={Logo}
            alt="Logo"
            className="h-24 object-contain animate-pulse"
          />

          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h1 className="font-serif text-4xl font-bold text-white">
              Welcome
            </h1>
            <p className="text-gray-300 text-lg">Sign in to get started</p>
          </div>

          {/* Google Login Button */}
          <div className="w-full flex justify-center  pt-4">
            <GoogleLogin
              theme="filled_blue"
              size="large"
              shape="pill"
              text="continue_with"
              useOneTap
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              render={({ onClick }) => (
                <button
                  onClick={onClick}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-full flex items-center justify-center space-x-3 hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
                >
                  <FaGoogle className="text-2xl" />
                  <span className="text-lg font-semibold">
                    Sign in with Google
                  </span>
                </button>
              )}
            />
          </div>
        </div>

        {/* Terms and Privacy */}
        <p className="text-gray-400 text-center mt-8 text-sm px-4">
          By signing in, you agree to our{" "}
          <a
            href="/terms"
            className="underline hover:text-white transition duration-300"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline hover:text-white transition duration-300"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>  
  );
};

export default Login;
