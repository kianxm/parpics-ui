import { useContext, useState } from "react";
import { AuthContext } from "../../context/context";
import { WebsiteTemplateProps } from "../../types/website";

export default function TemplateTwo({
  client,
  photos,
  mainPhoto,
  photoUrls,
  viewer,
  handleToggleFavoritePhoto,
  refetch,
}: WebsiteTemplateProps) {
  const { logout } = useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openSignInDialog = () => setIsDialogOpen(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  return <div>second template</div>;
}
