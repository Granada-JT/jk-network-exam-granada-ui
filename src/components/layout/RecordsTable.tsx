"use client";
import { useRecordsTable } from "@/hooks/useRecordsTable";
import AccountDetailsForm from "./AccountDetailsForm";
import { useState } from "react";

export default function RecordsTable() {
const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const {
    allRecords,
    records,
    loading,
    error,
    fetchRecords,
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
    showDetailsModal,
    setShowDetailsModal,
    submitText,
    title,
    total,
    totalPages,
    sortBy,
    sortDir,
    toggleSort,
  } = useRecordsTable();

  const currentUserId = localStorage.getItem('userId') ?? null;
	const myRecord = allRecords.find(r => r.id === currentUserId);

  return (
    <section className="w-[100vw]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Employee: Records</h3>
        
        <div className="flex items-center gap-4">
          {myRecord && (
            <button 
              onClick={() => handleEdit(myRecord)}
              className="flex items-center gap-2 group cursor-pointer outline-none"
              title="Edit My Profile"
            >
              <div className="flex flex-col items-end leading-tight mr-1 hidden sm:flex">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Logged in as</span>
                <span className="text-sm font-semibold text-blue-600">{myRecord.firstName}</span>
              </div>
              
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-blue-600 p-0.5 transition-all group-hover:ring-4 group-hover:ring-blue-100 group-active:scale-95 overflow-hidden">
                  {myRecord.imageSrc ? (
                    <img 
                      src={myRecord.imageSrc} 
                      alt="Me" 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                      {myRecord.firstName?.[0]}{myRecord.lastName?.[0]}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </button>
          )}

          <button 
            onClick={() => handleAdd()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            + Add Employee
          </button>
        </div>
      </div>
      <div className="border rounded bg-white text-black">
        <div className="p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm">Show</label>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="border p-1 rounded text-sm"
            >
              {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-sm">entries</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Search:</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-1 rounded text-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left">Photo</th>
                <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("name")}>Name {sortBy === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}</th>
                <th className="px-3 py-2 text-left">Username</th>
                <th className="px-3 py-2 text-left">Country</th>
                <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort("email")}>Email {sortBy === "email" ? (sortDir === "asc" ? "▲" : "▼") : ""}</th>
                <th className="px-3 py-2 text-left">Account Type</th>
                <th className="px-3 py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && <tr><td colSpan={7} className="px-4 py-8 text-center">Loading…</td></tr>}
              {!loading && error && <tr><td colSpan={7} className="px-4 py-8 text-center text-red-600">{error}</td></tr>}
              {!loading && !error && records.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center">No records</td></tr>}

              {!loading && records.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-3">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                      {r.imageSrc ? <img src={r.imageSrc} alt={`${r.firstName} ${r.lastName}`} className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">{`${r.firstName} ${r.lastName}`}</td>
                  <td className="px-3 py-3">{r.username ?? ""}</td>
                  <td className="px-3 py-3">{r.country ?? ""}</td>
                  <td className="px-3 py-3">{r.email}</td>
                  <td className="px-3 py-3">{r.accountType ?? ""}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(r)} className="px-2 py-1 rounded bg-yellow-400 text-white text-xs cursor-pointer">Edit</button>
                      <button
                        onClick={async () => {
                          if (confirmDelete === r.id) {
                            await handleDelete(r);
                            setConfirmDelete(null);
                          } else {
                            if (r.id) setConfirmDelete(r.id);
                          }
                        }}
                        className={`px-2 py-1 w-28 rounded text-white text-xs transition-colors cursor-pointer ${
                          confirmDelete === r.id 
                            ? "bg-red-700 font-bold scale-105"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {confirmDelete === r.id ? "Confirm Delete?" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 flex items-center justify-between text-sm">
          <div>Showing page {page} of {totalPages} — {total} total</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-2 py-1 border rounded">First</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-2 py-1 border rounded">Prev</button>
            <span>Page</span>
            <input
              type="number"
              value={pageInput}
              min={1}
              max={totalPages}
              onChange={(e) => {
                setPageInput(e.target.value);
              }}
              onBlur={() => {
                let n = Number(pageInput);
                if (!pageInput || Number.isNaN(n)) {
                  n = 1;
                }
                n = Math.min(Math.max(1, Math.floor(n)), totalPages);
                setPage(n);
                setPageInput(String(n));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              className="w-12 border p-1 rounded text-sm"
            />
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2 py-1 border rounded">Next</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-2 py-1 border rounded">Last</button>
          </div>
        </div>
      </div>
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative w-full max-w-3xl mx-4">
            <div className="p-6">
              <AccountDetailsForm
                title={title}
                submitText={submitText}
                modal={true}
                setShowDetailsModal={setShowDetailsModal}
                onDone={async () => {
                  try {
                    await fetchRecords?.();
                  } catch (err) {
                    console.warn("refresh after save failed", err);
                  }
                  setShowDetailsModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
