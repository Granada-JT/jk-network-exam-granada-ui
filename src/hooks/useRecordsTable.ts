"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "./useApi";
import { AccountDetails } from "@/common/types";

export const useRecordsTable = (opts?: { defaultPerPage?: number }) => {
  const api = useApi();
  const { defaultPerPage = 10 } = opts ?? {};

  const [allRecords, setAllRecords] = useState<AccountDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [page, setPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>(String(page));
  const [perPage, setPerPage] = useState<number>(defaultPerPage);
  const [total, setTotal] = useState<number>(allRecords.length);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [title, setTitle] = useState<string>('');
  const [submitText, setSubmitText] = useState<string>('');
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [search]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / perPage)), [total, perPage]);

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page, setPage]);

  useEffect(() => {
    fetchRecords();
  }, [])

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const recordsResp = await api.getRecords();
      setAllRecords(recordsResp)
      return true;
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [api, perPage]);

  const handleDelete = useCallback(async (r: AccountDetails) => {
    setLoading(true);
    setError(null);

    try {
      if (r.id) {
        setAllRecords((prev) => prev.filter((record) => record.id !== r.id));
        const deleteResponse = await api.deleteRecord(r.id);

        if (deleteResponse.success) {
           fetchRecords();
        }
      }
      return true;
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete.");
      fetchRecords(); 
      return false;
    } finally {
      setLoading(false);
    }
  }, [api, perPage, fetchRecords]);

  const toggleSort = useCallback((col: string) => {
    setPage(1);
    if (sortBy !== col) {
      setSortBy(col);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  }, [sortBy]);

  const records = useMemo(() => {
    let filtered = allRecords;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();

      filtered = filtered
        .filter(r => {
          const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
          return (
            fullName.includes(q) ||
            (r.email ?? "").toLowerCase().includes(q) ||
            (r.username ?? "").toLowerCase().includes(q)
          );
        })
        .sort((a, b) => {
          const aFull = `${a.firstName} ${a.lastName}`.toLowerCase();
          const bFull = `${b.firstName} ${b.lastName}`.toLowerCase();

          const aStarts = aFull.startsWith(q);
          const bStarts = bFull.startsWith(q);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;

          return aFull.localeCompare(bFull);
        });
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const get = (row: AccountDetails) => {
          if (sortBy === "name") return `${row.firstName} ${row.lastName}`.toLowerCase();
          return ((row as any)[sortBy] ?? "").toString().toLowerCase();
        };
        const va = get(a);
        const vb = get(b);
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    setTotal(filtered.length);

    const lastPage = Math.max(1, Math.ceil(filtered.length / perPage));
    const currentPage = Math.min(Math.max(1, page), lastPage);

    const start = (currentPage - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);
    return paged;
  }, [allRecords, debouncedSearch, sortBy, sortDir, page, perPage]);
  
  const handleAdd = useCallback(() => {
    sessionStorage.removeItem("edit_record");
    setTitle('Add Employee')
    setSubmitText('Add')
    setShowDetailsModal(true)
  }, [])

  const handleEdit = useCallback((r: AccountDetails) => {
    sessionStorage.removeItem("edit_record");
    setTitle('Edit Employee Details')
    setSubmitText('Edit')
    sessionStorage.setItem("edit_record", JSON.stringify(r));
    setShowDetailsModal(true)
  }, [])

  return useMemo(() => ({
    allRecords,
    records,
    loading,
    error,
    handleAdd,
    handleDelete,
    handleEdit,
    search,
    setSearch,
    page,
    pageInput,
    setPage,
    setPageInput,
    perPage,
    setPerPage,
    submitText,
    setSubmitText,
    showDetailsModal,
    setShowDetailsModal,
    title,
    setTitle,
    total,
    totalPages,
    sortBy,
    sortDir,
    toggleSort,
    fetchRecords
  }), [allRecords, records, loading, error, handleAdd, handleDelete, handleEdit, search, setSearch, page, pageInput, setPage, setPageInput, showDetailsModal, setShowDetailsModal, perPage, setPerPage, submitText, setSubmitText, title, setTitle, total, totalPages, sortBy, sortDir, toggleSort, fetchRecords]);
};
