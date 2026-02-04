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
      <div className="flex flex-col gap-2">
        <span className="text-sm">Photo (optional)</span>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
            {values.imageSrc ? (
              <img src={values.imageSrc} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400">No Image</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="flex-1 mt-1 p-2 border rounded text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm">First name</span>
          <input
            type="text"
            value={values.firstName}
            onChange={handleChange("firstName")}
            className="mt-1 p-2 border rounded"
            placeholder="First name"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm">Last name</span>
          <input
            type="text"
            value={values.lastName}
            onChange={handleChange("lastName")}
            className="mt-1 p-2 border rounded"
            placeholder="Last name"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-sm">Username</span>
        <input
          type="text"
          value={values.username}
          onChange={handleChange("username")}
          className="mt-1 p-2 border rounded"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Email</span>
        <input
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          className="mt-1 p-2 border rounded"
          placeholder="you@example.com"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Password</span>
        <input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          className="mt-1 p-2 border rounded"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Account Type</span>
        <input
          type="text"
          value={values.accountType}
          onChange={handleChange("accountType")}
          className="mt-1 p-2 border rounded"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Country</span>
        <input
          type="text"
          value={values.country}
          onChange={handleChange("country")}
          className="mt-1 p-2 border rounded"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Phone (optional)</span>
        <input
          type="tel"
          value={values.phone}
          onChange={handleChange("phone")}
          className="mt-1 p-2 border rounded"
          placeholder="0917xxxxxxx"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm">Address (optional)</span>
        <textarea
          value={values.address}
          onChange={handleChange("address")}
          className="mt-1 p-2 border rounded"
          placeholder="Address"
          rows={3}
        />
      </label>
    </FormLayout>
  );
}
