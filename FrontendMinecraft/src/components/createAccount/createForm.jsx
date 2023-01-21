import React, { useState, useEffect, useContext } from "react";
import UserContext from "@/components/context/userContext";
import { registerAccount } from "@/request/account";
import { useRouter } from "next/router";

const contentCreateAccount = () => {
  //eslint-disable-next-line
  const router = useRouter();
  //eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  //eslint-disable-next-line
  const [data, setData] = useState({
    email: "",
    password: "",
    nickname: "",
    role: "",
  });
  //eslint-disable-next-line
  const [error, setError] = useState(false);
  //eslint-disable-next-line
  const [textError, setTextError] = useState(
    "Por favor ingrese sus credenciales"
  );


  const roleListByrole = () => {
    if (user.role === "op") {
      const roleList = [
        { value: "op", label: "Operator" },
        { value: "Owner", label: "Owner" },
        { value: "high", label: "High" },
        { value: "minor", label: "Minor" },
      ];
      return roleList;
    } else if (user.role === "owner") {
      const roleList = [
        { value: "high", label: "High" },
        { value: "minor", label: "Minor" },
      ];
      return roleList;
    } else if (user.role === "high") {
      const roleList = [{ value: "minor", label: "Minor" }];
      return roleList;
    } else {
      const roleList = [];
      return roleList;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, nickname, role } = data;
    if (email === "") return setTextError("Por favor ingrese su email");
    if (password === "") return setTextError("Por favor ingrese su password");
    if (nickname === "") return setTextError("Por favor ingrese su nickname");
    if (role === "") return setTextError("Por favor ingrese su role");
    else {
      const response = await registerAccount(data);
      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        setError(true);
        setTextError(response.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-auto pt-40 pb-40">
      <div className="w-[80%] max-w-xs md:max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname"
            >
              Nickname
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              placeholder="Nickname"
              onChange={(e) => setData({ ...data, nickname: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              onChange={(e) => setData({ ...data, role: e.target.value })}
            >
              <option value="">Select Role</option>
              {roleListByrole().map((role, index) => (
                <option key={index} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500 text-xs italic">{textError}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default contentCreateAccount;