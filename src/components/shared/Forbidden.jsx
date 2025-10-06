
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 text-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full flex flex-col items-center gap-6 border-t-4 border-red-500">

        <div className="bg-red-100 p-6 rounded-full shadow-inner">
          <FaShieldAlt className="text-red-500 w-16 h-16 animate-pulse" />
        </div>

        <h1 className="text-4xl font-extrabold text-red-600 tracking-wide">
          403 Forbidden
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed">
          You don’t have permission to access this page.<br />
          Please contact an administrator if you believe this is a mistake.
        </p>

        <Link
          to="/"
          className="btn btn-error text-white btn-wide flex items-center justify-center gap-2 mt-4 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FaArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-100 via-transparent to-red-200 opacity-60 animate-pulse"></div>
    </div>
  );
};

export default Forbidden;
