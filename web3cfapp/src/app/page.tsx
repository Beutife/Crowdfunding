"use client"

import { getContract } from "thirdweb";
import { client } from "./client";
import { defineChain } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "@/constant/contract";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import CampaignCard from "@/components/CampaignCards";

export const dynamic = "force-dynamic";

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

  // Match tutorial naming exactly
  const { data: campaigns, isLoading: isLoadingCampaigns, refetch: refetchCampaigns } = useReadContract({
    contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });

  console.log("📊 Campaigns:", campaigns);
  console.log("⏳ Is Loading:", isLoadingCampaigns);

  return (
    <main className="mx-auto max-w-7xl px-4 mt-4 sm:px-6 lg:px-8">
      <div className="py-10">
        {/* Header - Tutorial Style */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Campaigns:</h1>
          
          {/* Network Info - Subtle like tutorial */}
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Lisk Sepolia</span>
            </span>
            <span>•</span>
            <span className="font-mono bg-black/20 px-2 py-1 rounded text-xs">
              {CROWDFUNDING_FACTORY.slice(0, 6)}...{CROWDFUNDING_FACTORY.slice(-4)}
            </span>
            {account && (
              <>
                <span>•</span>
                <span className="font-mono text-xs">
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Campaigns Grid - Exact Tutorial Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loading State - Clean like tutorial */}
          {isLoadingCampaigns && (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-gray-400">Loading campaigns...</p>
              </div>
            </div>
          )}

          {/* No Wallet Connected - Your functionality, tutorial style */}
          {!account && !isLoadingCampaigns && (
            <div className="col-span-full flex items-center justify-center py-12 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Connect Your Wallet</h3>
                <p className="text-gray-400">Please connect your wallet to view available campaigns</p>
              </div>
            </div>
          )}

          {/* No Campaigns - Tutorial Style */}
          {!isLoadingCampaigns && campaigns && campaigns.length === 0 && account && (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Campaigns Yet</h3>
                <p className="text-gray-400">No campaigns have been created on this network</p>
              </div>
            </div>
          )}

          {/* Campaigns List - Exact Tutorial Structure */}
          {!isLoadingCampaigns && campaigns && campaigns.length > 0 && account && (
            campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.campaignAddress}
                campaignAddress={campaign.campaignAddress}
              />
            ))
          )}
        </div>

        {/* Debug Info - Collapsible like tutorial (optional) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <summary className="cursor-pointer text-sm text-gray-400 font-medium mb-2">
              🛠️ Debug Info (Click to expand)
            </summary>
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <p><span className="text-gray-300">Wallet:</span> {account ? `${account.address.slice(0,6)}...${account.address.slice(-4)}` : "Not connected"}</p>
              <p><span className="text-gray-300">Status:</span> {isLoadingCampaigns ? "Loading..." : "Loaded"}</p>
              <p><span className="text-gray-300">Campaigns:</span> {campaigns ? `${campaigns.length} found` : "None"}</p>
              <p><span className="text-gray-300">Factory:</span> {CROWDFUNDING_FACTORY}</p>
            </div>
          </details>
        )}
      </div>
    </main>
  );
}