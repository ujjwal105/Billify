import Footer from "../Footer";
import { ModeToggle } from "../mode-toggle";
import Navbar from "../Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-end sticky top-4 px-4">
        <ModeToggle />
      </div>

      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
}
