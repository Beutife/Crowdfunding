// 'use client';
// import { client } from "@/app/client";
// import { CROWDFUNDING_FACTORY } from "@/app/constants/contracts";
// import { CampaignCard } from "@/components/CampaignCard"; // Using your existing CampaignCard
// import { useState } from "react";
// import { getContract } from "thirdweb";
// import { defineChain } from "thirdweb/chains";
// import { deployPublishedContract } from "thirdweb/deploys";
// import { useActiveAccount, useReadContract } from "thirdweb/react";

// export default function DashboardPage() {
//     const account = useActiveAccount();
//     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//     const liskSepolia = defineChain(4202);
    
//     const contract = getContract({
//         client: client,
//         chain: liskSepolia,
//         address: CROWDFUNDING_FACTORY,
//     });

//     // Get User's Campaigns - Adapted for your structure
//     const { data: myCampaigns, isLoading: isLoadingMyCampaigns, refetch } = useReadContract({
//         contract: contract,
//         method: "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
//         params: [account?.address as string]
//     });

//     return (
//         <div className="mx-auto max-w-7xl px-4 mt-16 sm:px-6 lg:px-8">
//             {/* Header - Responsive */}
//             <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
//                 <div>
//                     <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Dashboard</h1>
//                     <p className="text-gray-400 text-sm sm:text-base">
//                         Manage your crowdfunding campaigns on Lisk Sepolia
//                     </p>
//                 </div>
//                 <button
//                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 w-full lg:w-auto"
//                     onClick={() => setIsModalOpen(true)}
//                 >
//                     + Create Campaign
//                 </button>
//             </div>

//             {/* Stats Row - Responsive */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                 <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-400">Total Campaigns</p>
//                             <p className="text-2xl font-bold text-white">
//                                 {isLoadingMyCampaigns ? (
//                                     <span className="flex items-center space-x-2">
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
//                                         <span>Loading...</span>
//                                     </span>
//                                 ) : (
//                                     myCampaigns?.length || 0
//                                 )}
//                             </p>
//                         </div>
//                         <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
//                             <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-400">Network</p>
//                             <p className="text-2xl font-bold text-white">Lisk Sepolia</p>
//                         </div>
//                         <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
//                             <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-400">Wallet</p>
//                             <p className="text-lg font-bold text-white truncate max-w-[120px] sm:max-w-[160px]">
//                                 {account?.address ? `${account.address.slice(0,6)}...${account.address.slice(-4)}` : "Not connected"}
//                             </p>
//                         </div>
//                         <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
//                             <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 {account && (
//                     <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-400">Factory Contract</p>
//                                 <p className="text-sm font-mono text-white truncate max-w-[120px] sm:max-w-[160px]">
//                                     {CROWDFUNDING_FACTORY.slice(0, 6)}...{CROWDFUNDING_FACTORY.slice(-4)}
//                                 </p>
//                             </div>
//                             <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
//                                 <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Campaigns Section */}
//             <div className="mb-8">
//                 <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-between">
//                     <span>My Campaigns</span>
//                     <span className="text-sm text-gray-400">
//                         {isLoadingMyCampaigns ? "Loading..." : `${myCampaigns?.length || 0} campaigns`}
//                     </span>
//                 </h2>
                
//                 {/* Loading State */}
//                 {isLoadingMyCampaigns && (
//                     <div className="col-span-full flex items-center justify-center py-12">
//                         <div className="flex flex-col items-center space-y-4">
//                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
//                             <p className="text-gray-400">Loading your campaigns...</p>
//                         </div>
//                     </div>
//                 )}

//                 {/* Empty State */}
//                 {!isLoadingMyCampaigns && (!myCampaigns || myCampaigns.length === 0) && account && (
//                     <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
//                         <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4zm-9-8V4m0 0L9 4m-9 0l9 0m-9 8v10M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">No Campaigns Yet</h3>
//                         <p className="text-gray-400 mb-6">Get started by creating your first crowdfunding campaign</p>
//                         <button
//                             className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
//                             onClick={() => setIsModalOpen(true)}
//                         >
//                             Create Your First Campaign
//                         </button>
//                     </div>
//                 )}

//                 {/* No Wallet Connected */}
//                 {!account && !isLoadingMyCampaigns && (
//                     <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
//                         <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
//                         <p className="text-gray-400 mb-6">Connect your wallet to view and manage your campaigns</p>
//                     </div>
//                 )}

//                 {/* Campaigns Grid - Responsive */}
//                 {!isLoadingMyCampaigns && myCampaigns && myCampaigns.length > 0 && account && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {myCampaigns.map((campaign, index) => (
//                             <CampaignCard
//                                 key={campaign.campaignAddress}
//                                 campaignAddress={campaign.campaignAddress}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Create Campaign Modal - Responsive */}
//             {isModalOpen && (
//                 <CreateCampaignModal
//                     setIsModalOpen={setIsModalOpen}
//                     refetch={refetch}
//                 />
//             )}
//         </div>
//     )
// }

// type CreateCampaignModalProps = {
//     setIsModalOpen: (value: boolean) => void
//     refetch: () => void
// }

