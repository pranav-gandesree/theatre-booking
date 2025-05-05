'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Cake {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface DataContextType {
  cakes: Cake[];
  addons: Addon[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch cakes and addons concurrently
        const [cakesRes, addonsRes] = await Promise.all([
          fetch("/api/cakes"),
          fetch("/api/addons")
        ]);
        
        if (!cakesRes.ok || !addonsRes.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const cakesData = await cakesRes.json();
        const addonsData = await addonsRes.json();
        
        setCakes((Array.isArray(cakesData.cakes) ? cakesData.cakes : []));
        setAddons(Array.isArray(addonsData.addons) ? addonsData.addons : []);
      } catch (error) {
        console.error("Error fetching cakes and addons:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ cakes, addons, loading }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
