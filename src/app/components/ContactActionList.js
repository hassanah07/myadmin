import Link from "next/link";
import React from "react";
import Pagenumber from "./Pagenumber";

const ContactActionList = ({ contact }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {Object.keys(contact).map((item) => {
        return (
          <Link
            href={`${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/action/actioncontact/${contact[item]._id}`}
            key={contact[item]._id}
            className="xl:w-1/3 md:w-1/2 p-4"
          >
            <div className="border border-gray-500 p-6 rounded-lg hover:bg-pink-600 text-black dark:text-slate-200 text-justify">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-700 text-pink-100 mb-4">
                <span>ic</span>
              </div>
              <h2 className="text-lg text-gray-900 dark:text-slate-200 font-medium title-font mb-2">
                {contact[item].name}
              </h2>
              <p className="leading-relaxed text-base">{contact[item].email}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ContactActionList;
