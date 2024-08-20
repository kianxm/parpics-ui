import { Client } from "../../types/client";
import { LOGO_SVG_PATH } from "../../utils/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ClientTableProps {
  clients: Client[];
}

export default function ClientGrid({ clients }: ClientTableProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mx-4 mt-8">
      {clients?.map((client, index) => (
        <Card
          key={index}
          className="shadow-none hover:bg-blue-50 cursor-pointer group"
          // onClick={() => router.push(uriClient(client.id))}
        >
          <CardHeader className="p-0">
            <img
              src={LOGO_SVG_PATH}
              alt="Sample"
              className="w-full h-auto rounded-t-lg"
              width={200}
              height={100}
            />
          </CardHeader>
          <CardContent className="p-4 flex justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-xl font-semibold">
                {client.name}
              </CardTitle>
              <CardDescription className="text-sm text-neutral-500">
                {client.date}
              </CardDescription>
            </div>
            {/* <OptionsButton triggerProps="opacity-0 group-hover:opacity-100 transition-opacity" clientId={client.id} /> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
