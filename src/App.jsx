// app1/src/App.js
import React, { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./index.css";
import "mainApp/styles";
const SharedNotFound = lazy(() => import("mainApp/NotFound"));

const App = ({ basePath = "" }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* App1 Navbar */}
      <nav className="bg-gray-100 rounded-t-lg">
        <div className="px-4">
          <div className="flex h-14">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h2 className="text-lg font-semibold text-red-700">App 1</h2>
              </div>
              <div className="ml-6 flex space-x-4">
                <NavLink
                  to={`${basePath}`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-white text-gray-900"
                        : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    } px-3 py-2 rounded-md text-sm font-medium`
                  }
                  end
                >
                  Home
                </NavLink>
                <NavLink
                  to={`${basePath}/about`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-white text-gray-900"
                        : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    } px-3 py-2 rounded-md text-sm font-medium`
                  }
                >
                  About
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              index
              element={
                <div>
                  <h3 className="text-xl font-semibold mb-4">App1 Home Page</h3>
                  <p className="text-gray-600">Welcome to App1's home page.</p>
                </div>
              }
            />
            <Route
              path="about"
              element={
                <div>
                  <h3 className="text-xl font-semibold mb-4">About App1</h3>
                  <p className="text-red-600">This is App1's about page.</p>
                </div>
              }
            />
            <Route path="*" element={<SharedNotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
