import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { autorizarSancion, rejectSancion } from "@/request/registerban";
import Link from "next/link";

const ContentAdminCard = ({ list }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("Ups, algo salio mal");

  const handleAutorizar = async (id) => {
    const response = await autorizarSancion(id);
    if (response.status === 200) {
      router.reload();
    } else {
      setError(true);
      setTextError(response.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleRechazar = async (id) => {
    const response = await rejectSancion(id);
    if (response.status === 200) {
      router.reload();
    } else {
      setError(true);
      setTextError(response.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div>
      {list.check === false && (
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
                  check:{" "}
                </span>
                {list.check ? "si" : "no"}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  time:{" "}
                </span>
                {list.time}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  createdAt:{" "}
                </span>
                {list.createdAt}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  updatedAt:{" "}
                </span>
                {list.updatedAt}
              </p>
            </div>
            <div className="flex flex-col items-left w-full">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleAutorizar(list.id)}
              >
                Autorizar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleRechazar(list.id)}
              >
                Rechazar
              </button>

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 "
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline">{textError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentAdminCard;
