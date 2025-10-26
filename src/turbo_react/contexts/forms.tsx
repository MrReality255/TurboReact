import { createContext } from "react";

import { IDataContext, TDataContent, TFormValueType } from "../forms/types";

export type TFormContext = IDataContext & {
	updateDataContext: (fct: (prev: IDataContext) => IDataContext) => void;

	checked: (id: string) => boolean;
	get: (id: string) => string | undefined;
	getContent: () => TDataContent;
	update: (id: string, newValue: TFormValueType, isValid: boolean) => void;
	validate: () => boolean;
	initializeField: (
		id: string,
		initValue: TFormValueType,
		isValid: boolean
	) => void;
	setDisabled: (disabled: boolean) => void;
	setError: (error: string | undefined) => void;
	setLoading: (loading: boolean) => void;
};

export const CtxFormPanel = createContext<TFormContext | null>(null);
