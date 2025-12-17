'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user)
      if (user) {
        setUser({
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
        });
      }
    };

    fetchUser();
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };


  return (
    <aside className={styles.sidebar}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-purple-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            ></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold">SmartWallet</h1>
        </div>
        <div>
        <nav className="space-y-1">
          <Link href='/dashboard'
            className={`${styles.navItem} w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${isActive('/dashboard') ? styles.active : ''}`}
            id="nav-dashboard"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Dashboard
          </Link>
          <Link href='/dashboard/transactions'
            className={`${styles.navItem} w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${isActive('/dashboard/transactions') ? styles.active : ''}`}
            id="nav-transactions"
          >
            
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            Transakcje
          </Link>
          <Link href='/dashboard/add_transaction'
            className={`${styles.navItem} w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${isActive('/dashboard/add_transaction') ? styles.active : ''}`}
            id="nav-add-transaction"
          >
            
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Dodaj transakcję
          </Link>
          <Link href='/dashboard/budget'
            className={`${styles.navItem} w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${isActive('/dashboard/budget') ? styles.active : ''}`}
            id="nav-budget"
          >
            
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            Budżet
          </Link>
          <Link href='/dashboard/statistics'
            className={`${styles.navItem} w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${isActive('/dashboard/statistics') ? styles.active : ''}`}
            id="nav-statistics"
          >
            
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Statystyki
          </Link>
          <Link href='/dashboard/profile'
            className={`${styles.navItem} w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${isActive('/dashboard/profile') ? styles.active : ''}`}
            id="nav-profile"
          >
            
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            Profil
          </Link>
        </nav>
      </div>
      <div className="mt-auto pt-8 border-t border-white border-opacity-10">
        
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-5 cursor-pointer transition">

          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-sm font-bold text-purple-900">

            {user ? getInitials(user.name) : 'U'}
          </div>
          <div>

            <p className="font-medium text-sm">{user?.name || 'Ładowanie...'}</p>
            <p className="text-xs opacity-70">{user?.email || ''}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
