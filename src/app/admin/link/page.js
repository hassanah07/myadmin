"use client";
import { AdminLink } from "@/app/api/AdminLink";
import Quicklink from "@/app/components/Quicklink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { push } = useRouter();

  const tokenVerify = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      push('/');
    } else {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/tokenverify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("adminToken"),
          },
          body: JSON.stringify(),
        }
      );
      res = await res.json();
      if (res == false) {
        localStorage.removeItem("adminToken");
        push('/');
      }
    }
  };

  const nameOne = "dashboard";
  const linkOne = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/dashboard`;
  const nameTwo = "link";
  const linkTwo = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/link`;
  const nameThree = "My Contacts";
  const linkThree = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/contact`;
  const myPage = "career";
  useEffect(() => {
    tokenVerify();
  }, []);
  return (
    <>
      <Quicklink
        linkOne={linkOne}
        linkTwo={linkTwo}
        linkThree={linkThree}
        nameOne={nameOne}
        nameTwo={nameTwo}
        nameThree={nameThree}
      />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {AdminLink.map((item) => {
              return (
                <div className="xl:w-1/4 md:w-1/2 p-4" key={item.id}>
                  <Link href={item.link}>
                    <div className="border border-gray-200 p-6 rounded-lg bg-purple-300 shadow-2xl hover:bg-purple-400">
                      <button className="text-black capitalize font-semibold">
                        {item.name}
                      </button>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
