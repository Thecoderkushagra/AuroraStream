import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext';

const Overview = () => {
  const { viewer, loading, error } = useUser();

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatRenewalDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatRole = (role) => {
    if (!role) return 'User';
    return role.replace('ROLE_', '').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] w-full">
        <div className="text-xl text-muted animate-pulse">Loading Account Overview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-xl mx-auto text-center gap-4">
        <h2 className="text-2xl font-bold text-[color:var(--color-error)]">Failed to Load Profile</h2>
        <p className="text-muted">{error.message || 'An error occurred while loading your profile data. Please try again later.'}</p>
      </div>
    );
  }

  if (!viewer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-xl mx-auto text-center gap-4">
        <h2 className="text-2xl font-bold text-primary">No Active Session</h2>
        <p className="text-muted">Please log in to access your profile overview.</p>
        <Link to="/login" className="btn-primary px-6 py-2 rounded-lg font-semibold mt-2">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary">Account Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-primary mb-4">Account Information</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Username</span>
              <span className="text-primary font-medium">{viewer.username || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Email Address</span>
              <span className="text-primary font-medium">{viewer.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Account Role</span>
              <span className="text-primary font-medium">{formatRole(viewer.role)}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">Member Since</span>
              <span className="text-primary font-medium">{formatDate(viewer.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Subscription Summary */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-primary mb-4">Subscription Summary</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Current Plan</span>
              <span className="text-accent font-medium">{viewer.currentPlan || 'Free Plan'}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Status</span>
              <span className={`font-medium ${viewer.planStatus?.toLowerCase() === 'active' ? 'text-[color:var(--color-live)]' : 'text-muted'}`}>
                {viewer.planStatus || 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">Renewal Date</span>
              <span className="text-primary font-medium">{formatRenewalDate(viewer.renewalDate)}</span>
            </div>
          </div>
        </div>

        {/* Watch Statistics */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-primary mb-4">Watch Statistics</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Total Watch Time</span>
              <span className="text-primary font-medium">{viewer.totalWatchTime || 0} Hours</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Videos Watched</span>
              <span className="text-primary font-medium">{viewer.videosWatched || 0}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">Items in My List</span>
              <span className="text-primary font-medium">{viewer.myList || 0}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link to="/user/profile/billing" className="w-full text-center bg-elevated text-primary py-2 rounded-lg font-medium hover:bg-[var(--color-bg-hover)] transition-colors">
              Manage Subscription
            </Link>
            <Link to="/user/profile/settings" className="w-full text-center bg-elevated text-primary py-2 rounded-lg font-medium hover:bg-[var(--color-bg-hover)] transition-colors">
              Account Settings
            </Link>
            <Link to="/user/profile/security" className="w-full text-center bg-elevated text-primary py-2 rounded-lg font-medium hover:bg-[var(--color-bg-hover)] transition-colors">
              Security Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
