"use client";
import BreadCrumb from "@/common_component/BreadCrumb";
import CustomButton from "@/common_component/CustomButton";
import PageTitle from "@/common_component/PageTitle";
import History from "@/components/bridge-admin/History";
import Request from "@/components/bridge-admin/Request";
import { adminConfig } from "@/modules/globals/config";
import { useAppKit } from "@reown/appkit/react";
import React, { useState } from "react";
import { useAccount } from "wagmi";

const breadCrumb = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Bridge Admin",
    href: "/bridge-admin",
  },
];

const BridgeAdmin = () => {
  const [tab, setTab] = useState(0);
  const { isConnected, address } = useAccount();
  const { open } = useAppKit();
  return (
    <div>
      <div className="w-full flex items-end justify-end">
        <BreadCrumb routes={breadCrumb} />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-12">
          <div className="col-span-12 grid grid-cols-12">
            <div className="col-span-12 md:col-span-6">
              <PageTitle
                title={"Bridge Transactions"}
                subtitle={
                  "Seamlessly Transfer Tokens Between Different Blockchains Using the Bridge—Enable Cross-Chain Interoperability with Just a Few Clicks."
                }
              />
            </div>
            {adminConfig.bridgeAdmins?.some((a) => address == a) &&
              isConnected && (
                <div className="col-span-12 md:col-span-6 flex items-center justify-end">
                  <div className="bg-tanborder/20 p-3 rounded-4xl flex gap-4">
                    <CustomButton
                      className={`rounded-lg md:min-w-40 ${
                        tab == 0 ? "" : "bg-transparent shadow-none"
                      } `}
                      clickHandler={() => setTab(0)}
                    >
                      Request
                    </CustomButton>
                    <CustomButton
                      className={`rounded-lg md:min-w-40 ${
                        tab == 1 ? "" : "bg-transparent shadow-none"
                      }`}
                      clickHandler={() => setTab(1)}
                    >
                      History
                    </CustomButton>
                  </div>
                </div>
              )}
          </div>
          {adminConfig.bridgeAdmins?.some((a) => address == a) &&
            isConnected && (
              <div className="w-full border-2 border-stroke grid grid-cols-12 mt-4 rounded-2xl overflow-clip">
                <div className="col-span-12">
                  {tab == 0 && <Request />}
                  {tab == 1 && <History />}
                </div>
              </div>
            )}

          {!adminConfig.bridgeAdmins?.some((a) => address == a) && (
            <div className="col-span-12 flex items-center justify-center h-96">
              <CustomButton clickHandler={() => open({ view: "Connect" })}>
                Connect To Admin Wallet
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BridgeAdmin;
