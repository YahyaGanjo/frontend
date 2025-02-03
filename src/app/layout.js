'use client';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      // Redirect logged-in users away from login page
      if (user && pathname === '/login') router.push('/');
      // Redirect unauthenticated users to login
      if (!user && pathname !== '/login') router.push('/login');
    });
    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}