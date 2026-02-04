"use client";
import FormLayout from "@/components/layout/FormLayout";
import { useForm } from "@/hooks/useForm";
import { useApi } from "@/hooks/useApi";

export default function LoginForm() {
  const api = useApi();
  const { values, error, submitting, handleChange, handleReset, handleLogin } = useForm();

  return (
    <FormLayout
      className="max-w-md"
      title="Login"
      submitText="Login"
      onReset={handleReset}
      onSubmit={handleLogin}
      submitting={submitting}
      error={error}
    >
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
          placeholder="Password"
        />
      </label>
    </FormLayout>
  );
}
