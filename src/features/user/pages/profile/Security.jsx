import React from 'react';

const Security = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary">Security</h1>
      
      {/* Password Form */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Change Password</h2>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted">Current Password</label>
            <input 
              type="password" 
              className="bg-base border border-[var(--color-border)] rounded-lg px-4 py-2 text-primary outline-none focus:border-[var(--color-border-strong)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted">New Password</label>
            <input 
              type="password" 
              className="bg-base border border-[var(--color-border)] rounded-lg px-4 py-2 text-primary outline-none focus:border-[var(--color-border-strong)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted">Confirm New Password</label>
            <input 
              type="password" 
              className="bg-base border border-[var(--color-border)] rounded-lg px-4 py-2 text-primary outline-none focus:border-[var(--color-border-strong)]"
            />
          </div>
          
          <button type="button" className="mt-2 w-fit bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Update Password
          </button>
        </form>
      </div>

      {/* Active Sessions */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Active Sessions</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
            <div>
              <p className="text-primary font-medium">Windows PC - Chrome</p>
              <p className="text-sm text-muted">Last active: Current session</p>
            </div>
            <button className="text-sm text-muted font-medium py-1 px-3 border border-[var(--color-border)] rounded-md bg-base hover:bg-elevated transition-colors">
              Revoke
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">iPhone 14 - Safari</p>
              <p className="text-sm text-muted">Last active: 2 hours ago</p>
            </div>
            <button className="text-sm text-muted font-medium py-1 px-3 border border-[var(--color-border)] rounded-md bg-base hover:bg-elevated transition-colors">
              Revoke
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-surface rounded-xl p-6 border border-red-900/50">
        <h2 className="text-xl font-semibold text-[color:var(--color-error)] mb-2">Danger Zone</h2>
        <p className="text-sm text-muted mb-6">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="bg-red-500/10 text-[color:var(--color-error)] px-6 py-2 rounded-lg font-semibold border border-red-500/20 hover:bg-red-500/20 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Security;
