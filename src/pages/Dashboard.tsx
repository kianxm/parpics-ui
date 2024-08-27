import { Button } from "../components/ui/button";
import { Suspense } from "react";
import Spinner from "../components/Spinner";
import DashboardContent from "../components/dashboard/DashboardContent";
import { useCurrentUser } from "../utils/useCurrentUser";

export default function DashboardPage() {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex md:grow-0 justify-between">
        <span className="font-semibold text-2xl mt-1">Dashboard</span>
        <Button variant="outline">Download</Button>
      </div>
      <Suspense fallback={<Spinner />}>
        <DashboardContent userId={user.user_id} />
      </Suspense>
    </div>
  );
}
