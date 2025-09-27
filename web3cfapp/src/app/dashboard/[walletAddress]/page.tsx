'use client';
import { client } from "@/app/client";
import { CROWDFUNDING_FACTORY } from "@/constant/contract";
import  MyCampaignCard  from "@/components/CampaignCards";
import { useState } from "react";
//import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
//import { deployPublishedContract } from "thirdweb/deploys";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export default function DashboardPage() {
    const account = useActiveAccount();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const liskSepolia = defineChain(4202);
    const contract = getContract({
        client: client,
        chain: liskSepolia,
        address: CROWDFUNDING_FACTORY,
    });

    // Get Campaigns
    const { data: myCampaigns, isLoading: isLoadingMyCampaigns, refetch } = useReadContract({
        contract: contract,
        method: "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [account?.address as string]
    });

    // Stats calculation
    const stats = {
        totalCampaigns: myCampaigns?.length || 0,
        totalRaised: "0.00", // You can calculate this from campaign data
        activeCampaigns: myCampaigns?.length || 0,
        totalBackers: 0 // You can calculate this from campaign data
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Dashboard
                                </h1>
                                {account && (
                                    <p className="mt-2 text-gray-600">
                                        Wallet: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                            {account.address.slice(0, 8)}...{account.address.slice(-6)}
                                        </span>
                                    </p>
                                )}
                            </div>
                            
                            <div className="mt-4 md:mt-0">
                                <button 
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Create Campaign
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalCampaigns}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Raised</p>
                                <p className="text-3xl font-bold text-green-600">{stats.totalRaised} ETH</p>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                                <p className="text-3xl font-bold text-blue-600">{stats.activeCampaigns}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Backers</p>
                                <p className="text-3xl font-bold text-purple-600">{stats.totalBackers}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campaigns Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>
                        {account && (
                            <span className="text-sm text-gray-500">
                                Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
                            </span>
                        )}
                    </div>

                    {/* Loading State */}
                    {isLoadingMyCampaigns && (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                            <span className="ml-2 text-gray-600">Loading campaigns...</span>
                        </div>
                    )}

                    {/* Campaigns Grid */}
                    {!isLoadingMyCampaigns && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCampaigns && myCampaigns.length > 0 ? (
                                myCampaigns.map((campaign, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-200">
                                        <MyCampaignCard
                                            campaignAddress={campaign.campaignAddress}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No campaigns yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first campaign.</p>
                                    <div className="mt-6">
                                        <button 
                                            onClick={() => setIsModalOpen(true)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                        >
                                            Create Your First Campaign
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Modal */}
            {isModalOpen && (
                <CreateCampaignModal
                    setIsModalOpen={setIsModalOpen}
                    refetch={refetch}
                />
            )}
        </div>
    );
}

type CreateCampaignModalProps = {
    setIsModalOpen: (value: boolean) => void;
    refetch: () => void;
}

const CreateCampaignModal = ({ setIsModalOpen, refetch }: CreateCampaignModalProps) => {
    const account = useActiveAccount();
    const [isDeployingContract, setIsDeployingContract] = useState<boolean>(false);
    const [campaignName, setCampaignName] = useState<string>("");
    const [campaignDescription, setCampaignDescription] = useState<string>("");
    const [campaignGoal, setCampaignGoal] = useState<number>(1);
    const [campaignDeadline, setCampaignDeadline] = useState<number>(1);
    
    // Use the hook at component level
    const { mutateAsync: sendTransaction } = useSendTransaction();
    
    // Create campaign using your factory contract
    const handleCreateCampaign = async () => {
        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }

        if (!campaignName || !campaignDescription) {
            alert("Please fill in all required fields!");
            return;
        }

        setIsDeployingContract(true);
        try {
            console.log("Creating campaign through factory...");
            const liskSepolia = defineChain(4202);
            
            // Use your factory contract
            const factoryContract = getContract({
                client: client,
                chain: liskSepolia,
                address: CROWDFUNDING_FACTORY,
            });

            // Calculate deadline timestamp
            const deadlineTimestamp = Math.floor(Date.now() / 1000) + (campaignDeadline * 24 * 60 * 60);
            
            // Prepare the transaction
            const transaction = prepareContractCall({
                contract: factoryContract,
                method: "function createCampaign(string _name, string _description, uint256 _goal, uint256 _deadline)",
                params: [
                    campaignName,
                    campaignDescription,
                    BigInt(campaignGoal * 10**18), // Convert ETH to Wei
                    BigInt(deadlineTimestamp)
                ],
            });

            // Execute the transaction
            const result = await sendTransaction(transaction);
            
            console.log("Campaign created successfully:", result);
            alert("Campaign created successfully!");
            refetch();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert(
                `Failed to create campaign: ${
                    typeof error === "object" && error !== null && "message" in error
                        ? (error as { message?: string }).message
                        : "Please try again."
                }`
            );
        } finally {
            setIsDeployingContract(false);
        }
    };

    // ... rest of your component JSX stays the same, but change the button onClick:

    return (
        // ... your existing JSX until the button
        <button
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={handleCreateCampaign} // Changed from handleDeployContract
            disabled={isDeployingContract}
        >
            {/* ... rest of button content */}
        </button>
    );
};