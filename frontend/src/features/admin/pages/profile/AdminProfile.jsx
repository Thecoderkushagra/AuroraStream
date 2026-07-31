import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export default function AdminProfile() {
  const [adminInfo, setAdminInfo] = useState({
    username: 'admin_user',
    email: 'admin@aurorastream.com',
    role: 'ROLE_ADMIN',
    createdAt: '2026-01-15T08:00:00.000Z'
  });

  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const token = Cookies.get('jwt');
    const decoded = decodeJwt(token);
    if (decoded) {
      setAdminInfo({
        username: decoded.userName || 'admin_user',
        email: decoded.email || `${decoded.userName || 'admin'}@aurorastream.com`,
        role: decoded.roles || 'ROLE_ADMIN',
        createdAt: decoded.createdAt || '2026-01-15T08:00:00.000Z'
      });
    }
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleUsernameChange = (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      toast.error('Username cannot be empty');
      return;
    }
    setAdminInfo(prev => ({ ...prev, username: newUsername }));
    toast.success('Username updated successfully (locally)');
    setNewUsername('');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('All password fields are required');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    toast.success('Password updated successfully (locally)');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-primary mt-6">Admin Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profile Info Block */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)] h-fit">
          <h2 className="text-xl font-semibold text-primary mb-6">Profile Information</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
              <span className="text-muted">Username</span>
              <span className="text-primary font-medium">{adminInfo.username}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
              <span className="text-muted">Email Address</span>
              <span className="text-primary font-medium">{adminInfo.email}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
              <span className="text-muted">System Role</span>
              <span className="text-accent font-medium">{adminInfo.role.replace('ROLE_', '')}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-muted">Member Since</span>
              <span className="text-primary font-medium">{formatDate(adminInfo.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Settings Actions Block */}
        <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)] space-y-8">
          
          {/* Change Username Form */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4">Change Username</h2>
            <form onSubmit={handleUsernameChange} className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">New Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full bg-base border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-primary outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Enter new username"
                  required
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-2.5 font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Update Username
              </button>
            </form>
          </div>

          <div className="border-t border-[var(--color-border)]"></div>

          {/* Change Password Form */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-base border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-primary outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-base border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-primary outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-2.5 font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Update Password
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
