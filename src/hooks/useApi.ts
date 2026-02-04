"use client";
import { useCallback, useMemo } from "react";

export const useApi = (base?: string) => {
  const apiBase = base ?? (process.env.NEXT_PUBLIC_API_URL as string) ?? "/api/records";

  const getRecords = useCallback(async (params: {
    page?: number;
    perPage?: number;
    search?: string;
    sortBy?: string | null;
    sortDir?: "asc" | "desc" | null;
  } = {}) => {
    const q = new URLSearchParams();
    if (params.search) q.set("search", params.search);
    if (params.page) q.set("page", String(params.page));
    if (params.perPage) q.set("perPage", String(params.perPage));
    if (params.sortBy) {
      q.set("sortBy", params.sortBy);
      q.set("sortDir", params.sortDir ?? "asc");
    }

    const url = `${apiBase}/records/${q.toString() ? `?${q.toString()}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Failed to fetch records (${res.status})`);
    }
    return (await res.json()) as any;
  }, [apiBase]);

  const getRecord = useCallback(async (id: string) => {
    const res = await fetch(`${apiBase}/${encodeURIComponent(id)}`);
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Failed to fetch record (${res.status})`);
    }
    return (await res.json()) as any;
  }, [apiBase]);

  const addRecord = useCallback(async (data: any) => {
    const res = await fetch(`${apiBase}/records/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Failed to add record (${res.status})`);
    }
    return (await res.json()) as any;
  }, [apiBase]);

  const updateRecord = useCallback(async (data: any) => {
    const res = await fetch(`${apiBase}/records/update/${encodeURIComponent(data.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Failed to update record (${res.status})`);
    }
    return (await res.json()) as any;
  }, [apiBase]);

  const deleteRecord = useCallback(async (id: string) => {
    const res = await fetch(`${apiBase}/records/delete/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Failed to delete record (${res.status})`);
    }
    return (await res.json()) as any;
  }, [apiBase]);

  const handleLogin = useCallback(async (data: any) => {
    const res = await fetch(`${apiBase}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Failed to add record (${res.status})`);
    }
    return (await res.json()) as any;
  }, [apiBase]);

  return useMemo(() => ({
    getRecords,
    getRecord,
    addRecord,
    updateRecord,
    deleteRecord,
    handleLogin
  }), [getRecords, getRecord, addRecord, updateRecord, deleteRecord, handleLogin]);
};
