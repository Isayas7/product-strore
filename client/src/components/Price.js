import React from "react";

function Price() {
  return (
    <div className="bg-white rounded-md h-fit p-3">
      <h3>Price, ETB</h3>
      <div className=" flex gap-5 mt-1  ">
        <div className=" relative border border-slate-600  p-1 rounded-md">
          <input className="focus:outline-none mt-4 px-2 pt-1 w-1/3 " />
          <label className=" absolute left-0 px-2 font-thin">max</label>
        </div>
        <div className=" relative border border-slate-600  p-1 rounded-md">
          <input className="focus:outline-none mt-4 px-2 pt-1 w-1/3  " />
          <label className=" absolute left-0 px-2 font-thin ">max</label>
        </div>
      </div>
      <div className="flex flex-col ">
        <div>
          <input type="radio" />
        </div>
        <div>
          <input type="radio" />
        </div>
        <div>
          <input type="radio" />
        </div>
        <div>
          <input type="radio" />
        </div>
      </div>
    </div>
  );
}

export default Price;
