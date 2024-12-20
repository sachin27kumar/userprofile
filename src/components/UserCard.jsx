import React, { useState, useEffect } from "react";
import Loading from "./Loading";

function UserCard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // API endpoint URL
  const url = "https://randomuser.me/api/?page=1&results=1&seed=abc";

  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // useEffect to fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error : ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-800">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg font-medium">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || !data.results) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-800">
        <h1 className="text-4xl font-bold mb-4">No Data Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className={`card-outer-div flex  bg-gradient-to-br from-slate-400 to-slate-100 shadow-xl shadow-slate-600 rounded-lg ${
          visibility
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-12 scale-90"
        } overflow-auto p-6 w-1/2 lg:h-96 md:h-60 min-h-52 transform transition-all duration-1000 ease-out  hover:scale-105 hover:shadow-2xl`}
      >
        <div className="card-inner-div flex lg:flex-row md:flex-row flex-col items-center w-full">
          <div className="image-div w-2/5 flex items-center justify-center">
            <img
              className="lg:w-4/5 md:w-32 w-36 rounded-md shadow-lg shadow-slate-500 transform transition-all duration-1000 ease-out  hover:scale-105 hover:shadow-2xl"
              src={data.results[0].picture.large}
              alt="profile-image"
            />
          </div>
          <div className="info-div lg:w-3/5 md:w-1/2 md:h-48 md:my-auto md:pl-3 min-h-32 my-5 lg:h-60 lg:pl-4 py-4 flex flex-col lg:text-start md:text-start text-start rounded-md shadow-lg shadow-slate-500 transform transition-all duration-1000 ease-out  hover:scale-105 hover:shadow-2xl">
            <div className="name-div flex lg:gap-12 lg:text-4xl lg:font-extrabold md:gap-8 md:text-xl md:font-bold gap-4 text-lg font-medium text-gray-800 tracking-wide">
              <p>{data.results[0].name.first}</p>
              <p>{data.results[0].name.last}</p>
            </div>
            <div className="gender-div text-gray-600 lg:font-semibold lg:text-xl lg:my-7 md:font-semibold md:text-base md:my-3">
              <span className="text-gray-800 lg:font-semibold lg:text-xl md:font-bold md:text-base">
                Gender:{" "}
              </span>
              {data.results[0].gender
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}{" "}
            </div>

            <div className="contact-div text-gray-600 lg:font-semibold lg:text-xl lg:my-7 md:font-semibold md:text-base">
              <span className="text-gray-800 lg:font-semibold lg:text-xl md:font-bold md:text-base">
                Contact:{" "}
              </span>
              {data.results[0].phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
