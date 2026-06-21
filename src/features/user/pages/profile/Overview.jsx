import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
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
              <span className="text-primary font-medium">john_doe</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Email Address</span>
              <span className="text-primary font-medium">john@example.com</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Account Role</span>
              <span className="text-primary font-medium">User</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">Member Since</span>
              <span className="text-primary font-medium">Jan 2024</span>
            </div>
          </div>
        </div>

        {/* Subscription Summary */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-primary mb-4">Subscription Summary</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Current Plan</span>
              <span className="text-accent font-medium">Premium</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Status</span>
              <span className="text-[color:var(--color-live)] font-medium">Active</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">Renewal Date</span>
              <span className="text-primary font-medium">Dec 15, 2024</span>
            </div>
          </div>
        </div>

        {/* Watch Statistics */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-primary mb-4">Watch Statistics</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Total Watch Time</span>
              <span className="text-primary font-medium">142 Hours</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-muted">Videos Watched</span>
              <span className="text-primary font-medium">350</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">Items in My List</span>
              <span className="text-primary font-medium">24</span>
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
