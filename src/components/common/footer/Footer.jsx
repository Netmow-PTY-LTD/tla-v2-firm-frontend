import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} TheLawApp. All rights
      reserved.
    </footer>
  );
}
