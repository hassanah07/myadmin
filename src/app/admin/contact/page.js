"use client"
import Quicklink from "@/app/components/Quicklink";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { push } = useRouter();

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
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("adminToken"),
          },
          body: JSON.stringify(),
        }
      );
      res = await res.json();
      if (res == false) {
        localStorage.removeItem("adminToken");
        push("/");
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
    </>
  );
};

export default Page;
