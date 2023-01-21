
import React, { useState, useContext, useEffect } from "react";
import UserContext from "@/components/context/userContext";
import {updateAvatar} from "@/request/account";
import { useRouter } from "next/router";
import Loading from "@/components/general/Loading";
import Image from "next/image";

const Profile = () => {
    //eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    //eslint-disable-next-line
    const router = useRouter();
    //eslint-disable-next-line

    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(0);
    const [textError, setTextError] = useState("Hubo un error");
    const [error, setError] = useState(false);

   
    const handleAvatar = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("avatar", avatar);
        if (!data) return setTextError("No hay data");
    
        const res = await updateAvatar(user.id, data);
         if (res.status === 200) {
              router.push("/dashboard");
         } else {
              setLoading(false);
              setError(true);
              setTextError(res.response.data.message);
              setTimeout(() => {
                setError(false);
              }, 3000);
            }
        }
    
    const validateEarnings = (earnings) => {
        if (earnings < 5) {
            return {
              color: "text-red-500",
              text: "if necesary 5$ to withdraw",
            }
        } else {
            return {
              color: "text-green-500",
              text: "You can withdraw",
            }
        }
    }

        

    // usar tailwind para estilos
    return (
      <div className="h-auto pt-40 pb-40">
        <div className="flex flex-col items-center justify-center">
          {loading && <Loading />}
          <div className="flex flex-col items-center justify-center">
            <Image
              className="w-32 h-32 rounded-full"
              src={
                user.avatar ? user.avatar : "https://i.imgur.com/6VBx3io.png"
              }
              width={200}
              height={200}
              alt="avatar"
            />
            <div className="flex flex-col items-center justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setTab(1)}
              >
                Actualizar
              </button>
            </div>
          </div>

          {tab === 1 && (
            <div className="flex flex-col items-center justify-center mt-4">
              <form onSubmit={handleAvatar}>
                <input
                  type="file"
                  name="avatar"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4 mr-4"
                  type="submit"
                >
                  Actualizar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mt-4"
                  onClick={() => setTab(0)}
                >
                  Cancelar
                </button>
              </form>
              {error && (
                <p className="text-red-500 text-xs italic">{textError}</p>
              )}
            </div>
          )}
          {/* informacion del usuario, usar colores claros porque el fondo es oscuro */}
          <div className="flex flex-col items-center justify-center mt-4 border-2 border-gray-200 rounded w-auto py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-left w-full">
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    id:{" "}
                  </span>
                  {user.id}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    nickname:{" "}
                  </span>
                  {user.nickname}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    email:{" "}
                  </span>
                  {user.email}
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    role:{" "}
                  </span>
                  {user.role}
                </p>
              </div>
            </div>
          </div>
          {/* wallet */}
          <div className="flex flex-col items-center justify-center mt-4 border-2 border-gray-200 rounded w-auto py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-left w-full">
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    wallet:{" "}
                  </span>
                  {user.earnings} $
                </p>
                <p className="text-gray-300 text-[12px] md:text-[16px]">
                  <span className="font-bold text-[14px] md:text-[18px]">
                    status:{" "}
                  </span>
                  <span className={validateEarnings(user.earnings).color}>
                    {validateEarnings(user.earnings).text}
                  </span>
                </p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => setTab(2)}
              >
                Withdraw
              </button>
              
            </div>
          </div>
        
        </div>
      </div>
    );
  };

   
export default Profile;