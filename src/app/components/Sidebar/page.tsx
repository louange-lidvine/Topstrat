import React, { Children } from "react";

function Sidebar() {
  return (
      <body className="flex items-center">
          <div className="flex h-screen  text-white">
              <div className="flex-shrink-0 w-64 bg-blue-800 p-5">
                  <h2 className="text-xl font-semibold">Sidebar</h2>
                  <a href="#" className="block mt-4 text-lg">
                      Home
                  </a>
                  <a href="#" className="block mt-4 text-lg">
                      Students
                  </a>
                  <a href="#" className="block mt-4 text-lg">
                      Settings
                  </a>
              </div>

            
          </div>
         
      </body>
  );
}

export default Sidebar;
