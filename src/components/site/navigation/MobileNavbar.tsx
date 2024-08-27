import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { LOGO_ALT, LOGO_SVG_PATH } from "../../../utils/constants";
import { useCurrentUser } from "../../../utils/useCurrentUser";
import { IconMenu } from "@tabler/icons-react";

export default function MobileNavbar() {
  const user = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full px-6 mt-2 flex flex-col">
      <div className="flex items-center px-2 py-1 md:py-2 mb-10 sm:mb-0 justify-between bg-gray-200 w-full rounded-full">
        <aside>
          <Link to={ROUTES.SITE} className="flex items-center gap-2">
            <img
              src={LOGO_SVG_PATH}
              alt={LOGO_ALT}
              height={40}
              width={40}
              className="hidden md:block"
            />
            <img
              src={LOGO_SVG_PATH}
              alt={LOGO_ALT}
              height={30}
              width={30}
              className="md:hidden"
            />
          </Link>
        </aside>
        <aside>
          <Button variant="custom" onClick={() => setIsOpen(!isOpen)}>
            <IconMenu size={18} />
          </Button>
        </aside>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-gray-200 rounded-xl mt-2"
      >
        {isOpen && (
          <div className="flex flex-col p-4">
            <Link to={ROUTES.PRICING} className="py-2">
              <span className="font-medium">Pricing</span>
            </Link>
            {!user ? (
              <Link to={ROUTES.LOGIN} className="py-2">
                <span className="font-medium">Log in</span>
              </Link>
            ) : (
              <Link to={ROUTES.DASHBOARD.DASHBOARD} className="py-2">
                Dashboard
              </Link>
            )}
            <Button className="rounded-lg bg-black mt-2">Join for free</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
