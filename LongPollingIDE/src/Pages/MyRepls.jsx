import React from "react";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
  Home,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const MyRepls = () => {
  return (
    <div className="bg-gradient-to-r  from-gray-800 from via-gray-800  to-gray-800  w-full flex">
      <aside className="flex h-screen w-[15%] flex-col overflow-y-auto border-r-2 border-[#d9480f]  bg-transparent px-5 py-8">
        <button className="font-bold text-md flex items-center gap-1 border-2 w-40 px-2 py-1 text-white hover:text-gray-900 hover:bg-white duration-300 hover:rounded-lg">
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="2.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width={20}
            className="ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            ></path>
          </svg>
          <div>Create Repl</div>
        </button>

        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              {/* <label className="px-3 text-xs font-semibold uppercase text-white">
                analytics
              </label> */}
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                to="/landingpage"
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Home</span>
              </NavLink>
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to="/myrepls"
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">My Repls</span>
              </NavLink>
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to="/deployments"
              >
                <Newspaper className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Deployments</span>
              </NavLink>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <BellRing className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Notifications</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Paperclip className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Usages</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Wrench className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Teams</span>
              </a>
            </div>
            <div className="space-y-3 ">
              {/* <label className="px-3 text-xs font-semibold uppercase text-white">
                content
              </label> */}
            </div>

            {/* <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-white">
                Customization
              </label>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Brush className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Themes</span>
              </a>
              <a
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Wrench className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Setting</span>
              </a>
            </div> */}
          </nav>
        </div>
      </aside>
      <div className="h-screen w-[85%] ">
        <div className="text-white  text-4xl  mt-20 ml-40">
          <div>My Repls</div>
        </div>
        <div className="flex gap-2 ">
          <button className="font-bold text-md flex items-center gap-1  ml-40 mt-8 w-40 px-2 py-1 text-white bg-[#d9480f] hover:text-gray-900 hover:bg-white duration-300 hover:rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>

            <div>New Folder</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRepls;
