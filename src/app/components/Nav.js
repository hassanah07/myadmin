"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/Gi";
import { AiOutlineCloseCircle } from "react-icons/Ai";
import Image from "next/image";
import { nav } from "../api/Nav";
import { AdminNav } from "../api/AdminNav";
import { useRouter } from "next/navigation";
import logo from "../../../public/icon.png";

const Nav = () => {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setUser({ value: token });
    }
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setUser({ value: null });
    router.push("/");
  };
  const [toggleNav, setToggleNav] = useState(true);
  const ref = useRef();
  return (
    <>
      {!user.value && (
        <div className="flex h-16">
          <nav className="py-4">
            <Link href="/adminlogin" className="flex" as={"/"}>
              <span className="font-extrabold text-pink-600 text-2xl mt-1 uppercase shadow-2xl">
                System Controller
              </span>
            </Link>
          </nav>

          <nav
            ref={ref}
            className={
              toggleNav === true
                ? "absolute top-0 right-0  z-40 md:bg-transparent md:block hidden"
                : "absolute top-0 right-0  z-40 md:bg-transparent md:block"
            }
          >
            <ul className="py-14 md:py-4 md:flex px-2 md:bg-transparent md:w-auto w-48 md:rounded-none rounded-bl-lg">
              {nav.map((currElen, index) => {
                return (
                  <Link
                    href="/adminlogin"
                    className="px-2"
                    key={currElen.id}
                    onClick={() => {
                      setToggleNav(true);
                    }}
                  >
                    <li className="font-semibold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                      Admin Login
                    </li>
                    <hr className="md:hidden" />
                  </Link>
                );
              })}
            </ul>
            <AiOutlineCloseCircle
              className="absolute top-3 right-3 text-3xl text-white cursor-pointer md:hidden"
              onClick={() => {
                setToggleNav(true);
              }}
            />
          </nav>

          <div
            className="hamburgerManu absolute top-2 right-2 z-20 cursor-pointer md:hidden"
            onClick={() => {
              setToggleNav(false);
            }}
          >
            <GiHamburgerMenu className="text-5xl text-pink-800" />
          </div>
        </div>
      )}
      {user.value && (
        <div className="">
          <nav
            ref={ref}
            className={
              toggleNav === true
                ? "absolute top-0 right-0  z-40 hidden"
                : "absolute top-0 right-0  z-40"
            }
          >
            <ul className="py-14 px-4 bg-pink-400 dark:bg-purple-500 w-48 rounded-bl-lg">
              {AdminNav.map((currElen, index) => {
                return (
                  <Link
                    href={currElen.link}
                    className="px-2"
                    key={currElen.id}
                    onClick={() => {
                      setToggleNav(true);
                    }}
                  >
                    <li className="font-semibold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                      {currElen.name}
                    </li>
                    <hr className="" />
                  </Link>
                );
              })}
              <li className="font-semibold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
            <AiOutlineCloseCircle
              className="absolute top-3 right-3 text-3xl text-white cursor-pointer"
              onClick={() => {
                setToggleNav(true);
              }}
            />
          </nav>

          <div
            className="hamburgerManu absolute top-2 right-2 z-20 cursor-pointer"
            onClick={() => {
              setToggleNav(false);
            }}
          >
            <div className="cursor-pointer" title="Log Out">
              <GiHamburgerMenu
                className="text-5xl text-pink-800"
                title="Log Out"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
