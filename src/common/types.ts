import React from 'react';

export interface AccountDetails {
  id?: string;
	firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  accountType: string;
  country: string;
  phone: string;
  address: string;
  imageSrc: string;
}

export interface AccountDetailsFormProps {
  title: string;
  initialValues?: AccountDetails;
  submitText: string;
  className?: string;
  modal?: boolean;
  setShowDetailsModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onDone?: (payload?: AccountDetails) => void;
}

export interface FormLayoutProps {
  children: React.ReactNode;
  className?: string;
  error: string | null;
  modal?: boolean;
  onReset: () => void;
  onSubmit: () => void;
  setShowDetailsModal?: React.Dispatch<React.SetStateAction<boolean>>;
  submitting: boolean;
  submitText: string;
  title: string;
}

export interface OnSuccess {
	type: string;
	result: any;
}

export interface PageContentProps {
	children: React.ReactNode;
	className?: string;
}

export interface UseFormOptions {
  onSuccess?: (result?: any) => void;
}
