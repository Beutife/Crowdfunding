"use client"
import { getContract } from "thirdweb";
import { client } from "./client";
// Replace 'liskSepolia' with the correct chain export, for example:
import { defineChain } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "@/constant/contract";
import { useReadContract } from "thirdweb/react";


export default function Home() {
 console.log("Factory Address:", CROWDFUNDING_FACTORY);

  // const liskSepolia = defineChain(4202);
  // const contract = getContract({
  //   client: client,
  //   chain:  liskSepolia,
  //   address: CROWDFUNDING_FACTORY,
  // });

  //console.log("Factory Address:", CROWDFUNDING_FACTORY);

  // const { data : Campaigns, isPending } = useReadContract({
  //   contract,
  //   method:
  //     "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
  //   params: [],
  // });
  // console.log(Campaigns)

  return (
    <main className="p-4 mx-auto max-w-7xl">
      <div className="py-20">
        <h1 className="text-4xl fobt-bold mb-4"> Campaigns: ccc</h1>
      </div>
    </main>
  );
}