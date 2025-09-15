"use client";

import { getContract } from "thirdweb";
import { client } from "./client";
// Replace 'liskSepolia' with the correct chain export, for example:
import { defineChain } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "@/constants/contracts";
import { useReadContract } from "thirdweb/react";


export default function Home() {
  const liskSepolia = defineChain(4202);
  const contract = getContract({
    client: client,
    chain:  liskSepolia,
    address: CROWDFUNDING_FACTORY,
  });

  const { data : Campaigns, isPending } = useReadContract({
    contract,
    method:
      "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });
  console.log(Campaigns)

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 ">
        <h1 className="text-4xl bg-grey-100">Campaigns</h1>
      </div>
    </main>
  );
}

