import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { LOGO_ALT, LOGO_SVG_PATH } from "../../../utils/constants";
import { Button } from "../../ui/button";

export default function DesktopNavbar() {
  return (
    <div className="flex mt-6 items-center justify-between bg-gray-200 mx-auto px-2 py-2 rounded-full max-w-xl w-full">
      <aside>
        <Link to={ROUTES.SITE} className="flex items-center gap-2">
          <img src={LOGO_SVG_PATH} alt={LOGO_ALT} height={40} width={40} />
          <span className="text-xl font-bold">Parpics.</span>
        </Link>
      </aside>
      <aside className="flex items-center gap-6 px-1">
        <Link to={ROUTES.PRICING}>
          <span className="font-medium">Pricing</span>
        </Link>
        <a href={ROUTES.LOGIN}>
          <span className="font-medium">Log in</span>
        </a>
        <Button className="rounded-full bg-black">Join for free</Button>
      </aside>
    </div>
  );
}
