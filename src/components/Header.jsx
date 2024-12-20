import React, { useState, useEffect } from "react";

const Header = () => {
  // State to manage the visibility of the header
  const [visibility, setVisibility] = useState(false);

  // useEffect to control the visibility animation with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={`bg-gradient-to-br from-gray-800 to-gray-400 text-white py-6 shadow-lg shadow-slate-600 transform transition-all duration-1000 ease-out ${
        visibility ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
      }`}
    >
      <h1
        className={`text-center text-xl md:text-2xl lg:text-3xl font-extrabold transform transition-transform duration-1000 ease-out delay-100 ${
          visibility ? "scale-100" : "scale-90"
        }`}
      >
        Welcome to User Profile
      </h1>
    </header>
  );
};

export default Header;
