import connectDB from "@/lib/db";
import {hashPassword, signToken} from "@/lib/auth";
import User from "@/models/User";

export async function POST(req) {
    await connectDB();

    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Username already exists" }), { status: 400 });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        const token = signToken(user);
        return new Response(JSON.stringify({ token }), { status: 201 });
    } catch (error) {
        console.error("-------Signup error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}