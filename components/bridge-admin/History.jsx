import CustomButton from "@/common_component/CustomButton";
import LoadingScreen from "@/common_component/LoadingScreen";
import NoDataFound from "@/common_component/NoDataFound";
import {
  useAllTransactionHistory,
  useAllTransactionHistoryApproved,
} from "@/modules/bridge-admin";
import { maskValue } from "@/utils";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { formatNice } from "coin-format";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useConfig } from "wagmi";
import { switchChain } from "@wagmi/core";
import ApproveModal from "./ApproveModal";
const History = () => {
  const { address, isConnected, chainId } = useAccount();
  const [addressList, setAddressList] = useState([]);
  const [addressModal, setAddressModal] = useState(false);
  const config = useConfig();
  const {
    data: transactionData,
    isLoading: transactionDataLoading,
    refetch: refetchAllTransaction,
  } = useAllTransactionHistoryApproved(address);

  const [isLoading, setIsLoading] = useState(false);
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});
  useEffect(() => {
    if (chainId && chainId !== 11155111) {
      switchChain({ chainId: 11155111 });
    }
  }, [chainId]);

  return (
    <div className="max-h-[700px] overflow-auto w-full ">
      {transactionDataLoading && isConnected && (
        <LoadingScreen
          className={"min-h-[400px]"}
          text={"Getting Token Data..."}
        />
      )}
      {((!transactionDataLoading && transactionData?.length == 0) ||
        !isConnected) && (
        <div className="min-h-56">
          <NoDataFound text={"No Token Found."} />
        </div>
      )}
      {!transactionDataLoading &&
        isConnected &&
        transactionData?.length != 0 && (
          <table className="table table-md table-pin-rows table-pin-cols flex-1 min-w-[1200px] ">
            <thead>
              <tr className="bg-stroke">
                <td>Date/Time</td>
                <td>Wallet Address</td>
                <td>Amount</td>
                <td>Burn ID</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {transactionData?.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      {item?.createdAt
                        ? moment(item?.createdAt)?.format("ll")
                        : "--"}
                    </td>
                    <td>
                      {maskValue({
                        str: item?.walletAddress,
                        enableCopyButton: true,
                      })}
                    </td>
                    <td>{formatNice(item?.amount ?? 0)}</td>
                    <td>
                      {maskValue({
                        str: item?.transactionId,
                        enableCopyButton: true,
                      })}
                    </td>
                    <td>
                      <div className="flex items-center ">
                        <CustomButton
                          className={
                            "bg-transparent border border-tanborder rounded-lg"
                          }
                        >
                          Approved
                        </CustomButton>
                        {item?.approvedBy?.length !== 0 && (
                          <button
                            onClick={() => {
                              setAddressModal(true);
                              setAddressList(item?.approvedBy);
                            }}
                          >
                            <IconInfoCircleFilled className="ml-2 text-tanborder cursor-pointer" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      <ApproveModal
        open={addressModal}
        data={addressList}
        title={"Approved By"}
        setOpen={setAddressModal}
      />
    </div>
  );
};

export default History;
