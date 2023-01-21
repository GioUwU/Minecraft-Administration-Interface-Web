import React, { useState, useContext, useEffect } from "react";
import UserContext from "@/components/context/userContext";
import Image from "next/image";
import { deleteAccount } from "@/request/account";
import { useRouter } from "next/router";

const AccountCard = ({ account }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const submitDelete = async (id) => {
    try {
      const response = await deleteAccount(id);
      if (response.status === 200) {
        router.reload("/accounts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    if(user.role === "op"){
      if(user.role === account.role){
        return false;
      }
      return true;
    }
    if(user.role === "owner"){
      if(user.role === account.role){
        return false;
      }
      if(account.role === "op"){
        return false;
      }
      return true;
    }
    if(user.role === "high"){
      if(user.role === account.role){
        return false;
      }
      if(account.role === "op"){
        return false;
      }
      if(account.role === "owner"){
        return false;
      }
      return true;
    }

  };

 

  return (
    <div className="grid grid-cols-1 gap-4 p-4 shadow-md mt-6 w-11/12 mx-auto border border-gray-200 rounded-md">
      <div className="flex flex-col items-left w-full">
        {account.avatar ? (
          <Image
            src={account.avatar}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-user"
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
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        )}

        <div className="flex flex-col items-left w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-left w-full">
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  id:{" "}
                </span>
                {account.id}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  nickname:{" "}
                </span>
                {account.nickname}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  email:{" "}
                </span>
                {account.email}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  password:{" "}
                </span>
                {account.password}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  role:{" "}
                </span>
                {account.role}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  createdAt:{" "}
                </span>
                {account.createdAt}
              </p>
              <p className="text-gray-300 text-[12px] md:text-[16px]">
                <span className="font-bold text-[14px] md:text-[18px]">
                  updatedAt:{" "}
                </span>
                {account.updatedAt}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-left w-full">
             {validate() ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  submitDelete(account.id);
                }}
              >
                Delete
              </button>
            ) : (
              <p className="text-red-500 text-[12px] md:text-[16px]">
                You cant delete your own account
              </p>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
