import React from "react";

const TimeCard = ({ rule }) => {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 shadow-md mt-6 w-11/12 mx-auto border border-gray-200 rounded-md">
        <div className="flex flex-col items-left w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center">
              <div className="flex flex-col items-left">
                <div className="font-poppins font-semibold text-[18px] text-white">
                  {rule.sanction}
                </div>
                <div className="font-poppins font-semibold text-[14px] text-dimWhite">
                  {rule.time}
                </div>
                <div className="font-poppins font-normal text-[14px] text-dimWhite">
                  {rule.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }

export default TimeCard;