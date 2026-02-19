import { Mail, Lock, LogIn, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('http://localhost:8080/user/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: username,
                    email,
                    password
                })
            });
            const data = await res.text();
            if (res.ok || res.status === 200) {
                toast.success('Signup successful. Please check your email for OTP.');
                setShowOtp(true);
            } else {
                toast.error(data?.message || 'Signup failed');
            }
        } catch (err) {
            toast.error('Network error');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const form = new FormData();
            form.append('Name', username);
            form.append('OTP', otp);

            const res = await fetch('http://localhost:8080/user/auth/otp', {
                method: 'POST',
                body: form
            });
            const data = await res.text();
            if (res.ok || res.status === 200) {
                toast.success('OTP verified. Account confirmed.');
                setShowOtp(false);
            } else {
                toast.error(data?.message || 'OTP verification failed');
            }
        } catch (err) {
            toast.error('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-300 mb-2">Aurora Stream</h1>
                <p className="text-gray-400">Sign up to make an account</p>
            </div>

            {!showOtp ? (
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
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition transform shadow-lg hover:shadow-blue-500/20"
                    >
                        <LogIn size={20} />
                        {loading ? 'Signing up...' : 'Sign-Up'}
                    </button>
                    {message && <p className="text-center text-sm text-gray-300 mt-2">{message}</p>}
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-5">
                    <div className="relative group">
                        <div className="flex items-center bg-[#2c3034] border border-gray-600/40 rounded-lg px-4 py-3 transition">
                            <input
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition transform shadow-lg hover:shadow-blue-500/20"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    {message && <p className="text-center text-sm text-gray-300 mt-2">{message}</p>}
                </form>
            )}
        </div>
    );
};
export default Signup;