import React, { useState, useEffect } from "react";

// import your components

import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";

export default function Home() {
  return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left */}
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* <MetricGroup /> */}

          {/* <ChartOne /> */}
        </div>

        {/* Right */}
        <div className="col-span-12 xl:col-span-5">
          {/* <ChartTwo /> */}
        </div>

        {/* Chart 3 */}
        <div className="col-span-12">{/* <ChartThree /> */}</div>

        {/* Map */}
        <div className="col-span-12 xl:col-span-5">
          {/* <MapOne /> */}
        </div>

        {/* Table */}
        <div className="col-span-12 xl:col-span-7">
          {/* <TableOne /> */}
        </div>
      </div>

  );
}
