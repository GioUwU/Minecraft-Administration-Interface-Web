import React, { useState, useContext, useEffect } from "react";
import UserContext from "@/components/context/userContext";
import { getallAccounts } from "@/request/account";
import AccountCard from "@/partial/accountCard";
import { useRouter } from "next/router";
import Loading from "@/components/general/Loading";

const AccountContent = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);

   const [guildsCurrentPage, setGuildsCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [guildsPerPage, setGuildsPerPage] = useState(5);

  const indexOfLastGuild = guildsCurrentPage * guildsPerPage;
  const indexOfFirstGuild = indexOfLastGuild - guildsPerPage;
  const currentGuilds = accounts.slice(indexOfFirstGuild, indexOfLastGuild);

  const [loading, setLoading] = useState(true);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(accounts.length / guildsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setGuildsCurrentPage(pageNumber);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      router.push("/");
    } else {
      const fetchAccounts = async () => {
        const response = await getallAccounts();
        if (response.status === 200) {
          setLoading(false);
          setAccounts(response.data);
        }
      };
      fetchAccounts();
    }
  }, []);

    

    return (
      <div className="h-auto pt-40 pb-40">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="font-poppins font-bold text-[24px] text-white mb-10">
            Accounts list
          </h1>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center mt-[50px]">
            <Loading />
          </div>
        ) : (
          <div>
            {currentGuilds.map((account) => (
              <AccountCard key={account.id} account={account} />
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

export default AccountContent;
