import Navbar from "../Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-green-100 to-violet-100">
      <Navbar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <p className="text-sm p-5 font-semibold text-center text-gray-500 ">
        Developed by
        <a
          href="https://github.com/ujjwal105/Billify"
          target="_blank"
          className="pl-2"
        >
          Ujjwal Tyagi
        </a>
      </p>
    </div>
  );
}
