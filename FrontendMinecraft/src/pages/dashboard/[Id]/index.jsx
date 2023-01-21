import React, { useState, useContext, useEffect } from "react";
import NavBar from "@/components/general/NavBar";
import Footer from "@/components/general/Footer";
import { useRouter } from "next/router";
import { getBansByUser } from "@/request/registerban";
import ContentCards from "@/partial/ContentCards";
import Loading from "@/components/general/Loading";

const Dashboard = () => {
  const [banDetails, setBanDetails] = useState([]);
  const router = useRouter();
  const { Id } = router.query;

  const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (Id) {
            getBansByUser(Id).then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    setBanDetails(res.data);
                }
            });
        }
    }, [Id]);


  const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",

    heading2:
      "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    paragraph:
      "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",

    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavBar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
           { loading ? (
           <div className="flex flex-col justify-center items-center mt-[50px]">
            <Loading />
          </div>
            ) : (
           banDetails.map((list, index) => (
            <ContentCards key={index} list={list} />
          ))
            )}
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
