import React, { useState } from "react";
import {
  updateMasterPassword,
  createAdmin,
  getAllAdmins,
  deleteAdmin,
} from "../api/masterApi";
import toast from "react-hot-toast";

const MasterCtl = () => {
  const [masterId, setMasterId] = useState("");

  /* ================= PASSWORD ================= */
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  /* ================= CREATE ADMIN ================= */
  const [adminReq, setAdminReq] = useState({
    userName: "",
    password: "",
    fullName: "",
    email: "",
  });
  const [createMessage, setCreateMessage] = useState("");

  /* ================= ADMIN LIST ================= */
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);

  /* ============================================= */
  /* UPDATE MASTER PASSWORD */
  /* ============================================= */
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const data = new FormData();
      data.append("password", newPassword);
      await updateMasterPassword({
        body: data,
      });

      toast.success("Password updated successfully ✅");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(
        err.response?.data || err.message || "Error updating password"
      );
    }
  };

  /* ============================================= */
  /* CREATE ADMIN */
  /* ============================================= */
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setCreateMessage("");

    if (!masterId)
      return setCreateMessage("Provide master id in header field");

    if (!adminReq.userName || !adminReq.password)
      return setCreateMessage("userName and password required");

    try {
      const res = await createAdmin({
        Id: masterId,
        request: adminReq,
      });

      setCreateMessage(res || "Admin created successfully ✅");
      setAdminReq({
        userName: "",
        password: "",
        fullName: "",
        email: "",
      });
    } catch (err) {
      setCreateMessage(
        err.response?.data || err.message || "Error creating admin"
      );
    }
  };

  /* ============================================= */
  /* FETCH ADMINS */
  /* ============================================= */
  const handleFetchAdmins = async () => {
    setLoadingAdmins(true);

    try {
      const res = await getAllAdmins();
      setAdmins(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setAdmins([]);
    }

    setLoadingAdmins(false);
  };

  /* ============================================= */
  /* DELETE ADMIN */
  /* ============================================= */
  const handleDeleteAdmin = async (id) => {
    if (!masterId) return alert("Provide master id in header field");
    if (!window.confirm("Delete this admin?")) return;

    try {
      await deleteAdmin({
        Id: masterId,
        id,
      });

      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.response?.data || err.message || "Error deleting");
    }
  };

  /* ============================================= */
  return (
    <div className="p-6 space-y-6 text-white">

      {/* CHANGE PASSWORD */}
      <form onSubmit={handleUpdatePassword} className="bg-gray-800 p-4 rounded">
        <h3 className="text-green-400 font-bold mb-2">Change Master Password</h3>

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-900 rounded"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-900 rounded"
        />

        <button onClick={handleUpdatePassword} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-colors">
          Update Password
        </button>

        {pwMessage && <p className="mt-2 text-sm">{pwMessage}</p>}
      </form>

      {/* CREATE ADMIN */}
      <form onSubmit={handleCreateAdmin} className="bg-gray-800 p-4 rounded">
        <h3 className="text-blue-400 font-bold mb-2">Create Admin</h3>

        <input
          placeholder="Username"
          value={adminReq.userName}
          onChange={(e) =>
            setAdminReq({ ...adminReq, userName: e.target.value })
          }
          className="w-full p-2 mb-2 bg-gray-900 rounded"
        />

        <input
          placeholder="Password"
          value={adminReq.password}
          onChange={(e) =>
            setAdminReq({ ...adminReq, password: e.target.value })
          }
          className="w-full p-2 mb-2 bg-gray-900 rounded"
        />

        <input
          placeholder="Full Name"
          value={adminReq.fullName}
          onChange={(e) =>
            setAdminReq({ ...adminReq, fullName: e.target.value })
          }
          className="w-full p-2 mb-2 bg-gray-900 rounded"
        />

        <input
          placeholder="Email"
          value={adminReq.email}
          onChange={(e) =>
            setAdminReq({ ...adminReq, email: e.target.value })
          }
          className="w-full p-2 mb-2 bg-gray-900 rounded"
        />

        <button className="bg-blue-600 px-4 py-2 rounded">
          Create Admin
        </button>

        {createMessage && <p className="mt-2 text-sm">{createMessage}</p>}
      </form>

      {/* ADMIN LIST */}
      <div className="bg-gray-800 p-4 rounded">
        <div className="flex justify-between mb-4">
          <h3 className="text-indigo-400 font-bold">Admin Accounts</h3>
          <button
            onClick={handleFetchAdmins}
            className="bg-indigo-600 px-4 py-2 rounded"
          >
            {loadingAdmins ? "Loading..." : "Refresh"}
          </button>
        </div>

        {admins.length === 0 ? (
          <p className="text-gray-400">No admins loaded</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th>ID</th>
                <th>UserName</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-t border-gray-700">
                  <td>{a.id.slice(0, 8)}...</td>
                  <td>{a.userName}</td>
                  <td>{a.email}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteAdmin(a.id)}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MasterCtl;