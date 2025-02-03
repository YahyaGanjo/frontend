// app/page.js
'use client'; // Required for client-side interactivity (useState/useEffect)

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="border p-4 rounded-lg">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.cuisine}</p>
            <p className="text-yellow-500">⭐ {restaurant.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}