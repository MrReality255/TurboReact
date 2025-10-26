import {
	IDataContext,
	TDataContent,
	TFormValue,
	TFormValueType,
	TFormValueTypeList,
} from "..";
import { TFormContext } from "../contexts/forms";
import { TInputProps } from "./types";

export const InputUtils = {
	handleChange: function (newValue: string, p: TInputProps) {
		newValue = p.onChanging ? p.onChanging(newValue) : newValue;
		p.onChange?.(newValue);
		return newValue;
	},
	newDataContext: function (): IDataContext {
		return {
			data: {},
			isValidated: false,
			isDisabled: false,
			isLoading: false,
			isValid: true,
		};
	},
	newFormContext: function (
		dataContext: IDataContext,
		updateDataContext: (fct: (prev: IDataContext) => IDataContext) => void
	): TFormContext {
		return {
			...dataContext,
			updateDataContext,

			initializeField: function (
				id: string,
				initValue: TFormValueType,
				isValid: boolean
			) {
				updateDataContext((prev) => {
					if (prev.data[id]) {
						return prev;
					}
					return {
						...prev,
						isValid: prev.isValid && isValid,
						data: {
							...prev.data,
							[id]: {
								isValid,
								value: initValue,
								origValue: null,
							},
						},
					};
				});
			},
			checked: function (id: string) {
				return get(id) === "true";
			},
			get,
			getContent: () => InputUtils.getDataContent(dataContext),
			setDisabled: function (isDisabled: boolean) {
				updateDataContext((ctx) => {
					return {
						...ctx,
						isDisabled,
					};
				});
			},
			setError: function (error: string | undefined) {
				updateDataContext((ctx) => {
					return { ...ctx, error };
				});
			},
			setLoading: function (loading: boolean) {
				updateDataContext((ctx) => {
					return {
						...ctx,
						isDisabled: loading,
						isLoading: loading,
					};
				});
			},
			update: function (
				id: string,
				newValue: TFormValueType,
				isValid: boolean
			) {
				updateDataContext((ctx) => {
					const prevValue = ctx.data[id] as TFormValue | undefined;

					return revalidate(
						{
							...ctx,
							isValidated: false,
							error: undefined,
							data: {
								...ctx.data,
								[id]: {
									origValue:
										prevValue?.origValue === null ||
										typeof prevValue?.value === "object"
											? null
											: prevValue?.origValue ??
											  ((prevValue?.value as string) || ""),
									isValid,
									value: newValue,
								},
							},
						},
						isValid
					);
				});
			},
			validate: function () {
				updateDataContext((ctx) => getValidatedContext(ctx));
				return dataContext.isValid ?? false;
			},
		};

		function get(id: string) {
			return dataContext.data[id]?.value as string;
		}
	},
	getDataContent,
	getInitialState,
};

function getDataContent(ctx: IDataContext): TDataContent {
	const result: TDataContent = {};
	Object.keys(ctx.data).forEach((key) => {
		const value = ctx.data[key].value;
		if (typeof value === "string") {
			result[key] = value;
			return;
		}

		switch (value.mode) {
			case "datacontext":
				result[key] = getDataContent(value);
				return;
			case "list":
				result[key] = value.items.map((item) => getDataContent(item));
		}
	});
	return result;
}

function getInitialState(
	input: TDataContent | undefined
): IDataContext | undefined {
	if (input === undefined) {
		return undefined;
	}

	return {
		isLoading: false,
		isValidated: false,
		isDisabled: false,
		isValid: false,
		data: getInitContextValues(input),
	};
}

function getInitContextValues(input: TDataContent) {
	const result: Record<string, TFormValue> = {};
	Object.keys(input).forEach((key) => {
		const value = input[key];
		if (typeof value === "string") {
			result[key] = { isValid: undefined, value, origValue: value };
			return;
		}

		if (Array.isArray(value)) {
			result[key] = {
				isValid: undefined,
				origValue: null,
				value: {
					mode: "list",
					items: value.map((item) => getInitialState(item)!),
				},
			};
			return;
		}

		result[key] = {
			isValid: undefined,
			origValue: null,
			value: {
				...getInitialState(value)!,
				mode: "datacontext",
			},
		};
	});
	return result;
}

function getValidatedContext(ctx: IDataContext): IDataContext {
	ctx = { ...ctx, isValidated: true, data: { ...ctx.data } };
	Object.keys(ctx.data).forEach((key) => {
		const value = ctx.data[key].value;
		if (typeof value === "string") {
			return;
		}

		switch (value.mode) {
			case "datacontext":
				ctx.data[key].value = {
					...getValidatedContext(value),
					mode: "datacontext",
				};
				break;
			case "list":
				const v = ctx.data[key].value as TFormValueTypeList;
				const newValue: TFormValueTypeList = {
					mode: "list",
					items: v.items.map((subCtx) => getValidatedContext(subCtx)),
				};
				ctx.data[key].value = newValue;
				break;
		}
	});
	return ctx;
}

function revalidate(src: IDataContext, newIsValid: boolean): IDataContext {
	if (!newIsValid) {
		return { ...src, isValid: false };
	}

	const isValid = !Object.keys(src.data).find((key) => {
		return !src.data[key].isValid;
	});

	return { ...src, isValid };
}
