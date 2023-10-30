"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
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
  const handleClick = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    res = await res.json();
    localStorage.setItem("adminToken", res.adminToken);
    if (res.type == "success") {
      toast.success(res.msg, toastOption);
      setEmail("");
      setPassword("");
      // push("/admin/dashboard");
      location.reload();
    } else {
      toast.error(res.msg, toastOption);
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      setEmail("");
      setPassword("");
      push("/admin/dashboard");
    } else {
      setEmail("");
      setPassword("");
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen items-center justify-center bg-purple-400">
        <div className="md:w-[50%] bg-purple-500 shadow-2xl rounded-xl border-l-fuchsia-800">
          <div className="card">
            <div className="cardHead py-5 text-center">
              <h1 className="font-bold text-2xl">Council Login</h1>
              <hr />
            </div>
            <div className="cardbody py-5 bg-purple-300">
              <div className="flex py-2 px-8">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className="text-black py-2 px-4 w-full"
                  placeholder="User Name"
                />
              </div>
              <div className="flex py-2 px-8">
                {/* <FaKey className="font-bold text-4xl border-red-700 w-fit p-2 h-fit bg-purple-400 text-red-700" /> */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  className="text-black py-2 px-4 w-full"
                  placeholder="Enter Password"
                />
              </div>
              <div className="flex-col py-6 px-8">
                <button
                  className="hover:text-black text-slate-200 bg-red-600 hover:bg-purple-200 py-2 px-4 w-full hover:shadow-2xl font-bold text-lg"
                  onClick={handleClick}
                >
                  Validate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
