import { useState } from "react";
import { cn } from "../../lib/utils";
import { templates } from "../../utils/templates";
import { Button } from "../ui/button";
import { Client } from "../../types/client";
import { useMutation } from "@apollo/client";
import { UPDATE_CLIENT_WEBSITE_TEMPLATE } from "../../mutations/client";

export default function ClientWebsiteSettings({
  client,
  refetch,
}: {
  client: Client;
  refetch: () => void;
}) {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(
    client.websiteTemplate
  );

  const [updateClientWebsiteTemplate] = useMutation(
    UPDATE_CLIENT_WEBSITE_TEMPLATE
  );

  const handleSave = async () => {
    try {
      await updateClientWebsiteTemplate({
        variables: { clientId: client.id, templateId: selectedTemplateIndex },
      });
      refetch();
    } catch (error) {
      console.error("Error updating client website template:", error);
    }
  };

  return (
    <div className="flex flex-col py-4 gap-4">
      <h1 className="font-medium text-2xl">Website</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {templates.map((template, index) => (
          <div
            key={template.name}
            className={cn(
              selectedTemplateIndex === index
                ? "border-2 border-black shadow-md"
                : "",
              "p-4 bg-gray-200 cursor-pointer rounded-lg flex flex-col items-center justify-center min-h-48"
            )}
            onClick={() => setSelectedTemplateIndex(index)}
          >
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
      <Button
        className="w-16"
        onClick={handleSave}
        disabled={selectedTemplateIndex === client.websiteTemplate}
      >
        Save
      </Button>
    </div>
  );
}
