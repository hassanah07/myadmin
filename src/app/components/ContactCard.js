"use client";
import Quicklink from "@/app/components/Quicklink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ContactCard = () => {
  // contact counters count
  const [totalContact, setTotalContact] = useState(0);
  const [approvedContact, setApprovedContact] = useState(0);
  const [pendingContact, setPendingContact] = useState(0);
  const [pendingTalk, setPendingTalk] = useState(0);
  const [approvedTalk, setApprovedTalk] = useState(0);

  const publicUrl = process.env.NEXT_PUBLIC_HOST;

  const contactCount = async () => {
    let contact = await fetch(`${publicUrl}/api/admin/contactcount`, {
      method: "POST",
      headers: {
        cache: "no-cache",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adminToken")
      },
      body: JSON.stringify()
    });
    contact = await contact.json();
    setTotalContact(contact.totalContact);
    setApprovedContact(contact.approvedcontact);
    setPendingContact(contact.pendingcontact);
    setApprovedTalk(contact.approvedtalk);
    setPendingTalk(contact.pendingtalk);
  };
  useEffect(() => {
    contactCount();
  }, []);
  return (
    <>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {totalContact}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Talks And Contact</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {approvedContact}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Approved Contact</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {pendingContact}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Pending Contact</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {pendingTalk}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Approved Talks</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {approvedTalk}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Pending Talks</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
