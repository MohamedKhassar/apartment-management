import { useState, useEffect } from "react";

const useNetworkStatus = () => {
    // Assume online by default since this runs client-side
    const [isOnline, setIsOnline] = useState<boolean>(true);

    useEffect(() => {
        const updateNetworkStatus = () => {
            setIsOnline(navigator.onLine);
        };

        // Initial status update
        updateNetworkStatus();

        // Add event listeners
        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        return () => {
            // Clean up event listeners
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);
        };
    }, []);

    return isOnline;
};

export default useNetworkStatus;
