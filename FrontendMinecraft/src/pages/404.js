import React, { useEffect, useState } from "react";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import Router from "next/router";

const Custom404 = () => {
  const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",

    heading2:
      "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    paragraph:
      "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",

    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",
  };

  const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          {/*create page error with animation and text and tailwind css*/}
          <div className="flex flex-col items-center justify-center h-screen text-center text-white">
            {/* SVG Animation */}
            <svg
              class="animate-bounce h-20 w-20 text-white mb-3 w-36 h-36"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
            <h1 className="text-3xl font-bold md:text-9xl mb-2">404</h1>
            <h2 className="text-xl md:text-6xl font-medium mb-2">
              {" "}
              Page Not Found
            </h2>
            <p className="text-1xl mb-14 text-gray-400 text-center md:text-2xl">
              Sorry, but the page you are looking for does not exist, have been{" "}
              <br />
              removed, name changed or is temporarily unavailable
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => Router.push("/")}
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Custom404;
