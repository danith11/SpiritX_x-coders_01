"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

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
                    headers: {Authorization: `Bearer ${token}`},
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
        <div className="max-w-md mx-auto mt-10 text-center">
            <h1 className="text-2xl mb-4">Hello, {username}!</h1>
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Welcome;
