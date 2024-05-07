
'use client'
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

export default function Loading() {
    const { isLoading } = useAuth();

    return (
        <>
            {isLoading ?
                <div className="fixed flex justify-center items-center w-full h-screen bg-black/50 z-40">
                    {/* <div className="border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div> */}
                    <img src="/v2/assets/load.gif" alt="" className="w-24 h-24" />
                </div>
                : null}
        </>
    );
};
