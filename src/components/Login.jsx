import { Mail, Lock, LogIn } from 'lucide-react';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-300 mb-2">Welcome Back</h1>
                <p className="text-gray-400">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                    <div className="flex items-center bg-[#2c3034] border border-gray-600/40 rounded-lg px-4 py-3 group-focus-within:border-blue-500/60 group-focus-within:bg-[#323539] transition">
                        <Mail size={20} className="mr-3 text-blue-400" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                            required
                        />
                    </div>
                </div>

                <div className="relative group">
                    <div className="flex items-center bg-[#2c3034] border border-gray-600/40 rounded-lg px-4 py-3 group-focus-within:border-blue-500/60 group-focus-within:bg-[#323539] transition">
                        <Lock size={20} className="mr-3 text-blue-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition transform shadow-lg hover:shadow-blue-500/20"
                >
                    <LogIn size={20} />
                    Sign In
                </button>
            </form>

        </div>
    );
}
export default Login;