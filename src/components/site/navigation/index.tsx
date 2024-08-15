import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

// function Header() {
//   return (
//     <header className="py-2 w-full text-center bg-blue-400 text-white font-medium text-sm">
//       <p>Beta releases coming out 2025!</p>
//     </header>
//   );
// }

export default function Navigation() {
  return (
    <div className="sticky top-0 z-50">
      {/* <Header /> */}
      <div className="hidden md:flex">
        <DesktopNavbar />
      </div>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}
