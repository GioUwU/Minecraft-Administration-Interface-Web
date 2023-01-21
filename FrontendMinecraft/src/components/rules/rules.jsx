import React, { useState, useContext, useEffect } from "react";
import { getAllRules } from "@/request/general";
import RuleCard from "@/partial/ruleCard";
import Loading from "@/components/general/loading";

const Rules = () => {
  const [times, setTimes] = useState([]);
  const [guildsCurrentPage, setGuildsCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [guildsPerPage, setGuildsPerPage] = useState(5);

  const indexOfLastGuild = guildsCurrentPage * guildsPerPage;
  const indexOfFirstGuild = indexOfLastGuild - guildsPerPage;
  const currentGuilds = times.slice(indexOfFirstGuild, indexOfLastGuild);

  const [loading, setLoading] = useState(true);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(times.length / guildsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setGuildsCurrentPage(pageNumber);

  useEffect(() => {
    const getTimes = async () => {
      const response = await getAllRules();
      if (response.status === 200) {
        setLoading(false);
        setTimes(response.data);
      }
    };
    getTimes();
  }, []);

  return (
    <div className="h-auto pt-40 pb-40">
      <div className="flex flex-col justify-center items-center bg-primary">
        <h1 className="font-poppins font-bold text-[24px] text-white mb-10">
          Rules
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center mt-[50px]">
          <Loading />
        </div>
      ) : (
        <div>
          {currentGuilds.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      )}
      <div className="flex flex-col justify-center items-center mt-[50px]">
        <div className="flex flex-row justify-center items-center">
          {/* los botones deben ser back y next, si llega a la ultima pagina no debe mostrar el boton next */}

          <button
            className="w-[50px] h-[50px]  border-[2px] border-white text-[16px] text-white font-poppins font-medium mr-[10px] rounded-[10px]"
            onClick={() => paginate(guildsCurrentPage - 1)}
            disabled={guildsCurrentPage === 1}
          >
            Back
          </button>
          <button
            className="w-[50px] h-[50px]  border-[2px] border-white text-[16px] text-white font-poppins font-medium ml-[10px] rounded-[10px]"
            onClick={() => paginate(guildsCurrentPage + 1)}
            disabled={guildsCurrentPage === pageNumbers.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
