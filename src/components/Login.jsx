import { Mail, Lock, LogIn } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext'; // adjust path

const Login = () => {
    const { login } = useAppContext();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const form = new FormData();
            form.append('userName', userName);
            form.append('password', password);

            const response = await axios.post('http://localhost:8080/user/auth/login', form,
                null
            );

            const { accessToken, refreshToken } = response.data;
            login(accessToken, refreshToken);

        } catch (err) {
            const msg = err.response?.data?.error ?? 'Something went wrong. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
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
                            type="text"                         // username, not email
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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

                {/* Error message */}
                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition transform shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <LogIn size={20} />
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default Login;