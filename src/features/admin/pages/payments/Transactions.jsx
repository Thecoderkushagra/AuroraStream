import { Search, Filter, ArrowDownToLine } from "lucide-react";

const mockTransactions = [
    { id: "TXN-98234", user: "alex_sterling", plan: "Premium Annual", amount: "$119.99", status: "Completed", date: "2024-05-18 14:30" },
    { id: "TXN-98235", user: "sarah_j", plan: "Standard Monthly", amount: "$14.99", status: "Completed", date: "2024-05-18 15:45" },
    { id: "TXN-98236", user: "movie_fanatic", plan: "Basic Monthly", amount: "$9.99", status: "Failed", date: "2024-05-18 16:10" },
    { id: "TXN-98237", user: "david_m", plan: "Premium Monthly", amount: "$19.99", status: "Refunded", date: "2024-05-17 09:20" },
    { id: "TXN-98238", user: "new_user22", plan: "Standard Annual", amount: "$89.99", status: "Completed", date: "2024-05-17 11:05" },
];

export default function Transactions() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Transactions</h1>
                    <p className="text-secondary">Monitor platform payments, subscriptions, and refunds.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search TXN ID..." 
                            className="pl-10 pr-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] w-full md:w-64"
                        />
                    </div>
                    <button className="btn-ghost px-4 py-2 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] bg-base">
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Transaction ID</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">User</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Plan</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Amount</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Date</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {mockTransactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-hover transition-colors">
                                    <td className="p-4 font-mono text-sm text-primary">{txn.id}</td>
                                    <td className="p-4 text-secondary">@{txn.user}</td>
                                    <td className="p-4 text-secondary">{txn.plan}</td>
                                    <td className="p-4 font-medium text-primary">{txn.amount}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            txn.status === "Completed" ? "bg-live-bg text-live" :
                                            txn.status === "Failed" ? "bg-error-bg text-error" :
                                            "bg-surface text-muted border border-[var(--color-border)]"
                                        }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-secondary text-sm">{txn.date}</td>
                                    <td className="p-4 text-right">
                                        {txn.status === "Completed" && (
                                            <button className="text-sm text-error hover:underline transition-all">
                                                Refund
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
