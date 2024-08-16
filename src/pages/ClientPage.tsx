import { Client } from "../types/client";

export default function ClientPage({ client }: { client: Client }) {
  return (
    <>
      <div className="flex justify-between mx-4">
        <span className="font-semibold text-2xl mt-1">{client.name}</span>
      </div>
    </>
  );
}
