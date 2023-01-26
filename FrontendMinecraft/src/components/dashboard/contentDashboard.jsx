import React, { useEffect, useState } from "react";
import ContentCards from "@/partial/contentCards";
import { getAllBans } from "@/request/registerban";
import Loading from "@/components/general/Loading";

const contentDashboard = ({admin}) => {
  //eslint-disable-next-line
  const [guildsFilter, setGuildsFilter] = useState([]);
  //eslint-disable-next-line
  const [guildsFilterName, setGuildsFilterName] = useState("");
  //eslint-disable-next-line
  const [guildsCurrentPage, setGuildsCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [guildsPerPage, setGuildsPerPage] = useState(6);

  //eslint-disable-next-line
  const [loading, setLoading] = useState(true);

  //eslint-disable-next-line
  const [banslist, setBanslist] = useState([]);

  //eslint-disable-next-line
  useEffect(() => {
    const getBans = async () => {
      const response = await getAllBans();
      if (response.status === 200) {
      
        const banlistarray = [];
        response.data.map((ban) => {
           
          if (ban.check === true) {
            
            banlistarray.push(ban);
          }
          return banlistarray;
        });

        setBanslist(banlistarray);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    getBans();
  }, []);

  const indexOfLastGuild = guildsCurrentPage * guildsPerPage;
  const indexOfFirstGuild = indexOfLastGuild - guildsPerPage;
  const currentGuilds = banslist.slice(indexOfFirstGuild, indexOfLastGuild);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(banslist.length / guildsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setGuildsCurrentPage(pageNumber);

  const filterGuilds = (e) => {
    setGuildsFilterName(e.target.value);
    setGuildsFilter(
      banslist.filter((guild) => {
        return (
          guild.nickname.toLowerCase().includes(e.target.value.toLowerCase()) ||
          guild.faction.toLowerCase().includes(e.target.value.toLowerCase())
        );
      })
    );
  };

  return (
    <div className="h-auto pt-40 pb-40">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center mt-[50px]">
          <p className="font-poppins font-bold text-[36px] text-white text-left sm:text-left">
            History Bans
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-[200px] h-[50px] rounded-[4px] border-[10px] border-white text-[16px] text-black font-poppins font-medium mt-[50px] md:w-[400px] md:h-[50px]"
            onChange={filterGuilds}
          />
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center mt-[50px]">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-[50px]">
            {guildsFilterName.length > 0 ? (
              <div className="flex flex-row justify-center items-center flex-wrap">
                {guildsFilter.map((guild) => (
                  <ContentCards key={guild.id} list={guild} admin={admin} />
                ))}
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center flex-wrap">
                {currentGuilds.map((guild) => (
                  <ContentCards key={guild.id} list={guild} admin={admin} />
                ))}
              </div>
            )}
          </div>
        )}

        {currentGuilds.length === 0 && (
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
      )}
      </div>
          
    </div>
  );
};

export default contentDashboard;
