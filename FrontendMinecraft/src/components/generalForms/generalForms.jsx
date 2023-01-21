import react, {useState, useEffect} from "react";
import { newTime, newRule} from "@/request/general";
import { useRouter } from "next/router";
const GeneralForms = () => {
    const router = useRouter();
    const [dataTime, setDataTime] = useState({
        sanction: "",
	time: "",
	description: "",
    });
    const [dataRule, setDataRule] = useState({
        title: "",
        description: "",
    });
      const [error, setError] = useState(false);
     const [textError, setTextError] = useState(
        "Por favor ingrese sus credenciales"
    );

    const [error2, setError2] = useState(false);
    const [textError2, setTextError2] = useState(
        "Por favor ingrese sus credenciales"
    );

    const handleSubmitTime = async (e) => {
        e.preventDefault();
        const {sanction, time, description} = dataTime;
        const response = await newTime({
            sanction,
        time,
        description,
        });
        if(response.status === 200){
            router.push("/dashboard");
        } else {
            setError(true);
            setTextError(response.response.data.message);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    };

    const handleSubmitRule = async (e) => {
        e.preventDefault();
        const {title, description} = dataRule;
        const response = await newRule({
            title,
        description,
        });
        if(response.status === 200){
            router.push("/dashboard");
        } else {
            setError2(true);
            setTextError2(response.response.data.message);
            setTimeout(() => {
                setError2(false);
            }, 3000);
        }
    };

    //form con tailwind
    return (
        <div>
      <div className="flex justify-center items-center h-auto pt-10 pb-10">
        <div className="w-[80%] max-w-xs md:max-w-md">
            <form onSubmit={handleSubmitTime}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="sanction"
                    >
                        Sanción
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sanction"
                        type="text"
                        placeholder="Sanción"
                        onChange={(e) => setDataTime({ ...dataTime, sanction: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="time"
                    >
                        time
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="time"
                        type="text"
                        placeholder="time"
                        onChange={(e) => setDataTime({ ...dataTime, time: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Descripción
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Descripción"
                        onChange={(e) => setDataTime({ ...dataTime, description: e.target.value })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Crear
                    </button>
                </div>
            </form>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{textError}</span>
                </div>
            )}
        </div>
        </div>
        <div className="flex justify-center items-center h-auto pt-10 pb-10">
        <div className="w-[80%] max-w-xs md:max-w-md">
            <form onSubmit={handleSubmitRule}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Título
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Título"
                        onChange={(e) => setDataRule({ ...dataRule, title: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Descripción
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Descripción"
                        onChange={(e) => setDataRule({ ...dataRule, description: e.target.value })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Crear
                    </button>
                </div>
            </form>
            {error2 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{textError2}</span>
                </div>
            )}
        </div>
        </div>
        </div>
    );
};
export default GeneralForms;