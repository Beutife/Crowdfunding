// "use client"
// import { getContract } from "thirdweb";
// import { client } from "./client";
// // Replace 'liskSepolia' with the correct chain export, for example:
// import { defineChain } from "thirdweb/chains";
// import { CROWDFUNDING_FACTORY } from "@/constant/contract";
// import { useReadContract } from "thirdweb/react";


// export default function Home() {
//  console.log("Factory Address11:", CROWDFUNDING_FACTORY);

//   const liskSepolia = defineChain(4202);
//   const contract = getContract({
//     client: client,
//     chain:  liskSepolia,
//     address: CROWDFUNDING_FACTORY,
//   });

//   console.log("Factory Address22:", CROWDFUNDING_FACTORY);

//   const { data: Campaigns, isPending, error } = useReadContract({
//   contract,
//   method: "getAllCampaigns",
//   params: [],
// });


//   // const { data : Campaigns, isPending, error } = useReadContract({
//   //   contract,
//   //   method:
//   //     "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
//   //   params: [],
//   // });
//   console.log("📊 Campaigns:", Campaigns);
//   console.log("⏳ Is Pending:", isPending);
//   console.log("❌ Error:", error);

//   console.log("Campaigns type:", typeof Campaigns);
//   console.log("Is array?", Array.isArray(Campaigns));


//  console.log("Factory Address333:", CROWDFUNDING_FACTORY);

//   return (
//     <main className="p-4 mx-auto max-w-7xl">
//       <div className="py-20">
//         <h1 className="text-4xl fobt-bold mb-4"> Campaigns: ccc</h1>
//       </div>
//     </main>
//   );
// }

"use client"
import { getContract } from "thirdweb";
import { client } from "./client";
import { defineChain } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "@/constant/contract";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { useEffect } from "react";

export default function Home() {
  const account = useActiveAccount();
  console.log("Factory Address:", CROWDFUNDING_FACTORY);
  console.log("Account connected:", account?.address);
  
  const liskSepolia = defineChain(4202);
  const contract = getContract({
    client: client,
    chain: liskSepolia,
    address: CROWDFUNDING_FACTORY,
  });

  const { data: Campaigns, isPending, error, refetch } = useReadContract({
    contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });

  console.log("📊 Campaigns:", Campaigns);
  console.log("⏳ Is Pending:", isPending);
  console.log("❌ Error:", error);

  // Force refetch when account connects
  useEffect(() => {
    if (account && isPending) {
      console.log("🔄 Refetching with connected account...");
      refetch();
    }
  }, [account, refetch, isPending]);

  return (
    <main className="p-4 mx-auto max-w-7xl">
      <div className="py-20">
        <h1 className="text-4xl font-bold mb-4">Campaigns</h1>
        <p>Contract Address: {CROWDFUNDING_FACTORY}</p>
        <div className="mt-4 space-y-2">
          <p>Wallet: {account ? `${account.address.slice(0,6)}...${account.address.slice(-4)}` : "Not connected"}</p>
          <p>Status: {isPending ? "Loading..." : "Loaded"}</p>
          <p>Error: {error ? error.message : "None"}</p>
          <p>Campaigns: {Campaigns ? `${Campaigns.length} found` : "None/Undefined"}</p>
          
          {isPending && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
              <span>Loading campaigns...</span>
            </div>
          )}
          
          {!account && (
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-yellow-800">⚠️ Please connect your wallet to load campaigns</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}