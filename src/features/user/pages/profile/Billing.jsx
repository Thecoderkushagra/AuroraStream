import React from 'react';

const Billing = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary">Billing & Subscription</h1>
      
      {/* Current Subscription */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Current Subscription</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted mb-1">Plan</p>
            <p className="text-lg font-semibold text-primary">Premium</p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Price</p>
            <p className="text-lg font-semibold text-primary">$19.99/mo</p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Billing Cycle</p>
            <p className="text-lg font-semibold text-primary">Monthly</p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Next Billing Date</p>
            <p className="text-lg font-semibold text-primary">Dec 15, 2024</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Upgrade Plan
          </button>
          <button className="bg-base text-primary border border-[var(--color-border)] px-6 py-2 rounded-lg font-semibold hover:bg-elevated transition-colors">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Payment Method</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[var(--color-border)] bg-base p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-elevated rounded flex items-center justify-center font-bold text-xs text-primary">
              VISA
            </div>
            <div>
              <p className="text-primary font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted">Expires 12/26</p>
            </div>
          </div>
          <button className="text-sm text-primary font-medium py-2 px-4 border border-[var(--color-border)] rounded-lg hover:bg-elevated transition-colors">
            Update Method
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-surface rounded-xl p-6 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold text-primary mb-6">Invoice History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-sm text-muted">
                <th className="py-3 px-4 font-medium">Invoice ID</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--color-border)]/50">
                <td className="py-4 px-4 text-primary">INV-2024-001</td>
                <td className="py-4 px-4 text-secondary">Nov 15, 2024</td>
                <td className="py-4 px-4 text-primary font-medium">$19.99</td>
                <td className="py-4 px-4">
                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">Paid</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-sm text-accent hover:text-blue-300 transition-colors">Download</button>
                </td>
              </tr>
              <tr className="border-b border-[var(--color-border)]/50">
                <td className="py-4 px-4 text-primary">INV-2024-002</td>
                <td className="py-4 px-4 text-secondary">Oct 15, 2024</td>
                <td className="py-4 px-4 text-primary font-medium">$19.99</td>
                <td className="py-4 px-4">
                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">Paid</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-sm text-accent hover:text-blue-300 transition-colors">Download</button>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-primary">INV-2024-003</td>
                <td className="py-4 px-4 text-secondary">Sep 15, 2024</td>
                <td className="py-4 px-4 text-primary font-medium">$19.99</td>
                <td className="py-4 px-4">
                  <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">Paid</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-sm text-accent hover:text-blue-300 transition-colors">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
