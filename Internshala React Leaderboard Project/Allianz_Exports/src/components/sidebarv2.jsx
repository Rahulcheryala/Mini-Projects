import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdAutoGraph } from "react-icons/md";
import { IoMdQrScanner } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { SiBasicattentiontoken } from "react-icons/si";
import { GiLevelThreeAdvanced } from "react-icons/gi";
import { MdPriceChange } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Links = [
  { name: "LeaderBoard", icon: <MdDashboard size={20} /> },
  { name: "Historical Trading", icon: <BsGraphUpArrow size={20} /> },
  { name: "Historical Chart", icon: <MdAutoGraph size={20} /> },
  { name: "Scanners", icon: <IoMdQrScanner size={20} /> },
  { name: "Alerts", icon: <IoAlertCircleOutline size={20} /> },
  { name: "Basic Backtest", icon: <SiBasicattentiontoken size={20} /> },
  { name: "Advanced Backtest", icon: <GiLevelThreeAdvanced size={20} /> },
  { name: "Pricing", icon: <MdPriceChange size={20} /> },
  { name: "My Earnings", icon: <RiMoneyDollarCircleFill size={20} /> },
];

const Sidebarv2 = () => {
  const [activeLink, setActiveLink] = useState("LeaderBoard");
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-screen transition-all duration-500 pt-16 ${
        expanded ? "w-80" : "w-16"
      }`}
    >
      <nav className={`h-full flex flex-col bg-white border-r shadow-sm pt-2`}>
        <div
          className={`px-2 py-2 flex justify-end items-center ${
            !expanded && "mx-auto"
          }`}
        >
          <button
            className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100"
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? (
              <FaChevronLeft size={20} />
            ) : (
              <FaChevronRight size={20} />
            )}
          </button>
        </div>

        <ul className="flex-1 flex-col px-1 space-y-1">
          {Links.map((link, index) => (
            <li
              key={index}
              onClick={() => setActiveLink(link.name)}
              className={`relative flex items-center p-1.5 mx-2 gap-2 font-medium rounded-md text-nowrap cursor-pointer transition-colors group
              ${
                activeLink === link.name
                  ? "bg-gradient-to-tr from-[#E27498]/50 to-[#E27498] text-gray-700"
                  : "hover:bg-[#E27498]/20 text-gray-600"
              }`}
            >
              <div className="p-1">{link.icon}</div>
              <span
                // style={{ transitionDelay: `${index + 3}00ms` }}
                className={`overflow-hidden px-1 transition-all duration-500 
                ${!expanded && "opacity-0 overflow-hidden translate-x-14"}`}
              >
                {link.name}
              </span>
              {!expanded && (
                <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[#E27498]/10 text-gray-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                  {link.name}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="border-t p-3 flex justify-between items-center ">
          <div className="p-1">
            <RxAvatar size={30} />
          </div>
          <div
            className={`overflow-hidden leading-4 transition-all ${
              !expanded && "opacity-0 overflow-hidden translate-x-28"
            }`}
          >
            <div className="">
              <h4 className="font-semibold">Rahul</h4>
              <span className="text-xs text-gray-600 text-ellipsis">
                rahulcheryala@gmail.com
              </span>
            </div>
          </div>
          <HiDotsVertical
            size={20}
            className="bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer p-0.5"
          />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebarv2;
