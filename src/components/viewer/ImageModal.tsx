import { useEffect, useState } from "react";
import { Photo } from "../../types/photo";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Plus,
  Trash,
  UserIcon,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT_TO_PHOTO, DELETE_COMMENT } from "../../mutations/client";
import { Client } from "../../types/client";
import { Viewer } from "../../types/user";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconHeartFilled, IconMessagePlus } from "@tabler/icons-react";

type ImageModalProps = {
  images: Photo[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  viewer: Viewer;
  handleToggleFavoritePhoto: (clientId: string, publicId: string) => void;
  downloadImage: (url: string) => void;
  refetch: () => void;
};

export const ImageModal = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  client,
  viewer,
  handleToggleFavoritePhoto,
  downloadImage,
  refetch,
}: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [newComment, setNewComment] = useState("");
  const [addCommentToPhoto] = useMutation(ADD_COMMENT_TO_PHOTO);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const handleAddComment = async () => {
    const photo = images[currentIndex];
    try {
      await addCommentToPhoto({
        variables: {
          clientId: client.id,
          publicId: photo.publicId,
          commentInput: { author: viewer.name, text: newComment },
        },
        onCompleted: () => {
          setNewComment("");
          refetch();
        },
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const photo = images[currentIndex];
    try {
      await deleteComment({
        variables: {
          clientId: client.id,
          publicId: photo.publicId,
          commentId: commentId,
        },
        onCompleted: () => {
          refetch();
        },
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-1 bg-white text-black">
        <div className="flex flex-col sm:flex-row h-full lg:max-h-[900px]">
          {/* Image Section */}
          <div className="relative flex-1 mr-1">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].name}
              className="object-cover w-full h-full rounded-sm"
            />
            <Button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-black"
              variant="outline"
              size="icon"
            >
              <ChevronLeft size={32} />
            </Button>
            <Button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-black"
              variant="outline"
              size="icon"
            >
              <ChevronRight size={32} />
            </Button>
          </div>

          {/* Comment Section */}
          <div className="flex flex-col w-72 p-4 border-l border-gray-200">
            <h2 className="text-lg font-semibold">
              {images[currentIndex].name}
            </h2>
            <div className="flex items-center justify-start gap-4">
              <Button
                className="bg-transparent text-gray-800 p-0"
                variant="custom"
                onClick={() => {
                  handleToggleFavoritePhoto(client.id, currentImage.publicId);
                }}
              >
                {!currentImage.isFavorite ? (
                  <Heart size={20} />
                ) : (
                  <IconHeartFilled size={20} className="text-red-500" />
                )}
              </Button>

              <Button
                className="bg-transparent text-gray-800 p-0"
                variant="custom"
                onClick={() => downloadImage(currentImage.url)}
              >
                <Download size={20} />
              </Button>
            </div>
            <Separator className="mb-2" />
            {currentImage.comments.length > 0 ? (
              <h2 className="text-lg font-semibold mb-2">Comments</h2>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow gap-2 text-gray-500">
                <IconMessagePlus />
                No comments yet!
              </div>
            )}

            {currentImage.comments.length > 0 ? (
              <div className="flex-grow flex flex-col gap-2 mb-4">
                {currentImage.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 py-1 items-start justify-center break-all"
                  >
                    <div className="flex gap-2 items-center w-full">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{<UserIcon />}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium grow">{comment.author}</span>
                      <Button
                        onClick={() => handleDeleteComment(comment.id)}
                        variant="ghost"
                        size="icon"
                      >
                        <Trash size={12} />
                      </Button>
                    </div>
                    {comment.text}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 border rounded-md text-sm"
              />
              <Button onClick={handleAddComment} size="sm">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
