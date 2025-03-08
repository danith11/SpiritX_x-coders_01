import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    console.log("Token from cookie:", token);

    if (!token) {
        return new Response(JSON.stringify({ error: "No token provided" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const decoded = verifyToken(token);
        console.log("Decoded token:", decoded);
        return new Response(JSON.stringify({ username: decoded.username }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log("Token verification failed:", error);
        return new Response(JSON.stringify({ error: "Invalid token" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
}