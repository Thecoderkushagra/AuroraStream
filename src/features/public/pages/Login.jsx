// features/public/pages/Login.jsx

export default function Login() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Login</h2>

            <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-3 bg-[#1a1d20] rounded"
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 bg-[#1a1d20] rounded"
            />

            <button className="w-full bg-white text-black py-2 rounded">
                Login
            </button>
        </div>
    );
}