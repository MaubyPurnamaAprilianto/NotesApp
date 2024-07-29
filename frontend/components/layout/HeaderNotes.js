import Link from "next/link";
import React, { useState } from "react";

const HeaderNotes = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                href="/"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
              >
                Dashboard
              </Link>
              {/* Uncomment and add your links here */}
              {/* <Link href="/about" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About</Link>
              <Link href="/projects" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</Link>
              <Link href="/calendar" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</Link> */}
            </div>
          </div>
          <div className="hidden sm:flex relative ml-3 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="block rounded-md bg-gray-700 text-white py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              className="flex items-center rounded-md bg-blue-600 text-white py-2 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Search</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleProfileMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              <div
                className={`${
                  isProfileMenuOpen ? "block" : "hidden"
                } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Dashboard
            </Link>
          </div>
          <div className="relative mt-2 flex items-center space-x-2 px-2 pb-3 pt-2">
            <input
              type="text"
              placeholder="Search..."
              className="block w-full rounded-md bg-gray-700 text-white py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              className=" right-0 mr-2 flex items-center rounded-md bg-blue-600 text-white py-2 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Search</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          {/* Uncomment and add your links here */}
          {/* <Link href="/about" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About</Link>
          <Link href="/projects" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</Link>
          <Link href="/calendar" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default HeaderNotes;
