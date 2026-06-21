import { MonitorPlay, Image as ImageIcon, Plus } from "lucide-react";

export default function CreateSeries() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Create Series</h1>
                <p className="text-secondary">Set up a new series before uploading its episodes.</p>
            </div>

            <div className="card p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Series Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Stranger Realms" 
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Genre</label>
                        <select className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] appearance-none">
                            <option value="">Select a genre...</option>
                            <option value="scifi">Sci-Fi</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="drama">Drama</option>
                            <option value="thriller">Thriller</option>
                            <option value="comedy">Comedy</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Description</label>
                    <textarea 
                        rows={4}
                        placeholder="What is this series about?" 
                        className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Series Poster</label>
                    <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-hover hover:border-[var(--color-primary)] transition-colors h-48">
                        <ImageIcon className="w-8 h-8 text-muted mb-2" />
                        <p className="text-sm text-primary font-medium">Click to upload poster</p>
                        <p className="text-xs text-muted mt-1">Recommended: 1920x1080 (16:9) PNG/JPG</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Release Year</label>
                        <input 
                            type="number" 
                            placeholder="e.g. 2025" 
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Age Rating</label>
                        <select className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] appearance-none">
                            <option value="tv-y">TV-Y</option>
                            <option value="tv-pg">TV-PG</option>
                            <option value="tv-14">TV-14</option>
                            <option value="tv-ma">TV-MA</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-4 border-t border-[var(--color-border)]">
                    <button className="btn-ghost px-6 py-2">Cancel</button>
                    <button className="btn-primary px-6 py-2 flex items-center gap-2">
                        <MonitorPlay className="w-4 h-4" />
                        <span>Create Series</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
