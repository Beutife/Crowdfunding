'use client';
import Image from "next/image";
import Link from "next/link";
import thirdwebIcon from "@public/thirdweb.svg"
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";

const Navbar = () => {
    const account = useActiveAccount()
    
    return(
        <nav className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <Image 
                                src={thirdwebIcon}
                                alt="Your company"
                                width={32}
                                height={32}
                                className="drop-shadow-lg"
                                style={{
                                    filter: "drop-shadow(0px 0px 24px #a726a9a8)",
                                }}
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-900">
                                CampaignHub
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            <Link
                                href={'/'}
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-purple-50"
                            >
                                Campaign
                            </Link>
                            {account && (
                                <Link 
                                    href={`/dashboard/${account?.address}`}
                                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-purple-50"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div> 
                    </div>

                    {/* Connect Button */}
                    <div className="flex items-center">
                        <ConnectButton
                            client={client}
                            theme={lightTheme()}
                            detailsButton={{
                                style: {
                                    maxHeight: "40px",
                                    borderRadius: "8px",
                                }
                            }}
                        /> 
                    </div>

                    {/* Mobile menu button - Optional for future mobile menu */}
                    <div className="md:hidden">
                        <button className="p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation - Hidden by default, you can expand this */}
                <div className="md:hidden hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                        <Link
                            href={'/'}
                            className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                        >
                            Campaign
                        </Link>
                        {account && (
                            <Link 
                                href={`/dashboard/${account?.address}`}
                                className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </div> 
        </nav>
    )
}

export default Navbar;


