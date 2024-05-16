// import React, { useRef } from "react";

// const Tooltip = ({ children, tooltip }) => {
//   const tooltipRef = useRef(null);
//   const divRef = useRef(null);
//   const spanRef = useRef(null);

//   const handleMouseEnter = ({ clientX }) => {
//     if (!tooltipRef.current || !divRef.current) return;
//     const divRect = divRef.current.getBoundingClientRect();
//     const spanRect = spanRef.current.getBoundingClientRect();
//     var value = clientX - spanRect.left + "px";
//     value = parseFloat(value);
//     // console.log(value);
//     tooltipRef.current.style.left =
//       value > 800 ? value - 400 + "px" : value + "px";
//     console.log(tooltipRef.current.style.left);
//   };
//   // ({ clientX }) => {
//   //   // console.log(clientX);
//   //   if (!tooltipRef.current || !divRef.current) return;
//   //   const divRect = divRef.current.getBoundingClientRect();
//   //   tooltipRef.current.style.left = clientX - divRect.left + "px";
//   //   // console.log(tooltipRef.current.style.left);
//   //   console.log(
//   //     parseFloat(tooltipRef.current?.style.left) > 1000
//   //       ? parseFloat(tooltipRef.current.style.left) - 200 + "px"
//   //       : "nooooo"
//   //   );
//   // }
//   return (
//     <div ref={divRef} className="group relative inline w-auto border-2 ">
//       <span
//         ref={spanRef}
//         className="border-red-500 border-2 group relative"
//         onMouseEnter={handleMouseEnter}
//       >
//         {children}
//       </span>

//       {tooltip ? (
//         <span
//           ref={tooltipRef}
//           className="invisible group-hover:visible bg-gray-100 px-4 py-1.5 rounded-md absolute -top-10 whitespace-nowrap shadow-md transition duration-200 ease-in-out text-gray-900/80 font-semibold text-md font-montserrat z-10 w-auto"
//         >
//           {tooltip}
//         </span>
//       ) : null}
//     </div>
//   );
// };

// export default Tooltip;

import React from "react";

const Tooltip = ({ children, tooltip }) => {
  return (
    <div className="group relative inline w-auto border-2 ">
      {children}

      {tooltip ? (
        <span
          className="invisible group-hover:visible bg-gray-100 px-4 py-1.5 rounded-md absolute -top-10 whitespace-nowrap shadow-md transition duration-200 ease-in-out text-gray-900/80 font-semibold text-md font-montserrat z-10 w-auto"
          style={{ left: "60px" }}
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default Tooltip;
