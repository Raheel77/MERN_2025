import React, { useState, useEffect } from "react";

// import your components

import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  // load dark mode
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("darkMode"));

    if (saved) setDarkMode(saved);
  }, []);

  // save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark bg-gray-900" : ""}>
      {/* Page Wrapper */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />

        {/* Content Area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {/* Overlay */}
          {/* <Overlay
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          /> */}

          {/* Header */}
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />

          {/* Main */}
          <main>
            <div className="p-4 mx-auto max-w-[1440px] md:p-6">
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
