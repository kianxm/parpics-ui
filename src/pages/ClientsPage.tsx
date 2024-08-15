import { useState } from "react";
import ClientTable from "../components/site/ClientTable";
import { useQuery } from "@apollo/client";
import { getAllClients } from "../queries/queries";
import ClientGrid from "../components/site/ClientGrid";
import GridListButton from "../components/site/GridListButton";

export default function ClientsPage() {
  const { loading, error, data } = useQuery(getAllClients);

  const [isGrid, setIsGrid] = useState(false);
  const handleViewChange = (isGridView: boolean) => {
    setIsGrid(isGridView);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const clients = data.getAllClients.map((client) => ({
    name: client.name,
    link: client.link,
    accessCode: client.accessCode,
    location: client.location,
    date: client.date,
    hasPaid: client.hasPaid,
    photoCount: client.photoCount || 0,
  }));

  return (
    <div>
      <h1>Clients</h1>
      <div className="flex w-full mt-1 justify-between px-4">
        {/* <ClientFilterButtons /> */}
        <GridListButton onChange={handleViewChange} />
      </div>
      {isGrid ? (
        <ClientGrid clients={clients} />
      ) : (
        <ClientTable clients={clients} />
      )}
    </div>
  );
}
