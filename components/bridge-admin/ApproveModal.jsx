"use client";
import { maskValue } from "@/utils";
import { IconX } from "@tabler/icons-react";
import React, { Fragment, useEffect } from "react";

const ApproveModal = ({ open, setOpen, data }) => {
  useEffect(() => {
    if (open) {
      document.getElementById("approve_modal").showModal();
    } else {
      document.getElementById("approve_modal").close();
    }
  }, [open]);
  return (
    <dialog id="approve_modal" className="modal">
      <div className="modal-box relative bg-background">
        <p className="font-semibold">Terms & Conditions</p>
        <div className="py-2 flex ">
          <div className="modal-action absolute -top-6 right-0 p-6">
            <button
              className="cursor-pointer"
              onClick={() => {
                setOpen(false);
                document.getElementById("approve_modal").close();
              }}
            >
              <IconX />
            </button>
          </div>
        </div>
        <div method="dialog " className="overflow-x-auto max-h-96">
          <table className="w-full">
            <thead className="w-full bg-stroke">
              <tr>
                <th className="p-2">Sr. No</th>
                <th>Address</th>
                <th>Txn Hash</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td className="p-2">{idx + 1}</td>
                    <td>
                      {maskValue({
                        str: item?.adminWallet,
                        enableCopyButton: true,
                      })}
                    </td>
                    <td>
                      {maskValue({
                        str: item?.transactionHash,
                        enableCopyButton: true,
                      })}
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default ApproveModal;
