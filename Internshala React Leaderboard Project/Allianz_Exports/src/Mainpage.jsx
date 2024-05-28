import React from "react";
import Sidebarv2 from "./components/sidebarv2";
import Table from "./components/table";

const Mainpage = () => {
  return (
    <>
      <section className="flex">
        <Sidebarv2 />
        <Table />
      </section>
    </>
  );
};

export default Mainpage;
