import Image from "next/image";

import { FaInstagram, FaGithub } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="text-gray-400 bg-background">
      <div className="px-10 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <Image src="/logo.svg" width={20} height={20} alt="Logo" />
          <span className="ml-3 text-xl">Prometheus</span>
        </a>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2024 Semideus —
          <a
            href="https://github.com/semideus-dev"
            className="text-gray-500 ml-1 font-mono"
            target="_blank"
            rel="noopener noreferrer"
          >
            @semideus.dev
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-400">
            <FaInstagram />
          </a>
          <a className="ml-3 text-gray-400">
            <FaGithub />
          </a>
        </span>
      </div>
    </footer>
  );
}
