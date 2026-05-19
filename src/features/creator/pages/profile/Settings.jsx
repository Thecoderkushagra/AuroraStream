import { Save, Image as ImageIcon, Twitter, Instagram, Youtube } from "lucide-react";

export default function Settings() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Creator Settings</h1>
                <p className="text-secondary">Customize your public profile and channel details.</p>
            </div>

            <div className="card p-6 md:p-8 space-y-8">
                {/* Basic Info */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-primary border-b border-[var(--color-border)] pb-2">Basic Information</h2>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Display Name</label>
                        <input 
                            type="text" 
                            defaultValue="Alex Sterling"
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Channel Description</label>
                        <textarea 
                            rows={4}
                            defaultValue="Filmmaker & Visual Artist. Exploring the intersection of technology and human emotion through sci-fi and documentary filmmaking."
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] resize-none"
                        />
                    </div>
                </div>

                {/* Branding */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-primary border-b border-[var(--color-border)] pb-2">Branding</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-primary">Profile Image</label>
                            <div className="flex items-center gap-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" 
                                    alt="Current profile" 
                                    className="w-20 h-20 rounded-full object-cover bg-surface"
                                />
                                <button className="btn-ghost px-4 py-2 text-sm">Change Image</button>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-primary">Banner Image</label>
                            <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-hover hover:border-[var(--color-primary)] transition-colors h-32">
                                <ImageIcon className="w-6 h-6 text-muted mb-2" />
                                <p className="text-sm text-primary font-medium">Upload new banner</p>
                                <p className="text-xs text-muted mt-1">1200x300 recommended</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-primary border-b border-[var(--color-border)] pb-2">Social Links</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Youtube className="w-5 h-5 text-[#FF0000]" />
                            <input 
                                type="text" 
                                placeholder="YouTube channel URL" 
                                className="flex-1 px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                            <input 
                                type="text" 
                                placeholder="X/Twitter profile URL" 
                                className="flex-1 px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Instagram className="w-5 h-5 text-[#E1306C]" />
                            <input 
                                type="text" 
                                placeholder="Instagram profile URL" 
                                className="flex-1 px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 flex justify-end gap-4 border-t border-[var(--color-border)]">
                    <button className="btn-ghost px-6 py-2">Discard Changes</button>
                    <button className="btn-primary px-6 py-2 flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
