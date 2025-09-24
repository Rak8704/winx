"use client";
import React, { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { IoIosWarning } from "react-icons/io";
import { logout } from "@/action/logout";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const LogOutModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const handleOpenLogout = () => {
    if (pending) return false;
    setOpen(true);
  };

  const [pending, startTr] = useTransition();

  const handleLogout = () => {
    startTr(() => {
      logout().then((res) => {
        if (res && res.success) {
          location.reload();
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <div onClick={handleOpenLogout}>{children}</div>
        <DialogContent className="bg-white/65 backdrop-blur-sm w-[250px] rounded-xl">
          <DialogHeader></DialogHeader>
          <IoIosWarning className="w-10 h-10 text-gray-800 mx-auto" />
          <h3 className="text-lg font-medium text-gray-800 text-center">
            Are you sure to logout?
          </h3>
          <div className="flex justify-center gap-2 items-center">
            <button
              disabled={pending}
              onClick={handleLogout}
              className="bg-destructive hover:opacity-80 flex-1 text-center text-white py-2 rounded-sm"
            >
              {pending ? <BeatLoader size={8} color="#fff" /> : "Logout"}
            </button>
            <button
              disabled={pending}
              className="bg-gray-800 text-white hover:opacity-80 flex-1 text-center py-2 rounded-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogOutModal;
