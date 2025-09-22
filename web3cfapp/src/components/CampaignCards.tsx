import Link from "next/link";
import { client } from "../app/client"
import { getContract } from "thirdweb"
import { defineChain } from "thirdweb/chains"
import { useReadContract } from "thirdweb/react"

interface CampaignCardProps {
 campaignAddress: string,
} 

export default function CampaignCard({ campaignAddress }: CampaignCardProps) {
      const liskSepolia = defineChain(4202);
      const contract = getContract({
      client: client,
      chain: liskSepolia,
      address: campaignAddress,
      });

      // Get Campaign Name - Tutorial style naming
      const { data: name } = useReadContract({
      contract,
      method: "function name() view returns (string)",
      params: [],
      });

      // Get Campaign Description - Tutorial style naming
      const { data: description } = useReadContract({
      contract,
      method: "function description() view returns (string)",
      params: [],
      });

      // Get Goal - Tutorial style naming with loading states
      const { data: goal, isLoading: isLoadingGoal } = useReadContract({
      contract,
      method: "function goal() view returns (uint256)",
      params: [],
      });

      // Get Balance - Tutorial style naming with loading states
      const { data: balance, isLoading: isLoadingBalance } = useReadContract({
      contract,
      method: "function getContractBalance() view returns (uint256)",
      params: [],
      });

      // Calculate progress - Simplified version of your logic
      const totalBalance = balance?.toString() || "0";
      const totalGoal = goal?.toString() || "1";
      const balancePercentage = totalGoal !== "0" 
      ? Math.min((parseInt(totalBalance) / parseInt(totalGoal)) * 100, 100)
      : 0;

      // Format ETH amounts
      const formatEth = (wei: string | bigint): string => {
      const amount = typeof wei === 'bigint' ? wei : BigInt(wei);
      return (Number(amount) / 1e18).toFixed(2);
      };

      // Loading state for progress section
        const isProgressLoading = isLoadingGoal || isLoadingBalance;

        return (
        <div className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow hover:shadow-lg transition-all duration-300">
        <div>
            {/* Simplified Progress Bar - Your feature, tutorial style */}
            {!isProgressLoading && goal && balance && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>{formatEth(totalBalance)} ETH</span>
                <span>{balancePercentage.toFixed(0)}%</span>
              </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${balancePercentage}%` }}
                />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Goal: {formatEth(totalGoal)} ETH</span>
                <span className={balancePercentage >= 100 ? "text-green-600 font-medium" : ""}>
                {balancePercentage >= 100 ? "Funded!" : "Active"}
                </span>
            </div>
          </div>
        )}

        {/* Campaign Name - Exact Tutorial Structure */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {name || "Loading..."}
        </h5>
        
        {/* Campaign Description - Exact Tutorial Structure */}
            <p className="mb-4 font-normal text-gray-700 text-sm leading-relaxed">
            {description || "No description available"}
            </p>
        </div>

        {/* View Campaign Button - Exact Tutorial Structure */}
        <Link href={`/Campaign/${campaignAddress}`} passHref={true}>
            <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 transition-all duration-200 group">
              View Campaign
                <svg 
                className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 14 10"
                >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </button>
         </Link>
        </div>
        );
  }