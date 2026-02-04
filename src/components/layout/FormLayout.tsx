"use client";
import { FormLayoutProps } from "@/common/types"
import Link from "next/link";

export default function FormLayout(props: FormLayoutProps) {
	const { children, className, error, modal = false, setShowDetailsModal, title, submitting, submitText, onReset, onSubmit } = props

	return (
		<section className={`w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow text-black ${className ?? ''}`}>
      {modal ? (
        <button onClick={() => {if (setShowDetailsModal) setShowDetailsModal(false)}} aria-label="Back" className="inline-flex flex-end items-center gap-2 mb-3 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      ) : (
        <Link href="/" aria-label="Back to home" className="inline-flex items-center gap-2 mb-3 text-sm text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to home
        </Link>
      )}

      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {children}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          >
            {submitting ? "Saving..." : submitText}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="px-3 py-2 rounded border"
            disabled={submitting}
          >
            Reset
          </button>
        </div>
      </form>
		</section>
	)
}
