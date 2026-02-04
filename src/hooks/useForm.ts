import { useCallback, useEffect, useMemo, useState } from "react"
import { AccountDetails, UseFormOptions } from "../common/types";
import { ACCOUNT_DEFAULTS } from "@/common/constants";
import { useApi } from "@/hooks/useApi";
import { usePathname, useRouter } from "next/navigation";

export const useForm = (opts?: UseFormOptions) => {
  const { onSuccess } = opts ?? {};
	const [values, setValues] = useState<AccountDetails>({ ...ACCOUNT_DEFAULTS });
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState<boolean>(false);

  const api = useApi();
  const pathname = usePathname();
  const router = useRouter();

	const handleChange = useCallback((k: keyof AccountDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValues((s) => ({ ...s, [k]: e.target.value }));
	}, [])

  useEffect(() => {
    const raw = sessionStorage.getItem("edit_record");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        setValues((prev) => ({ ...prev, ...parsed }));
      }
      sessionStorage.removeItem("edit_record");
    } catch (err) {
      console.error("invalid edit_record in sessionStorage", err);
    } finally {
      sessionStorage.removeItem("edit_record");
    }
  }, [setValues, values]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const MAX_FILE_SIZE = 1 * 1024 * 1024;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("Image is too large. Please select a file smaller than 1MB.");
        handleChange("imageSrc")({
          target: { value: ACCOUNT_DEFAULTS.imageSrc }
        } as any);

        e.target.value = ""; 
        return;
      }

      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("imageSrc")({
          target: { value: reader.result }
        } as any);
      };
      reader.readAsDataURL(file);
    }
  }, [handleChange]);

	const handleReset = useCallback(() => {
		setValues({ ...ACCOUNT_DEFAULTS})
	}, [])

	const handleSubmit = useCallback(async (e?: React.SyntheticEvent) => {
		e?.preventDefault();
		setError(null);

		if (!values.email) {
			setError("Email is required.");
			return;
		} else if (!values.password) {
			setError("Password is required.");
			return;
		}

    try {
      setSubmitting(true);

      if (values.id) {
        const updateResponse = await api.updateRecord({
          id: values.id,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          username: (values as AccountDetails).username ?? undefined,
          country: (values as AccountDetails).country ?? undefined,
          accountType: (values as AccountDetails).accountType ?? undefined,
          imageSrc: values.imageSrc,
          phone: values.phone,
          address: values.address
        });

        if (updateResponse && (updateResponse.success ?? true)) {
          onSuccess?.({ type: "update", result: updateResponse });
        }
        return updateResponse;
      } else {
        const addResponse = await api.addRecord({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          username: (values as AccountDetails).username ?? undefined,
          country: (values as AccountDetails).country ?? undefined,
          accountType: (values as AccountDetails).accountType ?? undefined,
          imageSrc: values.imageSrc,
          phone: values.phone,
          address: values.address
        });

        if (addResponse.success && pathname === '/register') {
          router.push('/login')
        } else if (addResponse.success) {
          onSuccess?.({ type: "add", result: addResponse });
        }
      }

		} catch (err: any) {
      console.error(err)
			setError(err?.message ?? "Failed to submit form.");
		} finally {
			setSubmitting(false);
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values])

	const handleLogin = useCallback(async (e?: React.SyntheticEvent) => {
		e?.preventDefault();
		setError(null);

		if (!values.email) {
			setError("Email is required.");
			return;
		} else if (!values.password) {
			setError("Password is required.");
			return;
		}
    
    try {
      if (values) {
        const loginResponse = await api.handleLogin({
          email: values.email,
          password: values.password
        });
        
        if (loginResponse.id) localStorage.setItem('userId', loginResponse.id);
        if (loginResponse.valid) router.replace("/dashboard");
      }

			setSubmitting(true);
		} catch (err: any) {
      console.error(err)
			setError(err?.message ?? "Failed to Login.");
		} finally {
			setSubmitting(false);
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values])

	return useMemo(() => ({
		error,
		handleChange,
    handleImageChange,
    handleLogin,
		handleReset,
		handleSubmit,
		submitting,
		values,
    setValues
	}), [error, handleChange, handleImageChange, handleLogin, handleReset, handleSubmit, submitting, values, setValues])
}
