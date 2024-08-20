import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { ROUTES } from "../routes";
import { Button } from "../components/ui/button";
import { useQuery } from "@apollo/client";
import { getDashboardOverview } from "../queries/queries";
import { useContext } from "react";
import { AuthContext } from "../context/context";
import { DashboardOverview } from "../types/client";

function DashboardCards({ data }: { data: DashboardOverview }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="bg-white p-4 rounded border border-gray-200">
        <div className="flex justify-between">
          <span>Total Clients</span>
          <span>{data.totalClients}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded border border-gray-200">
        <div className="flex justify-between">
          <span>Total Photos</span>
          <span>{data.totalPhotos?.[0]?.total ?? 0}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded border border-gray-200">
        <div className="flex justify-between">
          <span>Total Paid Clients</span>
          <span>{data.totalPaidClients}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(getDashboardOverview, {
    variables: { userId: user.user_id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex justify-between mx-4">
        <span className="font-semibold text-2xl mt-1">Dashboard</span>
        <Link to={ROUTES.CLIENTS.CREATE}>
          <Button className="flex gap-1 items-center">
            <Plus size={20} /> Client
          </Button>
        </Link>
      </div>
      {data && (
        <DashboardCards data={data.getDashboardOverview as DashboardOverview} />
      )}
    </>
  );
}
