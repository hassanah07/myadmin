"use client";
import BlogCard from "@/app/components/BlogCard";
import ContactCard from "@/app/components/ContactCard";
import Quicklink from "@/app/components/Quicklink";
import UserCard from "@/app/components/UserCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { push } = useRouter();

  const publicUrl = process.env.NEXT_PUBLIC_HOST;

  const tokenVerify = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      push("/");
    } else {
      let res = await fetch(`${publicUrl}/api/admin/tokenverify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify()
      });
      res = await res.json();
      if (res == false) {
        localStorage.removeItem("adminToken");
        push("/");
      }
    }
  };

  const nameOne = "Blogs";
  const linkOne = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/link`;
  const nameTwo = "Users";
  const linkTwo = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/users`;
  const nameThree = "Contacts";
  const linkThree = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/contacts/lists`;
  useEffect(() => {
    tokenVerify();
    if (!localStorage.getItem("adminToken")) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <h1 className="font-bold text-xl">404| Page Not Found</h1>
        </div>
      );
    }
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
            <BlogCard />
            <UserCard />
            <ContactCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
