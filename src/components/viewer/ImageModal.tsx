import { useEffect, useState } from "react";
import { Photo } from "../../types/photo";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT_TO_PHOTO } from "../../mutations/client";
import { Client } from "../../types/client";
import { Viewer } from "../../types/user";

type ImageModalProps = {
  images: Photo[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  viewer: Viewer;
  refetch: () => void;
};

export const ImageModal = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  client,
  viewer,
  refetch,
}: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [newComment, setNewComment] = useState("");
  const [addCommentToPhoto] = useMutation(ADD_COMMENT_TO_PHOTO);

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
      <DialogContent className="max-w-5xl p-1 bg-white ring-0 text-black">
        <div className="flex h-full">
          {/* Image Section */}
          <div className="relative flex-1">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].name}
              className="object-contain w-full h-full rounded-sm"
            />
            <Button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-white"
              variant="ghost"
              size="icon"
            >
              <ChevronLeft size={32} />
            </Button>
            <Button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-white"
              variant="ghost"
              size="icon"
            >
              <ChevronRight size={32} />
            </Button>
          </div>

          {/* Comment Section */}
          <div className="w-72 p-4 border-l border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <div className="flex flex-col gap-2 mb-4">
              {currentImage.comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-100 rounded-md shadow-sm"
                >
                  {comment.text}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 border rounded-md"
              />
              <Button onClick={handleAddComment} className="px-3 py-1">
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
