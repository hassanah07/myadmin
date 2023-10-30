"use client";
import Quicklink from "@/app/components/Quicklink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserCard = () => {
  // users count total, unverified, verified, deleted, suspended
  const [totalUser, setTotalUser] = useState(0);
  const [verifiedUser, setVerifiedUser] = useState(0);
  const [unverifiedUser, setUnverifiedUser] = useState(0);
  const [deletedUser, setDeletedUser] = useState(0);
  const [suspendedUser, setSuspendedUser] = useState(0);

  const publicUrl = process.env.NEXT_PUBLIC_HOST;
    
  const countUsers = async () => {
    let users = await fetch(`${publicUrl}/api/admin/usercount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adminToken")
      },
      body: JSON.stringify()
    });
    users = await users.json();
    setTotalUser(users.totalUsers);
    setVerifiedUser(users.verifiedUsers);
    setUnverifiedUser(users.unverifiedUsers);
    setDeletedUser(users.deletedUsers);
    setSuspendedUser(users.suspendedUsers);
  };
  useEffect(() => {
    countUsers();
  }, []);
  return (
    <>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {totalUser}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Total Users</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {verifiedUser}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Verified Users</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {unverifiedUser}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Unverified Users</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {deletedUser}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Deleted Users</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {suspendedUser}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Suspended Users</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