// const CreateCampaignModal = ({ setIsModalOpen, refetch }: CreateCampaignModalProps) => {
//     const account = useActiveAccount();
//     const [isDeployingContract, setIsDeployingContract] = useState<boolean>(false);
//     const [campaignName, setCampaignName] = useState<string>("");
//     const [campaignDescription, setCampaignDescription] = useState<string>("");
//     const [campaignGoal, setCampaignGoal] = useState<number>(1);
//     const [campaignDeadline, setCampaignDeadline] = useState<number>(7); // Default 7 days
    
//     // Deploy contract from CrowdfundingFactory - Adapted for Lisk Sepolia
//     const handleDeployContract = async () => {
//         if (!account) {
//             alert("Please connect your wallet first");
//             return;
//         }

//         setIsDeployingContract(true);
//         try {
//             console.log("Deploying campaign contract...");
            
//             // Convert goal to wei (assuming ETH)
//             const goalInWei = BigInt(campaignGoal * 1e18);
//             const deadlineTimestamp = Math.floor(Date.now() / 1000) + (campaignDeadline * 24 * 60 * 60);

//             const contractAddress = await deployPublishedContract({
//                 client: client,
//                 chain: defineChain(4202), // Lisk Sepolia
//                 account: account,
//                 contractId: "Crowdfunding", // Your contract ID
//                 contractParams: [
//                     campaignName,
//                     campaignDescription,
//                     goalInWei,
//                     BigInt(deadlineTimestamp)
//                 ],
//                 // Update these with your actual published contract details
//                 publisher: "YOUR_PUBLISHER_ADDRESS", 
//                 version: "1.0.0",
//             });

//             alert(`Campaign created successfully!\nAddress: ${contractAddress}`);
//             setIsModalOpen(false);
//             refetch(); // Refresh campaigns list
//             // Reset form
//             setCampaignName("");
//             setCampaignDescription("");
//             setCampaignGoal(1);
//             setCampaignDeadline(7);
            
//         } catch (error) {
//             console.error("Deployment error:", error);
//             alert(`Failed to create campaign: ${error instanceof Error ? error.message : "Unknown error"}`);
//         } finally {
//             setIsDeployingContract(false);
//         }
//     };

//     const handleCampaignGoal = (value: number) => {
//         setCampaignGoal(Math.max(0.01, value)); // Minimum 0.01 ETH
//     };

//     const handleCampaignDeadline = (value: number) => {
//         setCampaignDeadline(Math.max(1, value)); // Minimum 1 day
//     };

//     return (
//         <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50">
//             <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                     <h3 className="text-xl font-semibold text-gray-900">Create New Campaign</h3>
//                     <button
//                         onClick={() => setIsModalOpen(false)}
//                         className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
//                         disabled={isDeployingContract}
//                     >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Form */}
//                 <div className="p-6 max-h-[70vh] overflow-y-auto">
//                     <div className="space-y-6">
//                         {/* Campaign Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Campaign Name *
//                             </label>
//                             <input 
//                                 type="text" 
//                                 value={campaignName}
//                                 onChange={(e) => setCampaignName(e.target.value)}
//                                 placeholder="e.g., Save the Rainforest Initiative"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                 disabled={isDeployingContract}
//                                 required
//                             />
//                         </div>

//                         {/* Campaign Description */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Description *
//                             </label>
//                             <textarea
//                                 value={campaignDescription}
//                                 onChange={(e) => setCampaignDescription(e.target.value)}
//                                 placeholder="Tell your story - why should people support this campaign?"
//                                 rows={4}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                                 disabled={isDeployingContract}
//                                 required
//                             />
//                         </div>

//                         {/* Campaign Goal */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Funding Goal (ETH) *
//                             </label>
//                             <div className="relative">
//                                 <input 
//                                     type="number"
//                                     step="0.01"
//                                     min="0.01"
//                                     value={campaignGoal}
//                                     onChange={(e) => handleCampaignGoal(parseFloat(e.target.value) || 0)}
//                                     placeholder="1.00"
//                                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     disabled={isDeployingContract}
//                                     required
//                                 />
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <span className="text-gray-500 text-sm">Ξ</span>
//                                 </div>
//                             </div>
//                             <p className="mt-1 text-xs text-gray-500">Minimum 0.01 ETH</p>
//                         </div>

//                         {/* Campaign Deadline */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Campaign Duration (Days) *
//                             </label>
//                             <div className="relative">
//                                 <input 
//                                     type="number"
//                                     min="1"
//                                     max="365"
//                                     value={campaignDeadline}
//                                     onChange={(e) => handleCampaignDeadline(parseInt(e.target.value) || 1)}
//                                     placeholder="30"
//                                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     disabled={isDeployingContract}
//                                     required
//                                 />
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <span className="text-gray-500 text-sm">⏰</span>
//                                 </div>
//                             </div>
//                             <p className="mt-1 text-xs text-gray-500">Maximum 365 days</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 space-x-3">
//                     <button
//                         onClick={() => setIsModalOpen(false)}
//                         className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
//                         disabled={isDeployingContract}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleDeployContract}
//                         disabled={isDeployingContract || !campaignName || !campaignDescription || campaignGoal < 0.01}
//                         className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
//                     >
//                         {isDeployingContract ? (
//                             <>
//                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                                 <span>Creating Campaign...</span>
//                             </>
//                         ) : (
//                             <>
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                 </svg>
//                                 <span>Create Campaign</span>
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }