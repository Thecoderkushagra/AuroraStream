import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import { useState } from 'react';
import { Play, Film } from 'lucide-react';

const Auth = () => {
    const [haveAccount, setHaveAccount] = useState(true);

    return (
        <div className="min-h-screen bg-[#1a1d20] text-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 gap-12">
                {/* Left side - Branding section */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-lg">
                                <Film size={32} className="text-white" />
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                                Aurora Stream
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                            Experience unlimited anime and entertainment. Stream your favorite shows anytime, anywhere.
                        </p>
                    </div>

                    {/* Features preview */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Play size={20} className="text-blue-400 flex-shrink-0" />
                            <span>Thousands of anime titles at your fingertips</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <Play size={20} className="text-blue-400 flex-shrink-0" />
                            <span>Watch on any device, resumed where you left off</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <Play size={20} className="text-blue-400 flex-shrink-0" />
                            <span>High definition streaming experience</span>
                        </div>
                    </div>
                </div>

                {/* Right side - Auth form */}
                <div className="w-full lg:w-1/2 max-w-md">
                    {/* Mobile branding */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-lg">
                                <Film size={24} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                                Aurora
                            </h1>
                        </div>
                    </div>

                    <div className="bg-[#212529]/70 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-blue-500/20 hover:border-blue-500/40 transition duration-300">
                        {haveAccount ? <Login /> : <Signup />}

                        <div className="mt-8 pt-6 border-t border-gray-600/30">
                            <p className="text-center text-gray-400 text-sm">
                                {haveAccount ? "Don't have an account?" : "Already have an account?"}
                                <span className="ml-2 text-blue-400 hover:text-blue-300 cursor-pointer font-semibold transition">
                                    {haveAccount ?
                                        <button onClick={() => setHaveAccount(false)} className="hover:underline">
                                            Sign up
                                        </button> :
                                        <button onClick={() => setHaveAccount(true)} className="hover:underline">
                                            Sign in
                                        </button>
                                    }
                                </span>
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-gray-500 text-xs mt-6">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Auth;