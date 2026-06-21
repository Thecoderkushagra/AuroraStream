
export default function Privacy() {
    return (
        <div className="min-h-screen bg-base text-secondary pt-8">
            <div className="max-w-3xl mx-auto p-8 bg-surface rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-primary">Privacy Policy</h1>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                    <p className="text-sm">
                        We collect minimal user data. This includes your email and name ONLY when you voluntarily create an account.
                        We do NOT track your viewing habits, location, or IP address.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                    <p className="text-sm">
                        Your email is used solely for account authentication and password recovery.
                        We do not sell, rent, or share your personal data with any third-party advertisers.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
                    <p className="text-sm">
                        Your data is encrypted and stored securely. We implement industry-standard measures to protect your information from unauthorized access.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">4. Changes to This Policy</h2>
                    <p className="text-sm">
                        We may update this privacy policy from time to time. Any changes will be posted on this page.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">5. Contact Us</h2>
                    <p className="text-sm">
                        If you have any questions regarding this policy, please contact us at [EMAIL_ADDRESS].
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}   