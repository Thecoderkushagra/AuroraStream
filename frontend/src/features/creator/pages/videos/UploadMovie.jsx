import { Upload, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

export default function UploadMovie() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Upload Movie</h1>
                <p className="text-secondary">Fill in the details below to publish a new movie to Aurora Stream.</p>
            </div>

            <div className="card p-6 md:p-8 space-y-6">
                {/* Title & Genre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Movie Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. The Cosmic Journey" 
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Genre</label>
                        <select className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] appearance-none">
                            <option value="">Select a genre...</option>
                            <option value="action">Action</option>
                            <option value="scifi">Sci-Fi</option>
                            <option value="drama">Drama</option>
                            <option value="comedy">Comedy</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Description</label>
                    <textarea 
                        rows={4}
                        placeholder="What is this movie about?" 
                        className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] resize-none"
                    />
                </div>

                {/* Media Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Thumbnail Poster</label>
                        <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-hover hover:border-[var(--color-primary)] transition-colors h-48">
                            <ImageIcon className="w-8 h-8 text-muted mb-2" />
                            <p className="text-sm text-primary font-medium">Click to upload poster</p>
                            <p className="text-xs text-muted mt-1">PNG, JPG up to 5MB</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Video File</label>
                        <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-hover hover:border-[var(--color-primary)] transition-colors h-48">
                            <VideoIcon className="w-8 h-8 text-muted mb-2" />
                            <p className="text-sm text-primary font-medium">Click to upload video</p>
                            <p className="text-xs text-muted mt-1">MP4, WEBM up to 10GB</p>
                        </div>
                    </div>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Release Date</label>
                        <input 
                            type="date" 
                            className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] [color-scheme:dark]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Age Rating</label>
                        <select className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] appearance-none">
                            <option value="g">G</option>
                            <option value="pg">PG</option>
                            <option value="pg13">PG-13</option>
                            <option value="r">R</option>
                            <option value="nc17">NC-17</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Visibility</label>
                        <select className="w-full px-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] appearance-none">
                            <option value="public">Public</option>
                            <option value="premium">Premium</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end gap-4 border-t border-[var(--color-border)]">
                    <button className="btn-ghost px-6 py-2">Save as Draft</button>
                    <button className="btn-primary px-6 py-2 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload Movie</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
