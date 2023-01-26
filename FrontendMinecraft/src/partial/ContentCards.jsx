import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ContentCards = ({list}) => {
    const router = useRouter();
    
  
    return (
      <div>
        {list.check === true && (
          <div className="grid grid-cols-1 gap-4 p-4 shadow-md mt-6 w-11/12 mx-auto border border-gray-200 rounded-md">
            <div className="flex flex-col justify-center items-center mt-[50px]">
              <div className="flex flex-col items-left w-full">
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    id:{" "}
                  </span>
                  {list.id}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    nickname:{" "}
                  </span>
                  {list.nickname}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    Faction:{" "}
                  </span>
                  {list.faction}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    points:{" "}
                  </span>
                  {list.points}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    strike:{" "}
                  </span>
                  {list.strike}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    reason:{" "}
                  </span>
                  {list.reason}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    proofs:{" "}
                  </span>
                  {list.proofs.map((proof, index) => (
                    <Link href={proof.url} key={index}>
                      <p className="text-gray-300 text-[12px] md:text-[16px]">
                        {proof.url}
                      </p>
                    </Link>
                  ))}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    staffnickname:{" "}
                  </span>
                  {list.staffnickname}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    modalidad:{" "}
                  </span>
                  {list.modalidad}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    time:{" "}
                  </span>
                  {list.time}
                </p>
                
              </div>
              <div className="flex flex-col items-left w-full">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push(`/dashboard/${list.id}`)}
                >
                  Ver mas
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default ContentCards