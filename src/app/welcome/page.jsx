"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      console.log("Token from localStorage:", token);

      if (!token) {
        console.log("No token found, redirecting to login...");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/session", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.log("Invalid token response from API, redirecting...");
          throw new Error("Invalid token");
        }

        const data = await res.json();
        console.log("User authenticated:", data);
        setUsername(data.username);
      } catch (error) {
        console.log("Error fetching session:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-400 from-10% to-purple-50 to-90% p-6">
      <div className=" max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <h1 className="text-4xl font-medium  mb-6">
          Hi There,{" "}
          <span className="font-bold">
            {username}
          </span>{" "}
          👋
        </h1>
        <p>
          This project was developed as a submission for the Xcelerate hackathon
          organized by Mora360. The contributors to this project are Yethum
          Danith, Kaveesha Sulakshana, and Pramuka Navodh. In this project, we
          implemented the signup and login features of a software system
          following the provided guidelines.{" "}
        </p>

        <button
          onClick={handleLogout}
          className="w-full my-5 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
