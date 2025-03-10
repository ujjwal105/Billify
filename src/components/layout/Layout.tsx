import Footer from "../Footer";
import { ModeToggle } from "../mode-toggle";
import Navbar from "../Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="fixed top-4 right-4 z-50 hidden lg:block">
        <ModeToggle />
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}
