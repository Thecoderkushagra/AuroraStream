import { Upload, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

export default function UploadEpisode() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Upload Episode</h1>
                <p className="text-secondary">Add a new episode to an existing series.</p>
            </div>

            <div className="card p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Select Series</label>
                    <select className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] appearance-none">
                        <option value="">Choose an existing series...</option>
                        <option value="1">Stranger Realms</option>
                        <option value="2">Cosmic Chronicles</option>
                        <option value="3">Tech in 2050</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Season Number</label>
                        <input 
                            type="number" 
                            min="1"
                            placeholder="e.g. 1" 
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Episode Number</label>
                        <input 
                            type="number" 
                            min="1"
                            placeholder="e.g. 4" 
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Episode Title</label>
                    <input 
                        type="text" 
                        placeholder="e.g. The Awakening" 
                        className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Description</label>
                    <textarea 
                        rows={3}
                        placeholder="What happens in this episode?" 
                        className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Episode Thumbnail</label>
                        <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-hover hover:border-[var(--color-primary)] transition-colors h-40">
                            <ImageIcon className="w-8 h-8 text-muted mb-2" />
                            <p className="text-sm text-primary font-medium">Upload thumbnail</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Video File</label>
                        <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-hover hover:border-[var(--color-primary)] transition-colors h-40">
                            <VideoIcon className="w-8 h-8 text-muted mb-2" />
                            <p className="text-sm text-primary font-medium">Upload video</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-4 border-t border-[var(--color-border)]">
                    <button className="btn-ghost px-6 py-2">Save Draft</button>
                    <button className="btn-primary px-6 py-2 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload Episode</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
