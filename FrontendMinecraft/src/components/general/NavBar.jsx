import Link from "next/link";
import { logoutUser } from "@/request/auth";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "@/components/context/userContext";

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if(!user) {
      router.push("/");
    }
  }, []);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.status === 200) {
      localStorage.removeItem("token");
      setUser([])
      router.push("/");
    }
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <ul className="list-none sm:flex hidden justify-start items-center flex-1">
        <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
          {user.email && <Link href="/dashboard">dashboard</Link>}
        </li>
        <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
          <Link href="/rules">Rules</Link>
        </li>
        <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
          <Link href="/timebans">Times ban</Link>
        </li>
        {user.email && (
          <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
            <Link href="/registerban">Register ban</Link>
          </li>
        )}

        {(user && user.role === "op") ||
        user.role === "high" ||
        user.role === "owner" ? (
          <>
            <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
              <Link href="/accounts">Accounts</Link>
            </li>
            <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
              <Link href="/createaccount">Create account</Link>
            </li>
            <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
              <Link href="/general">general</Link>
            </li>
            <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
              <Link href="/verifyban">Verify ban</Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {user.email && (
          <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
            <Link href="/profile">Profile</Link>
          </li>
        )}
      </ul>

      <div className="flex justify-end items-center list-none sm:flex hidden justify-start items-center flex-1">
        {user.email ? (
          <div className="flex justify-end items-start flex-1">
            <button className=""></button>
            <button
              className={`font-poppins font-medium cursor-pointer text-[10px] mr-10  rounded-[10px] py-2 px-10 hover:text-white`}
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-logout"
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
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <button
          className="w-6 h-6 bg-primary rounded-full"
          onClick={() => setToggle(!toggle)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu-2 md:hidden"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
              <Link href="/dashboard">dashboard</Link>
            </li>
            <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
              <Link href="/rules">Rules</Link>
            </li>
            <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
              <Link href="/timebans">Times ban</Link>
            </li>
            {user.email && (
              <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
                <Link href="/registerban">Register ban</Link>
              </li>
            )}

            {(user && user.role === "op") ||
            user.role === "high" ||
            user.role === "owner" ? (
              <>
                <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
                  <Link href="/accounts">Accounts</Link>
                </li>
                <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
                  <Link href="/createaccount">Create account</Link>
                </li>
                <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
                  <Link href="/general">general</Link>
                </li>
                <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
                  <Link href="/verifyban">Verify ban</Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {user.email && (
              <li className="font-poppins font-medium text-[16px] text-dimWhite mr-10 hover:text-white">
                <Link href="/profile">Profile</Link>
              </li>
            )}
          </ul>

          <div className="flex justify-end items-start flex-1">
            {user.email ? (
              <div className="flex justify-end items-start flex-1">
                <button className=""></button>
                <button
                  className={`font-poppins font-medium cursor-pointer text-[10px] mr-10  rounded-[10px] py-2 px-10 hover:text-white`}
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-logout"
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
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                  </svg>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
