import { Mail, Lock, LogIn, User } from 'lucide-react';
import { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-300 mb-2">Aurora Stream</h1>
                <p className="text-gray-400">Sign up to make an account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                    <div className="flex items-center bg-[#2c3034] border border-gray-600/40 rounded-lg px-4 py-3 group-focus-within:border-blue-500/60 group-focus-within:bg-[#323539] transition">
                        <User size={20} className="mr-3 text-blue-400" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                            required
                        />
                    </div>
                </div>

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
                    Sign-Up
                </button>
            </form>
        </div>
    );
}
export default Signup;