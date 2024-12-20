import React from "react";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-opacity-100"></div>
      <p className="mt-6 text-4xl text-slate-100 font-normal">
        Loading... Please wait
      </p>{" "}
    </div>
  );
}

export default Loading;
