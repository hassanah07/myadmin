"use client";
import Quicklink from "@/app/components/Quicklink";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import { MdOutlineWarning, MdAssignmentReturned } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({ params }) => {
  const [oneContact, setOneContact] = useState([]);
  const { push } = useRouter();
  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  };

  const tokenVerify = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      push("/");
    } else {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/tokenverify`,
        {
          method: "POST",
          headers: {
            cache: "no-cache",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("adminToken")
          },
          body: JSON.stringify()
        }
      );
      res = await res.json();
      if (res == false) {
        localStorage.removeItem("adminToken");
        push("/");
      }
    }
  };
  const contact = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/contactwithid`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ id: params.id })
      }
    );
    const view = await data.json();
    console.log(view);
    setOneContact(view);
  };

  const approval = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/contactapproval`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ id: params.id })
      }
    );
    res = await res.json();
    if (res.status == true) {
      toast.success(res.msg, toastOption);
      // push("/admin/action/pending");
    } else {
      toast.error(res.msg, toastOption);
    }
  };
  const revert = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/contactrevert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ id: params.id })
      }
    );
    res = await res.json();

    if (res.status == true) {
      toast.success(res.msg, toastOption);
      // push("/admin/action/pending");
    } else {
      toast.error(res.msg, toastOption);
    }
  };
  const permanentDelete = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/contactdelete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ id: params.id })
      }
    );
    res = await res.json();
    if (res.status == true) {
      toast.success(res.msg, toastOption);
      // push("/admin/action/pending");
    } else {
      toast.error(res.msg, toastOption);
    }
  };

  useEffect(() => {
    contact();
    tokenVerify();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="pb-14 text-gray-600 body-font bg-green-100 dark:bg-slate-800">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg dark:text-slate-100">
                    {oneContact.name}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base dark:text-pink-500 text-justify capitalize">
                    {oneContact.message}
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <ul className="leading-relaxed text-lg mb-4 capitalize">
                  <li className="dark:text-slate-100">Mobile No :</li>
                  <li className="dark:text-pink-500">{oneContact.mobile}</li>
                  <li className="dark:text-slate-100">Email :</li>
                  <li className="dark:text-pink-500">{oneContact.email}</li>
                  <li className="dark:text-slate-100">Contact Status :</li>
                  <li className="dark:text-pink-500">{oneContact.status}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-5 bg-transparent flex flex-wrap items-center justify-center">
        <button className="bg-purple-300 text-slate-300 mx-4 px-5 py-3 rounded-xl">
          <FaCheckSquare
            className="text-5xl text-pink-900 font-semibold"
            title="Approve"
            onClick={approval}
          />
        </button>
        <button className="bg-purple-300 text-slate-300 mx-4 px-5 py-3 rounded-xl">
          <MdAssignmentReturned
            className="text-5xl text-pink-900 font-semibold"
            title="Revert"
            onClick={revert}
          />
        </button>
        <button className="bg-purple-300 text-slate-300 mx-4 px-5 py-3 rounded-xl">
          <FaTrashAlt
            className="text-5xl text-pink-900 font-semibold"
            title="Delete"
            onClick={permanentDelete}
          />
        </button>
      </div>
    </>
  );
};

export default Page;
