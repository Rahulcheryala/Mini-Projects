import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import data from "./data.json";

const Headers = [
  "Rank",
  "Name",
  "Calmar Ratio",
  "Overall Profit",
  "Avg. Daily Profit",
  "Win %(Day)",
  "Price (Rs)",
  "Action",
];

const Table = () => {
  return (
    <section className="relative flex justify-center items-center overflow-x-auto h-screen w-full pt-16">
      <div className="border-2 border-gray-400 rounded-lg w-full mx-32 shadow-md p-1">
        <table className="w-full text-sm text-gray-500 rounded-lg">
          <thead className="text-xs bg-gray-50">
            <tr className="h-10 text-gray-500 font-thin">
              {Headers.map((header, index) => (
                <th key={index}>{header} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b border-gray-400 text-center hover:bg-[#FFFFF0]"
              >
                <td className="px-6 py-4">{item.Rank}</td>
                <td className="px-6 py-4 text-left w-60">
                  <span className="text-nowrap whitespace-nowrap">
                    {item.Name}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center items-center">
                  <AiOutlineStock size={20} className="text-green-500" />
                  {item.Calmar_Ratio}
                </td>
                <td className="px-6 py-4">{item.Overall_Profit}</td>
                <td className="px-6 py-4">{item.Avg_Daily_Profit}</td>
                <td className="px-6 py-4">{item["Win%(Day)"]}</td>
                <td className="px-6 py-4">{item["Price(Rs)"]}</td>
                <td className="px-6 py-4">{item.Action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
