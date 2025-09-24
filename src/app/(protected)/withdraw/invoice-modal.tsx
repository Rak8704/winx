"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { formatBDT } from "@/lib/utils";
import moment from "moment";
import { IoReturnUpBack } from "react-icons/io5";
import Link from "next/link";
import { Prisma } from "@prisma/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "white",
  boxShadow: 24,

  p: 3,
  outline: "none",
};

interface InvoiceModalProps {
  modalOpne?: boolean;
  withdraw: Prisma.WithdrawGetPayload<{ include: { card: true } }>;
  onClose: () => void;
}
const InvoiceModal = ({
  modalOpne = true,
  withdraw,
  onClose,
}: InvoiceModalProps) => {
  const [open, setOpen] = React.useState(modalOpne);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const {
    amount,
    expire,
    createdAt,
    card: { walletNumber },
  } = withdraw;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center justify-between">
              <span className="text-black/50 text-sm font-semibold w-[165px]">
                Amount
              </span>

              <span className="text-black text-sm font-semibold">
                {formatBDT(+amount)}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-black/50 text-sm font-semibold w-[165px]">
                Wallet Number
              </span>

              <span className="text-black text-sm font-semibold">
                {walletNumber}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-black/50 text-sm font-semibold  w-[165px]">
                Status
              </span>

              <span className="text-black text-sm font-semibold">
                {" "}
                <span className="bg-yellow-300 uppercase text-white font-bold px-2 py-1 rounded-full border-b-2 border-b-yellow-400 text-sm ">
                  pending
                </span>
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-black/50 text-sm font-semibold  w-[165px]">
                Order created
              </span>

              <span className="text-black text-sm font-semibold">
                {moment(createdAt).calendar()}
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-black/50 text-sm font-semibold  w-[165px]">
                Delivery time (max)
              </span>

              <span className="text-black text-sm font-semibold">
                {moment(expire).calendar()}
              </span>
            </li>
          </ul>
          <Link href="/">
            <button className="w-full flex justify-center items-center gap-2 py-2 rounded-sm cursor-pointer bg-blue-600 text-white text-sm mt-4">
              Back to Home <IoReturnUpBack className="w-5 h-5 text-white" />
            </button>
          </Link>

          <div className="bg-yellow-50 mt-2 border border-yellow-200 rounded-lg p-2">
            <div className=" text-xs text-yellow-700">
              <p>
                • If you do not recevie your withdrawal within the 24h, please
                contant{" "}
                <Link href="#" className="font-semibold">
                  Support.
                </Link>
              </p>
              <p className="mt-2">
                যদি আপনি ২৪ ঘণ্টার মধ্যে আপনার উত্তোলন না পান, অনুগ্রহ করে{" "}
                <Link href="#" className="font-semibold">
                  সাপোর্টের
                </Link>{" "}
                সঙ্গে যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default InvoiceModal;
