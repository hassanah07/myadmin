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
  const [oneProfile, setOneProfile] = useState([]);
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
  const profile = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/userwithid`,
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
    setOneProfile(view);
  };

  const approval = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/userapproval`,
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
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/userrevert`,
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

  const withdraw = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/userwithdraw`,
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
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/userdelete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ blogId: params.id })
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
    profile();
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
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <Image
                    src={oneProfile.image}
                    alt="profile_image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg dark:text-slate-100">
                    {oneProfile.name}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base dark:text-pink-500 text-justify capitalize">
                    {oneProfile.desc}
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <ul className="leading-relaxed text-lg mb-4 capitalize">
                  <li className="dark:text-slate-100">Name :</li>
                  <li className="dark:text-pink-500">{oneProfile.name}</li>
                  <li className="dark:text-slate-100">Email :</li>
                  <li className="dark:text-pink-500">{oneProfile.email}</li>
                  <li className="dark:text-slate-100">Mobile :</li>
                  <li className="dark:text-pink-500">{oneProfile.mobile}</li>
                  <li className="dark:text-slate-100">Role :</li>
                  <li className="dark:text-pink-500">{oneProfile.role}</li>
                  <li className="dark:text-slate-100">Updated At :</li>
                  <li className="dark:text-pink-500">{oneProfile.updatedAt}</li>
                  <li className="dark:text-slate-100">Profile Level :</li>
                  <li className="dark:text-pink-500">
                    {oneProfile.level}(No Monetization)
                  </li>
                  <li className="dark:text-slate-100">Profile Status :</li>
                  <li className="dark:text-pink-500">{oneProfile.status}</li>
                  <li className="dark:text-slate-100">
                    <Link href={`/admin/profile/${oneProfile._id}`}>
                      <button className="px-4 py-2 bg-red-500 hover:bg-yellow-500">
                        Change Password
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-5 bg-inherit flex flex-wrap items-center justify-center">
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
          <MdOutlineWarning
            className="text-5xl text-pink-900 font-semibold"
            title="Withdraw"
            onClick={withdraw}
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
