import React, {useState, useContext, useEffect} from "react";
import UserContext from "@/components/context/userContext";
import { loginUser } from "@/request/auth";
import {useRouter} from "next/router";
const Login = () => {
    //pantalla de login
    const [data, setData] = useState({email: "", password: ""});
    const [error, setError] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const [textError, setTextError] = useState(
        "Por favor ingrese sus credenciales"
    );
    const router = useRouter();
  

    useEffect(() => {
        if(user) {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
      
    }, [user]);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = data;
        const response = await loginUser({
            email,
            password
        });

        if(response.status === 200){
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            if (
              response.data.user.role === "minor" ||
              response.data.user.role === "high" ||
              response.data.user.role === "op" ||
              response.data.user.role === "owner"
            ) {
              router.push("/dashboard");
            }
            
        } else {
            setError(true);
            setTextError(response.response.data.message);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    } 

    //usar tailwind para estilos
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
                placeholder="email"
                name="email"
                value={data.email}
                onChange={
                    e => setData({
                        ...data,
                        email: e.target.value
                    })

                }
              />
            </div>
            <div className="mb-6">
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
                name="password"
                value={data.password}
                onChange={
                    e => setData({
                        ...data,
                        password: e.target.value
                    })
                }

              />
              {error && (
                <p className="text-red-500 text-xs italic">
                   {textError}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;