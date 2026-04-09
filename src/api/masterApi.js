import api from "./axiosConfig";

/* ==============================
   UPDATE MASTER PASSWORD
   ============================== */
export const updateMasterPassword = async ({ body }) => {
    const response = await api.put(
        "/master/update-master-password",
        body,
    );

    return response.data;
};

/* ==============================
   CREATE ADMIN
   ============================== */
export const createAdmin = async ({ Id, request }) => {
    const response = await api.post(
        "/create-admin",
        request,
        {
            headers: {
                "X-User-Id": Id,
            },
        }
    );

    return response.data;
};

/* ==============================
   GET ALL ADMINS
   ============================== */
export const getAllAdmins = async () => {
    const response = await api.get("/get-all-admin");
    return response.data;
};

/* ==============================
   DELETE ADMIN
   ============================== */
export const deleteAdmin = async ({ Id, id }) => {
    const response = await api.delete("/delete-this-admin", {
        headers: {
            "X-User-Id": Id,
        },
        params: {
            id: id,
        },
    });

    return response.data;
};