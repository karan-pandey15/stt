import React from "react";


const GridExample = () => {
  const colors = ["bg-[#FFF0DD]", "bg-[#FFDEC2]", "bg-[#F6D4BE]", "bg-[#F9E6CF]", "bg-[#E8C0A9]", "bg-[#C9A68C]", "bg-[#E6C8A8]", null,"bg-[#E9CBB6]","bg-[#D8BBA2]","bg-[#E3E8E1]","bg-[#C6E2DF]","bg-[#AFCFD8]","bg-[#8BB8C1]","bg-[#4E7F95]","bg-[#ffe0e9]"];

  return (
    <div className="grid grid-cols-2 grid-rows-8 h-screen">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`${color} flex items-center justify-center text-white font-bold`}
          style={color === null ? {backgroundColor: "var(--theme-color)"} : {}}
        >
          Cell {index + 1}
        </div>
      ))}
    </div>
  );
};

export default GridExample;
