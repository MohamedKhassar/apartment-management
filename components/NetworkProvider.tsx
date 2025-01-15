"use client";

import useNetworkStatus from "@/lib/useNetworkStatus";
import NetworkIsOff from "./NetworkIsOff";

export default function NetworkProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const isOnline = useNetworkStatus();

    return isOnline ? <>{children}</> : <NetworkIsOff />;
}
