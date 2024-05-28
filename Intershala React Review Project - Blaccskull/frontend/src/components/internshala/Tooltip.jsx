import React, { useRef } from "react";

const Tooltip = ({ children, tooltip }) => {
  const tooltipRef = useRef(null);
  const divRef = useRef(null);
  return (
    <div
      ref={divRef}
      className="group relative inline-block"
      // onMouseMove={({ clientX }) => {
      //   if (!tooltipRef.current || !divRef.current) return;
      //   const { left } = divRef.current.getBoundingClientRect();
      //   tooltipRef.current.style.left = clientX - left + "px";
      // }}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !divRef.current) return;
        const { left } = divRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + "px";
      }}
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible bg-gray-100 px-4 py-1.5 rounded-md absolute top-full -mt-14 whitespace-nowrap"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default Tooltip;
