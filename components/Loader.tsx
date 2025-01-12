'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

const Loader: React.FC = () => {
    const pathname = usePathname(); // Hook to get the current route

    useEffect(() => {
        const start = () => {
            NProgress.start();
        };

        const end = () => {
            NProgress.done();
        };

        // Listen for changes in pathname (navigation)
        start();
        const timeout = setTimeout(end, 500); // Simulate loading delay

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
};

export default Loader;
