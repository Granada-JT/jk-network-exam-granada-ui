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
    <section className="w-[100vw] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Employee Records</h3>
        
        <div className="flex items-center gap-3 sm:gap-4">
          {myRecord && (
            <button 
              onClick={() => handleEdit(myRecord)}
              className="flex items-center gap-2 group cursor-pointer outline-none"
              title="Edit My Profile"
            >
              <div className="flex flex-col items-end leading-tight mr-1 hidden sm:flex">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Logged in as</span>
                <span className="text-sm font-semibold text-blue-400">{myRecord.firstName}</span>
              </div>
              
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5 transition-all group-hover:ring-4 group-hover:ring-blue-500/20 group-active:scale-95 overflow-hidden">
                  {myRecord.imageSrc ? (
                    <img 
                      src={myRecord.imageSrc} 
                      alt="Me" 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                      {myRecord.firstName?.[0]}{myRecord.lastName?.[0]}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
              </div>
            </button>
          )}

          <button 
            onClick={() => handleAdd()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-95"
          >
            + Add Employee
          </button>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 backdrop-blur-sm text-white overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <label className="text-sm text-zinc-400 font-medium">Show</label>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="border border-zinc-700 bg-zinc-800 text-white p-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            >
              {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-sm text-zinc-400 font-medium">entries</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-sm text-zinc-400 font-medium">Search:</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-zinc-700 bg-zinc-800 text-white p-2 rounded-lg text-sm flex-1 sm:flex-initial sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-500"
              placeholder="Search employees..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="bg-zinc-800/50 border-b border-zinc-800">
                <th className="px-4 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Photo</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider cursor-pointer hover:text-blue-400 transition-colors select-none" onClick={() => toggleSort("name")}>
                  Name {sortBy === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Username</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Country</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider cursor-pointer hover:text-blue-400 transition-colors select-none" onClick={() => toggleSort("email")}>
                  Email {sortBy === "email" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Account Type</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && <tr><td colSpan={7} className="px-4 py-16 text-center text-zinc-400">Loading…</td></tr>}
              {!loading && error && <tr><td colSpan={7} className="px-4 py-16 text-center text-red-400 font-medium">{error}</td></tr>}
              {!loading && !error && records.length === 0 && <tr><td colSpan={7} className="px-4 py-16 text-center text-zinc-500">No records found</td></tr>}

              {!loading && records.map((r) => (
                <tr key={r.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-lg overflow-hidden ring-1 ring-zinc-700">
                      {r.imageSrc ? <img src={r.imageSrc} alt={`${r.firstName} ${r.lastName}`} className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 font-medium">No image</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-white">{`${r.firstName} ${r.lastName}`}</td>
                  <td className="px-4 py-4 text-zinc-400">{r.username ?? "—"}</td>
                  <td className="px-4 py-4 text-zinc-400">{r.country ?? "—"}</td>
                  <td className="px-4 py-4 text-zinc-400">{r.email}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-medium ring-1 ring-zinc-700">
                      {r.accountType ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(r)} className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-xs font-semibold cursor-pointer hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-400/30 active:scale-95">
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirmDelete === r.id) {
                            await handleDelete(r);
                            setConfirmDelete(null);
                          } else {
                            if (r.id) setConfirmDelete(r.id);
                          }
                        }}
                        className={`px-3 py-1.5 w-28 rounded-lg text-white text-xs font-semibold transition-all cursor-pointer shadow-lg active:scale-95 ${
                          confirmDelete === r.id 
                            ? "bg-red-600 ring-2 ring-red-500 shadow-red-600/40"
                            : "bg-red-500 hover:bg-red-600 shadow-red-500/20 hover:shadow-red-600/30"
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

        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm border-t border-zinc-800 bg-zinc-900/30">
          <div className="text-zinc-400 font-medium">
            Showing page <span className="text-white font-semibold">{page}</span> of <span className="text-white font-semibold">{totalPages}</span> — <span className="text-white font-semibold">{total}</span> total
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1.5 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-800 transition-colors">
              First
            </button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-800 transition-colors">
              Prev
            </button>
            <span className="text-zinc-400 font-medium">Page</span>
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
              className="w-14 border border-zinc-700 bg-zinc-800 text-white p-1.5 rounded-lg text-sm text-center font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-800 transition-colors">
              Next
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1.5 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-800 transition-colors">
              Last
            </button>
          </div>
        </div>
      </div>

      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />
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
