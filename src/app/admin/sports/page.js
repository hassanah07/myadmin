"use client";
import Quicklink from "../../components/Quicklink";
import BlogCombine from "../../components/BlogCombine";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = ({ searchParams }) => {
  const { push } = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const dataLimit = 6;

  let currentPage = 1;

  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page);
  }
  // console.log(currentPage);
  // let offset = (currentPage - 1) * dataLimit;
  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/api/blogpost/sports?currentpage=${currentPage}&datalimit=${dataLimit}`;
    const response = await fetch(url, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setBlogs(data.blogposts);
    const totalData = data.totalItems;
    const totalPages = Math.ceil(totalData / dataLimit);
    let page = [];
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
      if (i < 1) continue;
      if (i > totalPages) break;
      page.push(i);
      setPageNumbers(page);
    }
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
  const nameThree = "sports";
  const linkThree = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/sports`;
  const myPage = "sports";
  useEffect(() => {
    fetchData();
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
      <BlogCombine blogs={blogs} pageNumbers={pageNumbers} myPage={myPage} />
    </>
  );
};

export default Page;
