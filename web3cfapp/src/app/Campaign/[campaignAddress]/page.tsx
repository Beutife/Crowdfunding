"use client";
import { client } from "@/app/client";
import TierCard from "@/components/TierCard";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useReadContract, useActiveAccount, TransactionButton, lightTheme } from "thirdweb/react";

type CreateTierModalProps = {
  setIsModalOpen: (value: boolean) => void;
  contract: ThirdwebContract;
};

const CreateTierModal = ({ setIsModalOpen, contract }: CreateTierModalProps) => {
  const [tierName, setTierName] = useState<string>("");
  const [tierAmount, setTierAmount] = useState<bigint>(1n);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md z-50">
      <div className="w-1/2 max-w-md bg-slate-100 p-6 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Create a Funding Tier</p>
          <button
            className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Tier Name:</label>
          <input
            type="text"
            value={tierName}
            onChange={(e) => setTierName(e.target.value)}
            placeholder="Enter tier name (e.g., Gold Supporter)"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-medium mb-1">Tier Cost (wei):</label>
          <input
            type="number"
            value={parseInt(tierAmount.toString())}
            onChange={(e) => setTierAmount(BigInt(e.target.value))}
            placeholder="Enter amount in wei"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
          <TransactionButton
            transaction={() => prepareContractCall({
              contract: contract,
              method: "function addTier(string _name, uint256 _amount)",
              params: [tierName, tierAmount]
            })}
            onTransactionConfirmed={async () => {
              alert("Tier added successfully!");
              setIsModalOpen(false);
              setTierName("");
              setTierAmount(1n);
            }}
            onError={(error) => alert(`Error: ${error.message}`)}
            theme={lightTheme()}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            Add Tier
          </TransactionButton>
        </div>
      </div>
    </div>
  );
};

