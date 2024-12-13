'use client';
import { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho thông tin vị trí
interface Location {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export default function Home() {
  // Sử dụng kiểu dữ liệu Location thay vì any
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await fetch('/api/location');
      const data = await res.json();

      console.log('check dataL ', res);
      if (res.ok) {
        setLocation(data);
      } else {
        console.error(data.error);
      }
    };

    fetchLocation();
  }, []);

  console.log('check location: ', location);
  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Location:</h2>
      <p style={{ color: 'white' }}>City: {location.city}</p>
      <p>Region: {location.region}</p>
      <p>Country: {location.country}</p>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lon}</p>
    </div>
  );
}
