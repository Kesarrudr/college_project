import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      {" "}
      <div className="relative w-full bg-gray-100 ">
        <div>
          <div className="flex items-center  h-[100vh] mt-[-5rem] gap-16 justify-center px-4 py-10  pt-12  bg-gray-900">
            <div className="w-[70%]">
              <div className="ml-20 ">
                <div className="inline-flex items-center">
                  <svg
                    width="40"
                    height="46"
                    viewBox="0 0 50 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                      fill="#fff"
                    />
                  </svg>
                  <span className="ml-4 text-2xl font-bold text-white">
                    Long Polling IDE
                  </span>
                </div>
                <div>
                  <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
                    Integrated development environment with support for long
                    polling technology
                  </h1>
                  <p className="mt-8 max-w-3xl text-lg text-gray-400">
                    Long polling is a technique used in web development to
                    simulate real-time updates by continuously polling the
                    server for new information. In a Long Polling IDE,
                    developers can write, edit, and run code in various
                    programming languages within a web-based environment.
                  </p>
                  <div className="mt-8">
                    <NavLink
                      to="landingpage"
                      type="button"
                      className="rounded-md bg-[#d9480f] px-6 py-4 text-md font-semibold text-white shadow-sm hover:bg-gray-800 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Start Building &rarr;
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <img
                src="https://icones.pro/wp-content/uploads/2022/10/icone-robot-orange.png"
                alt=""
              />
            </div>
          </div>

          <div className="h-[55vh] w-[90%] flex  justify-between mx-auto mt-[10rem]  rounded-lg  ">
            <div
              className="w-[50%] bg-[#d9480f] rounded-lg "
              data-aos="fade-up"
            >
              <video
                src="https://cdn.replit.com/dotcom/c2d906bc-f1f5-11ee-a951-0242ac120002.mp4"
                autoPlay
                loop
                muted
                className="rounded-lg  w-[90%] mt-7  mx-auto"
              ></video>
            </div>
            <div
              className="w-[25%] bg-gray-100 p-4 rounded-lg shadow-lg"
              data-aos="fade-down"
            >
              <h1 className="text-xl font-bold mb-2 text-[#d9480f]">
                {" "}
                A computer for every idea
              </h1>{" "}
              <p className="text-gray-700">
                With instant environments, you get access to a computer for
                every branch, idea, or feature. Fork existing projects, start
                new projects, and context-switch quickly. It takes only a few
                seconds to fork and run large codebases that work on everyone's
                machine.
              </p>
            </div>
            <div className="w-[20%] text-center font-bold text-xl text-[#d9480f] py-4 shadow-lg flex flex-col  rounded-lg justify-between bg-gray-100">
              <div data-aos="fade-left">C++</div>
              <div data-aos="fade-right">Java</div>
              <div data-aos="fade-left">Python</div>
              <div data-aos="fade-right">React</div>
              <div data-aos="fade-left">Html</div>
              <div data-aos="fade-right">CSS</div>
            </div>
          </div>

          <div
            className="rounded-lg mt-[10rem] max-w-7xl mx-auto bg-gray-100 p-4 "
            data-aos="fade-up"
          >
            <img
              className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-cover lg:aspect-auto lg:h-[400px]"
              src="https://wallpaperaccess.com/full/1650990.jpg"
              alt=""
            />{" "}
          </div>
        </div>

        <div className="  bg-gradient-to-b mt-40  from-gray-100  from   to-gray-100 ">
          <div
            className=" items-center gap-1 mx-auto max-w-3xl  text-center"
            data-aos="fade-up"
          >
            <svg
              width="80"
              height="86"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-xl mx-auto"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="#212529"
              />
            </svg>
            <h1 className="text-3xl font-bold tracking-tight mt-4 text-[#212529] md:text-4xl lg:text-7xl">
              One environment for the whole team.
            </h1>
            <p className="mt-12 max-w-3xl text-2xl text-gray-700">
              {" "}
              Get always consistent development environments that boost
              productivity and empower collaboration.
            </p>
          </div>
          <div
            className="flex text-[#212529] justify-between mt-28 mx-auto max-w-7xl gap-5 text-center  "
            data-aos="fade-up"
          >
            <div data-aos="fade-up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="#212529"
                className="w-[8rem] mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                />
              </svg>
              <h1 className="text-xl font-bold mb-2">Faster than local</h1>
              <p>
                Get rid of slow build times and time lost in context-switching.
                Our powerful VMs run your code up to 200x faster than local and
                resume any project in 2 seconds.
              </p>
            </div>
            <div data-aos="fade-up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="#212529"
                class="w-[8rem] mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <h1 className="text-xl font-bold mb-2 ">
                Works on everyone’s machine
              </h1>
              <p>
                Instead of putting each developer's machine in the cloud, we run
                each branch on a centralized CDE that gives everyone the same
                experience.
              </p>
            </div>
            <div data-aos="fade-up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="#212529"
                class="w-[8rem] mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <h1 className="text-xl font-bold mb-2">Collaborative 24/7</h1>
              <p>
                Evolution is fully collaborative IDE. Your entire team can
                connect to the same environment and code live, together,
                anytime.
              </p>
            </div>
            <div data-aos="fade-up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="#212529"
                class="w-[8rem]  mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <h1 className="text-xl font-bold mb-2">Reliable and secure</h1>
              <p>
                We keep your code always private and secure. You get flexible
                permissions, access control, security monitoring, private npm,
                and more.
              </p>
            </div>
          </div>

          <div className="mt-28 text-center " data-aos="fade-up">
            <div className="h-[35rem] bg-gradient-to-b pt-12   from-black from via-black  to-gray-900">
              <h1 className="text-3xl font-bold tracking-tight mx-auto max-w-3xl  text-center text-[#212529] md:text-4xl lg:text-7xl">
                Join the future of building
              </h1>
              <button className="rounded-md bg-[#d9480f] px-6 py-4 w-44 my-12 mx-[44%] text-md font-semibold text-white shadow-sm hover:bg-gray-800 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Start for free
              </button>
              <button
                href=""
                className=" hover:underline text-white text-md hover:text-gray-400"
              >
                Request demo &rarr;
              </button>
            </div>
            <img
              src="https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage.4a712740.png&w=3840&q=75"
              alt=""
              className="bg-gradient-to-t pt-12   from-black from via-black  to-gray-900"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
