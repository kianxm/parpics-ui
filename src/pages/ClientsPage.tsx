import { useContext, useState } from "react";
import ClientTable from "../components/client/ClientTable";
import { useQuery } from "@apollo/client";
import { getAllClientsByUserId } from "../queries/queries";
import ClientGrid from "../components/client/ClientGrid";
import GridListButton from "../components/client/GridListButton";
import FilterButtons from "../components/client/FilterButtons";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { Client } from "../types/client";
import { AuthContext } from "../context/context";

export default function ClientsPage() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(getAllClientsByUserId, {
    variables: { userId: user.user_id }, // Pass the userId variable
  });

  const [isGrid, setIsGrid] = useState(false);
  const handleViewChange = (isGridView: boolean) => {
    setIsGrid(isGridView);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const clients = data.getAllClientsByUserId.map((client: Client) => ({
    name: client.name,
    link: client.link,
    accessCode: client.accessCode,
    location: client.location,
    date: client.date,
    hasPaid: client.hasPaid,
    photoCount: client.photoCount || 0,
  }));

  return (
    <>
      <div className="flex justify-between mx-4">
        <span className="font-semibold text-2xl mt-1">Clients</span>
        <Link to={ROUTES.CLIENTS.CREATE}>
          <Button className="flex gap-1 items-center">
            <Plus size={16} /> New
          </Button>
        </Link>
      </div>
      <div className="flex w-full mt-1 justify-between px-4">
        <FilterButtons />
        <GridListButton className="px-2" onChange={handleViewChange} />
      </div>
      {isGrid ? (
        <ClientGrid clients={clients} />
      ) : (
        <ClientTable clients={clients} />
      )}
    </>
  );
}
