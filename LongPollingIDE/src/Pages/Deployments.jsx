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

const Deployments = () => {
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
          <div>Deployments</div>
        </div>

        <div className="flex gap-3  w-[70%]  ml-40 mt-8 px-6 py-4 text-white bg-gray-900 border-2 border-[#d9480f]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 mt-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <div>
            <div className="text-lg">No Deployments yet</div>
            <p className="text-md text-gray-300">
              But we have good news: you're one click away from changing that
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployments;
