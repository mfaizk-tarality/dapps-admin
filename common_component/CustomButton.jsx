"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppKit } from "@reown/appkit/react";
const CustomButton = ({
  children,
  className,
  clickHandler,
  isLoading = false,
  isConnected = true,
  type = "button",
}) => {
  const { open } = useAppKit();
  return (
    <button
      className={cn(
        "bg-tancolor px-6 py-2 rounded-4xl cursor-pointer btn border-0 transition-all ease-in-out duration-200",
        className
      )}
      onClick={() => {
        if (!isConnected) {
          open({ view: "Connect" });
        } else {
          if (clickHandler) {
            clickHandler();
          }
        }
      }}
      type={type}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="loading loading-spinner loading-xs"
            exit={{ opacity: 0 }}
            animate={true}
          />
        ) : (
          <motion.div
            exit={{ opacity: 0 }}
            animate={true}
            className="flex items-center gap-2"
          >
            {isConnected ? <>{children}</> : "Connect Wallet"}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CustomButton;
