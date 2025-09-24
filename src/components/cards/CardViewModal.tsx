import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const CardViewModal = ({
  opne,
  onClose,
  children,
}: {
  opne: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const handleModalClose = () => {
    onClose();
  };

  const [isModalOpne, setModalOpen] = useState(opne);

  if (!opne) return null;
  return (
    <Dialog open={isModalOpne} onOpenChange={handleModalClose}>
      <DialogContent className="w-[95%] md:w-[320px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Congress! Your Card is Ready to use</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter className="flex !flex-row !justify-end">
          <button onClick={()=> setModalOpen(false)} className="bg-blue-600 hover:bg-blue-700 hover:transition-colors text-white text-xs md:text-sm font-semibold cursor-pointer rounded-sm shadow-sm px-4 py-2 w-max">
            Create More
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardViewModal;
