import { Button } from "../components/ui/button";
// import { useQuery } from "@apollo/client";
// import { getDashboardOverview } from "../queries/queries";
// import { DashboardOverview } from "../types/client";

export default function DashboardPage() {
  // const { loading, error, data } = useQuery(getDashboardOverview, {
  //   variables: { userId: user.user_id },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const snapshot = data?.getDashboardOverview as DashboardOverview;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex md:grow-0 justify-between">
        <span className="font-semibold text-2xl mt-1">Dashboard</span>
        <Button variant="outline">Download</Button>
      </div>
    </div>
  );
}
