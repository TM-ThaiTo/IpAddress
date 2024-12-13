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
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<string | null>(null); // Thêm state để lưu địa chỉ


  const fetchLocationDetails = async (lat: number, lon: number) => {
    console.log('check ', lat, lon);
    const apiKey = '2957dd5070844700a7c254fce8cef57a';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted;
        console.log('Address:', formattedAddress);

        // Tách chuỗi địa chỉ thành các phần
        const addressParts: string[] = formattedAddress.split(',');

        // Tìm phần chứa "Quận" và lấy nó
        const district = addressParts.find(part => part.includes("Quận"));
        console.log('District:', district); // In ra Quận 12 hoặc kết quả tương ứng

        // Nếu bạn muốn lấy phần gần cuối địa chỉ, có thể làm như sau
        console.log('Region or District (last part - 1):', addressParts[addressParts.length - 1]);
        console.log('Region or District (last part - 2):', addressParts[addressParts.length - 2]);

        setAddress(formattedAddress); // Lưu địa chỉ vào state

      } else {
        console.error('Error: No results found');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  // Lấy vị trí người dùng từ API
  useEffect(() => {
    const fetchLocation = async () => {
      const res = await fetch('/api/location');
      const data = await res.json();

      console.log('check data: ', data);
      if (res.ok) {
        setLocation(data);
        fetchLocationDetails(data?.lat, data?.lon);
      } else {
        console.error(data.error);
      }
    };

    fetchLocation();
  }, []);

  // Gọi API OpenCage để lấy địa chỉ từ lat và lon


  // Gọi hàm fetchLocationDetails khi có vị trí (lat, lon)
  // useEffect(() => {
  //   if (location) {
  //     fetchLocationDetails(location.lat, location.lon);
  //   }
  // }, [location]);

  // Hiển thị loading khi chưa có dữ liệu
  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Location:</h2>
      <p>City: {location.city}</p>
      <p>Region: {location.region}</p>
      <p>Country: {location.country}</p>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lon}</p>

      {address && (
        <div>
          <h3>Full Address:</h3>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}
