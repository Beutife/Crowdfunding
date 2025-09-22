import { prepareContractCall, ThirdwebContract } from "thirdweb";
import { TransactionButton } from "thirdweb/react";

type Tier = {
    name: string;
    amount: bigint;
    backers: bigint;
};

type TierCardProps = {
    tier: Tier;
    index: number;
    contract: ThirdwebContract;
    isEditing?: boolean; // Optional - defaults to false
};

const TierCard: React.FC<TierCardProps> = ({ 
    tier, 
    index, 
    contract, 
    isEditing = false 
}) => {
    // Format amount for better display (converting wei to readable format)
    const formatAmount = (amount: bigint): string => {
        const ethAmount = Number(amount) / 1e18; // Convert wei to ETH
        if (ethAmount < 0.01) {
            return `< 0.01 ETH`;
        }
        return `${ethAmount.toFixed(4)} ETH`;
    };

    return (
        <div className={`max-w-sm flex flex-col justify-between p-6 bg-white border rounded-lg shadow transition-all duration-200 ${
            isEditing 
                ? 'border-gray-300 hover:border-gray-400' 
                : 'border-slate-100 hover:border-blue-200 hover:shadow-md'
        }`}>
            {/* Tier Header */}
            <div className="mb-4">
                <div className="flex flex-row justify-between items-center">
                    <p className={`text-2xl font-semibold ${
                        isEditing ? 'text-gray-800' : 'text-gray-900'
                    }`}>
                        {tier.name}
                    </p>
                    <p className={`text-2xl font-semibold ${
                        isEditing 
                            ? 'text-gray-700' 
                            : 'text-blue-600'
                    }`}>
                        ${formatAmount(tier.amount)}
                    </p>
                </div>
            </div>

            {/* Backers Info */}
            <div className="flex flex-row justify-between items-end mb-4">
                <p className={`text-xs font-semibold ${
                    isEditing ? 'text-gray-600' : 'text-gray-500'
                }`}>
                    Total Backers: <span className="text-blue-600 font-bold">{tier.backers.toString()}</span>
                </p>
            </div>

            {/* Action Buttons - Your Original Structure */}
            <div className="space-y-2">
                {/* Fund Button - Always visible (your original code) */}
                <TransactionButton
                    transaction={() => prepareContractCall({
                        contract: contract,
                        method: "function fund(uint256 _tierIndex) payable",
                        params: [BigInt(index)],
                        value: tier.amount,
                    })}
                    onError={(error) => alert(`Error: ${error.message}`)}
                    onTransactionConfirmed={async () => {
                        alert("Funded successfully! Thank you for your support! 🎉");
                    }}
                    disabled={isEditing} // Disable when editing
                    style={{
                        marginTop: "0.5rem",
                        backgroundColor: isEditing ? "#9CA3AF" : "#2563EB",
                        color: "white",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.375rem",
                        cursor: isEditing ? "not-allowed" : "pointer",
                        opacity: isEditing ? 0.6 : 1,
                        fontWeight: "600",
                        width: "100%",
                        border: "none",
                        transition: "all 0.2s ease"
                    }}
                >
                    {isEditing ? "View Mode" : "Select Tier"}
                </TransactionButton>

                {/* Remove Button - Only in Edit Mode (your first version code) */}
                {isEditing && (
                    <TransactionButton
                        transaction={() => prepareContractCall({
                            contract: contract,
                            method: "function removeTier(uint256 _index)",
                            params: [BigInt(index)],
                        })}
                        onError={(error) => alert(`Error: ${error.message}`)}
                        onTransactionConfirmed={async () => {
                            alert("Tier removed successfully!");
                        }}
                        style={{
                            marginTop: "0.5rem",
                            backgroundColor: "#EF4444",
                            color: "white",
                            padding: "0.75rem 1rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            fontWeight: "600",
                            width: "100%",
                            border: "none",
                            transition: "all 0.2s ease"
                        }}
                    >
                        Remove Tier
                    </TransactionButton>
                )}
            </div>

            {/* Edit Mode Indicator */}
            {isEditing && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        ✏️ Edit Mode - Use "Remove" to delete this tier
                    </p>
                </div>
            )}
        </div>
    );
};

export default TierCard