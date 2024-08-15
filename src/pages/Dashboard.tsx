import { Link } from "react-router-dom";

import { Plus } from "lucide-react";
import { ROUTES } from "../routes";
import { Button } from "../components/ui/button";

export default function DashboardPage() {
  // const cookieStore = cookies();
  // const supabase = useSupabaseServer(cookieStore);

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   redirect(ROUTES.LOGIN);
  // }

  return (
    <>
      <div className="flex justify-between">
        <span>Dashboard</span>
        <Link to={ROUTES.CLIENTS.CREATE}>
          <Button className="flex gap-1 items-center">
            <Plus size={20} /> Client
          </Button>
        </Link>
      </div>
    </>
  );
}
