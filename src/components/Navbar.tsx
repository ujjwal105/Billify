import { Globe } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 mt-4 w-full max-w-screen-lg mx-auto px-4">
      <div className="min-w-md border rounded-md shadow p-2 backdrop-blur-3xl bg-white dark:bg-zinc-700">
        <div className="flex items-center justify-between px-6">
          <img
            src="/billify-logo.png"
            alt="Billify Icon"
            className="w-12 h-10 cursor-pointer"
          />
          <p className="text-lg font-semibold">Billify</p>
          <Globe
            className="cursor-pointer hover:opacity-75 text-gray-700 dark:text-gray-300"
            size={24}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
