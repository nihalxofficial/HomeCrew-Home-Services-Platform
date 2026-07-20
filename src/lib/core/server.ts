"use server";

import { redirect } from "next/navigation";
import { getToken } from "./session";

const Api = process.env.NEXT_PUBLIC_API_URL;

const handleResponse = async (res: Response): Promise<unknown> => {
    if (res.status === 401) redirect("/auth/login");
    if (res.status === 403) redirect("/unauthorized");

    const data = await res.json();
    return data;
};

export const serverFetch = async (path: string, requireAuth: boolean = false): Promise<unknown> => {
    const headers: Record<string, string> = {};

    if (requireAuth) {
        const token = await getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${Api}${path}`, {
        cache: "no-store",
        headers,
    });

    return handleResponse(res);
};

export const serverMutation = async (
    path: string,
    data: unknown = "",
    method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST"
): Promise<unknown> => {
    const token = await getToken();

    // 1. Detect if the incoming payload is a FormData stream or standard object
    const isFormData = data instanceof FormData;

    // 2. Build headers dynamically
    const headers: Record<string, string> = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // CRITICAL: When transmitting FormData, do NOT set "Content-Type".
    // The fetch API will automatically set it to 'multipart/form-data' 
    // and append the correct boundary hash string.
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    // 3. Prepare body payload safely
    const bodyPayload = isFormData 
        ? (data as FormData) 
        : (data ? JSON.stringify(data) : undefined);

    try {
        const res = await fetch(`${Api}${path}`, {
            method: method,
            headers: headers,
            body: bodyPayload,
        });

        return handleResponse(res);
    } catch (err: any) {
        console.error("fetch failed:", err.message);
        throw err;
    }
};