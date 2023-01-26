import React, { useState, useEffect, useContext } from "react";
import UserContext from "@/components/context/userContext";
import { registerBan } from "@/request/registerban";
import { useRouter } from "next/router";
import { uploadProofs } from "@/request/registerban";
import Link from "next/link";

const RegisterBanContent = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [proofId, setProofId] = useState(null);
  const [proofs, setProofs] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState({
    nickname: " ",
    faction: " ",
    reason: " ",
    strike: 1,
    points: 1,
    modalidad: " ",
    time: " ",
    staffnickname: user?.nickname,
  });
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState(
    "Por favor ingrese sus credenciales"
  );

  const options = [
    { value: "permante", label: "Ban Permante" },
    { value: "temporal", label: "Ban Temporal" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nickname,
      faction,
      reason,
      strike,
      points,
      modalidad,
      time,
      staffnickname,
      proofs,
    } = data;

    if (nickname === "") return setTextError("Por favor ingrese su nickname");
    if (faction === "") return setTextError("Por favor ingrese su faction");
    if (reason === "") return setTextError("Por favor ingrese su reason");
    if (strike === "") return setTextError("Por favor ingrese su strike");
    if (points === "") return setTextError("Por favor ingrese su points");
    if (modalidad === "") return setTextError("Por favor ingrese su modalidad");
    if (time === "") return setTextError("Por favor ingrese su time");
    if (staffnickname === "")
      return setTextError("Por favor ingrese su staffnickname");
    if (proofs === "") return setTextError("Por favor ingrese su proofs");
    else {
      const response = await registerBan(data);
      if (response.status === 200) {
        setProofId(response.data.id);

        setDisabled(true);
        setTab(1);
      } else {
        setError(true);
        setTextError(response.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  };

  const handleUpload = async (e) => {
    //se puede subir mas de un archivo a la vez, imagenes, videos, etc con el valor proofs
    e.preventDefault();
    if (proofs.length === 0) {
      setTextError("No hay archivos");
      return;
    }

    setUploading(true);
    //subir todos los archivos con el valor proofs
    //recibira videos, imagenes, etc
    const data = new FormData();
    for (let i = 0; i < proofs.length; i++) {
      data.append("proofs", proofs[i]);
    }

    const response = await uploadProofs(proofId, data);
    if (response.status === 200) {
      //contar el tiempo de subida de archivos y calcular el progreso
      setUploading(false);
      setTab(2);
    } else {
      setError(true);
      setTextError(response.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleFile = (e) => {
    e.preventDefault();

    //validar si hay archivos
    if (!e.target.files) {
      setTextError("No hay archivos");
      return;
    }
    const files = e.target.files;
    //se puede subir mas de un archivo a la vez, imagenes, videos, etc con el valor proofs
    setProofs([...proofs, ...files]);
  };

  const handleDeleteProof = (proof) => {
    const newProofs = proofs.filter((item) => item !== proof);
    setProofs(newProofs);
  };

  return (
    <div className="flex justify-center items-center h-auto pt-40 pb-40">
      <div className="w-[80%] max-w-xs md:max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname"
            >
              Nickname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              placeholder="Nickname"
              onChange={(e) => setData({ ...data, nickname: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="faction"
            >
              Faction
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="faction"
              type="text"
              placeholder="Faction"
              onChange={(e) => setData({ ...data, faction: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="reason"
            >
              Reason
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              type="text"
              placeholder="Reason"
              onChange={(e) => setData({ ...data, reason: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="strike"
            >
              Strike
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="strike"
              type="number"
              placeholder="Strike"
              onChange={(e) => setData({ ...data, strike: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="points"
            >
              Points
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="points"
              type="number"
              placeholder="Points"
              onChange={(e) => setData({ ...data, points: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="modalidad"
            >
              Modalidad
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="modalidad"
              type="text"
              placeholder="Modalidad"
              onChange={(e) => setData({ ...data, modalidad: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="text"
              placeholder="Time"
              onChange={(e) => setData({ ...data, time: e.target.value })}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            {/*mostrar el staffnickname y no dejar que el usuario lo modifique*/}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="staffnickname"
            >
              Staff Nickname
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="staffnickname"
              type="text"
              placeholder={user?.nickname}
              onChange={(e) =>
                setData({ ...data, staffnickname: e.target.value })
              }
            />
          </div>

          {error && <p className="text-red-500 text-xs italic">{textError}</p>}
          {!disabled && (
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>

      {tab === 1 && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex items-center justify-center">
          <form onSubmit={handleUpload}>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 40V12a2 2 0 012-2h20a2 2 0 012 2v28a2 2 0 01-2 2H16a2 2 0 01-2-2zm0 0v-8m0 0h8m-8 0h-.01M34 8l4 4m0 0l-4 4m4-4H6"
                    ></path>
                  </svg>
                  <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                    Select a file
                  </p>

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFile}
                    multiple
                  />

                  <div className="flex flex-col items-center justify-center pt-7">
                    <p className="text-xs text-gray-400 pt-1 tracking-wider">
                      PNG, JPG, GIF up to 10MB
                    </p>

                    <p className="text-xs text-gray-400 pt-1 tracking-wider">
                      MP4, MOV, AVI up to 300MB
                    </p>
                  </div>
                </div>
                {/*show the file name to proofs*/}
              </label>
            </div>

            <div className="flex flex-col items-center justify-center pt-10">
              {proofs &&
                proofs.map((proof, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center pt-10"
                  >
                    <ul className="flex flex-col items-center justify-center border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                      <li className="flex flex-col items-left justify-left">
                        <div className="flex flex-row items-left justify-left">
                          <p className="text-xs text-gray-400 pt-1 tracking-wider">
                            {proof.name}
                          </p>
                          <button
                            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2  border border-red-500 hover:border-transparent rounded"
                            type="button"
                            onClick={() => handleDeleteProof(proof)}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
            </div>

            {error && (
              <p className="text-red-500 text-xs italic">{textError}</p>
            )}

            {uploading ? (
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  <p className="text-xs text-gray-400 pt-1 tracking-wider">
                    Uploading...
                  </p>
                  <p className="text-xs text-gray-400 pt-1 tracking-wider">
                    Please wait... no close the window
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
                <button
                  className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
                  type="submit"
                >
                  Upload
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {tab === 2 && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            <svg
              className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 40V12a2 2 0 012-2h20a2 2 0 012 2v28a2 2 0 01-2 2H16a2 2 0 01-2-2zm0 0v-8m0 0h8m-8 0h-.01M34 8l4 4m0 0l-4 4m4-4H6"
              ></path>
            </svg>
            <p className="text-xs text-gray-400 pt-1 tracking-wider">
              Upload success
            </p>
            {/*go to dashboard*/}
            <Link href="/dashboard">
              <button className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                Go to dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterBanContent;
