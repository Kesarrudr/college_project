import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b-2 border-[#d9480f]">
      <div className="flex px-2  py-3 bg-gradient-to-r from-gray-900 from via-gray-900  to-gray-900 items-center">
        <h1 className="font-bold gap-2 flex items-center text-4xl mr-[40rem] ml-4 hover:cursor-pointer text-white ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="orangered"
            className="w-8 h-8 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
            />
          </svg>{" "}
          Evolution
        </h1>
        <ul className="flex flex-wrap w-full  justify-between items-center p-5 mr-5 ">
          <li className="font-bold text-white border-gray-500 px-3 py-1 hover:text-[#d9480f] duration-500 rounded-md">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className=" font-bold text-white border-white px-3 py-1 hover:text-[#d9480f] duration-500 rounded-md">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className=" font-bold text-white border-white px-3 py-1 hover:text-[#d9480f] duration-500 rounded-md ">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li className=" font-bold  text-white border-white border-2 px-3 py-1  hover:border-[#d9480f]  active:bg-[#d9480f] focus:outline-none focus:ring focus:ring-purple-300 duration-500 rounded-md">
            <NavLink to="/signin">Sign In</NavLink>
          </li>
          <li className=" font-bold  text-white border-white border-2 px-3 py-1  hover:border-[#d9480f]  active:bg-[#d9480f] focus:outline-none focus:ring focus:ring-purple-300 duration-500 rounded-md">
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
