"use client";
import { AccountDetails, AccountDetailsFormProps } from "@/common/types";
import FormLayout from "@/components/layout/FormLayout";
import { useForm } from "@/hooks/useForm";

export default function AccountDetailsForm(props: AccountDetailsFormProps) {
  const {
    title = "Account Details",
    submitText = "Save",
    className = "",
    onDone,
    modal,
    setShowDetailsModal,
  } = props;

  const {
    values,
    error,
    submitting,
    handleChange,
    handleImageChange,
    handleReset,
    handleSubmit,
  } = useForm({
    onSuccess: async (payload: AccountDetails) => {
      onDone?.(payload);
      setShowDetailsModal?.(false);
    }
  });

  return (
    <FormLayout
      className={className}
      title={title}
      submitText={submitText}
      onReset={handleReset}
      onSubmit={handleSubmit}
      submitting={submitting}
      error={error}
      modal={modal}
      setShowDetailsModal={setShowDetailsModal}
    >
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-zinc-300">Photo (optional)</span>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 border-2 border-zinc-700 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center ring-2 ring-zinc-800 shadow-lg">
            {values.imageSrc ? (
              <img src={values.imageSrc} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-zinc-500 font-medium">No Image</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="flex-1 mt-1 p-2.5 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:transition-all file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-zinc-300">First name</span>
          <input
            type="text"
            value={values.firstName}
            onChange={handleChange("firstName")}
            className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="First name"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-zinc-300">Last name</span>
          <input
            type="text"
            value={values.lastName}
            onChange={handleChange("lastName")}
            className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="Last name"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-zinc-300">Username</span>
        <input
          type="text"
          value={values.username}
          onChange={handleChange("username")}
          className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="Username"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-zinc-300">Email</span>
        <input
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="you@example.com"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-zinc-300">Password</span>
        <input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="••••••••"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-zinc-300">Account Type</span>
        <input
          type="text"
          value={values.accountType}
          onChange={handleChange("accountType")}
          className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="e.g., Admin, Employee"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-zinc-300">Country</span>
        <input
          type="text"
          value={values.country}
          onChange={handleChange("country")}
          className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="Country"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-zinc-300">Phone (optional)</span>
        <input
          type="tel"
          value={values.phone}
          onChange={handleChange("phone")}
          className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          placeholder="0917xxxxxxx"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-zinc-300">Address (optional)</span>
        <textarea
          value={values.address}
          onChange={handleChange("address")}
          className="p-2.5 border border-zinc-700 bg-zinc-800 text-white rounded-lg placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
          placeholder="Full address"
          rows={3}
        />
      </label>
    </FormLayout>
  );
}