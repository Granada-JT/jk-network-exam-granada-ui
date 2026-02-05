import { FormLayoutProps } from "@/common/types";
import Link from "next/link";

export default function FormLayout(props: FormLayoutProps) {
  const {
    children,
    className = "",
    title,
    submitText = "Submit",
    onReset,
    onSubmit,
    submitting,
    error,
    modal,
    setShowDetailsModal,
  } = props;

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
         	<h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
          <button
            onClick={() => {if (setShowDetailsModal) setShowDetailsModal(false)}}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer"
            aria-label="Close"
					>
						{modal ? (
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            	</svg>
						) : (
				      <Link href="/" aria-label="Back to home">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	              	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
	            	</svg>
				      </Link>
            )}
					</button>
        </div>

        {/* Form Content */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            </div>
          )}

          {children}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onReset}
              disabled={submitting}
              className="flex-1 px-4 py-2.5 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg font-semibold hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-[0.98] disabled:shadow-none cursor-pointer"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                submitText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}