export default function CampaignPage() {
  const account = useActiveAccount();
  const { campaignAddress } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const liskSepolia = defineChain(4202);

  const contract = getContract({
    client: client,
    chain: liskSepolia,
    address: campaignAddress as string,
  });

  // Campaign details
  const { data: CampaignName, isLoading: isLoadingName } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: CampaignDescription } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: Deadline, isPending: isPendingDeadline } = useReadContract({
    contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });

  const { data: goal, isPending: isPendingGoal } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: balance, isPending: isPendingBalance } = useReadContract({
    contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const { data: tiersCamp, isPending: isPendingTiers } = useReadContract({
    contract,
    method:
      "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
    params: [],
  });

  // Get owner of the campaign
  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  // Get status of the campaign (changed to uint8 to match tutorial)
  const { data: status, isLoading: isLoadingStatus } = useReadContract({
    contract,
    method: "function state() view returns (uint8)",
    params: [],
  });

  // Format data
  const deadlineDate = Deadline
    ? new Date(parseInt(Deadline.toString()) * 1000)
    : null;
  const hasDeadlinePassed = deadlineDate && deadlineDate < new Date();

  const totalBalance = balance?.toString() || "0";
  const totalGoal = goal?.toString() || "1"; // avoid division by 0
  let balancePercentage =
    (parseInt(totalBalance) / parseInt(totalGoal)) * 100 || 0;
  if (balancePercentage > 100) balancePercentage = 100;

  // Status text mapping (matching tutorial)
  const getStatusText = (statusValue: number | undefined) => {
    if (statusValue === 0) return "Active";
    if (statusValue === 1) return "Successful";
    if (statusValue === 2) return "Failed";
    return "Unknown";
  };

  // Overall loading state
  const isLoading = isLoadingName || isPendingDeadline || isPendingGoal || 
                   isPendingBalance || isPendingTiers || isLoadingOwner || isLoadingStatus;

  return (
    <div className="max-w-7xl mx-auto px-2 mt-4 sm:px-6 lg:px-8">
      {/* Header with Edit Button - Matching Tutorial */}
      <div className="flex flex-row justify-between items-center mb-6">
        {!isLoadingName && (
          <p className="text-4xl font-semibold text-white">{CampaignName}</p>
        )}
        
        {/* Owner Edit Controls - Exact Tutorial Structure */}
        {owner === account?.address && !isLoadingOwner && (
          <div className="flex flex-row items-center space-x-2">
            {isEditing && status && (
              <p className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
                status === 0 ? "bg-green-500" : 
                status === 1 ? "bg-blue-500" : 
                status === 2 ? "bg-red-500" : "bg-gray-500"
              }`}>
                Status: {getStatusText(status)}
              </p>
            )}
            <button
              className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                isEditing 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Done" : "Edit"}
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 mt-2">Loading campaign details...</p>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Description - Tutorial Style */}
          <div className="my-4 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <p className="text-lg font-semibold text-white mb-2">Description:</p>
            <p className="text-gray-300">{CampaignDescription || "No description available"}</p>
          </div>

          {/* Deadline - Tutorial Style */}
          <div className="mb-4 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <p className="text-lg font-semibold text-white mb-2">Deadline</p>
            {!isPendingDeadline && deadlineDate && (
              <p className={`text-gray-300 ${
                hasDeadlinePassed ? "text-red-400" : "text-green-400"
              }`}>
                {deadlineDate.toDateString()}
                {hasDeadlinePassed && " (Expired)"}
              </p>
            )}
          </div>

          {/* Goal & Progress Bar - Exact Tutorial Structure */}
          {!isPendingBalance && !isPendingGoal && (
            <div className="mb-6 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <p className="text-lg font-semibold text-white mb-2">
                Campaign Goal: ${Number(goal).toLocaleString()}
              </p>
              <div className="relative w-full h-6 bg-gray-700 rounded-full dark:bg-gray-700 overflow-hidden">
                <div 
                  className="h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative transition-all duration-1000 ease-out"
                  style={{ width: `${balancePercentage}%` }}
                >
                  <p className="text-white text-xs p-1 font-medium absolute right-2 top-0">
                    ${Number(balance).toLocaleString()}
                  </p>
                </div>
                {balancePercentage < 100 && (
                  <p className="absolute top-0 right-0 text-white text-xs p-1 translate-x-1/2 -translate-y-1/2 bg-gray-800 px-2 py-1 rounded-full">
                    {balancePercentage.toFixed(1)}%
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {balancePercentage >= 100 ? "Goal achieved! 🎉" : `${(100 - balancePercentage).toFixed(1)}% remaining`}
              </p>
            </div>
          )}

          {/* Tiers Section - Exact Tutorial Structure */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold text-white">Tiers:</p>
              {isEditing && owner === account?.address && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Add Tier
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isPendingTiers ? (
                <div className="col-span-full text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                  <p className="text-gray-400">Loading tiers...</p>
                </div>
              ) : (
                <>
                  {tiersCamp && tiersCamp.length > 0 ? (
                    tiersCamp.map((tier, index) => (
                      <TierCard
                        key={index}
                        tier={tier}
                        index={index}
                        contract={contract}
                        isEditing={isEditing}
                      />
                    ))
                  ) : (
                    !isEditing && (
                      <div className="col-span-full text-center py-8 text-gray-400">
                        <p>No tiers available</p>
                        {owner === account?.address && (
                          <p className="text-sm mt-2">Click "Edit" to add your first tier!</p>
                        )}
                      </div>
                    )
                  )}
                  
                  {/* Add Tier Button Card - Exact Tutorial Style */}
                  {isEditing && owner === account?.address && (
                    <button
                      className="max-w-sm flex flex-col text-center justify-center items-center font-semibold p-6 bg-blue-500/20 hover:bg-blue-500/30 border-2 border-dashed border-blue-500 text-blue-300 rounded-lg shadow transition-all duration-200 hover:scale-105 h-48"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <div className="text-3xl mb-2">+</div>
                      <p className="text-white font-semibold">Add Tier</p>
                      <p className="text-sm text-blue-300 mt-1">Create a new funding level</p>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Campaign Info Footer */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-xs font-semibold">ID</span>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Contract</div>
                  <div className="text-white font-mono text-xs truncate">
                    {campaignAddress}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-xs font-semibold">Owner</span>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Creator</div>
                  <div className="text-white font-mono text-xs truncate">
                    {owner || "Loading..."}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 text-xs font-semibold">Chain</span>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Network</div>
                  <div className="text-white font-medium">Lisk Sepolia</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Tier Modal - Exact Tutorial Implementation */}
      {isModalOpen && (
        <CreateTierModal
          setIsModalOpen={setIsModalOpen}
          contract={contract}
        />
      )}
    </div>
  );
}