import { bridge } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllTransactionHistory = (wallet) => {
  return useQuery({
    queryKey: ["allTransactionHistory", wallet],
    queryFn: async () => {
      try {
        const response = await axios({
          url: `${bridge}/burnTokenList`,
          params: {
            adminWallet: wallet,
          },
          method: "GET",
        });
        return response?.data?.result?.result?.rows;
      } catch (error) {
        console.log(error, "error");
        return [];
      }
    },
  });
};

export const useAllTransactionHistoryApproved = (adminWallet) => {
  return useQuery({
    queryKey: ["allTransactionHistoryApproved", adminWallet],
    queryFn: async () => {
      try {
        const response = await axios({
          url: `${bridge}/approveTransactionList`,
          params: {
            adminWallet: adminWallet,
          },
          method: "GET",
        });
        return response?.data?.result?.result?.rows;
      } catch (error) {
        return [];
      }
    },
  });
};
