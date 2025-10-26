import { useContext } from "react";

import { TFormTemplateProps } from "./types";
import { CtxFormPanel } from "../contexts/forms";
import usePalette from "../hooks/usePalette";
import { PaletteProvider } from "../contexts/palette";
import { Form } from "./Form";
import { InputUtils } from "../utils/input";

export function FormTemplate(props: TFormTemplateProps) {
	const ctx = useContext(CtxFormPanel);
	const plt = usePalette(undefined, props);

	const myWrapperFct = props.wrapperFct ?? ((x: React.ReactNode) => x);

	return (
		<PaletteProvider palette={plt.palette}>
			{myWrapperFct(
				<>
					{props.items.map((item, idx) => {
						const result = props.itemFct(item, createDeleteFct(props, idx));
						const formItems = Array.isArray(result) ? result : undefined;
						const formContent = formItems
							? undefined
							: (result as React.ReactNode);
						return (
							<Form
								key={idx}
								children={formContent}
								items={formItems}
								context={InputUtils.newFormContext(item, (fct) => {
									const newResult = fct(item);
									const newItems = props.items.map((item, idx2) =>
										idx2 == idx ? newResult : item
									);
									props.onUpdateItems?.(newItems);
								})}></Form>
						);
					})}
				</>,
				() => {
					const newData = props.onNewRow?.() || {};
					props.onUpdateItems?.([
						...props.items,
						{
							data: newData,
							isValidated: false,
							isLoading: ctx?.isLoading || false,
							isDisabled: ctx?.isDisabled || false,
							isValid: undefined,
						},
					]);
				}
			)}
		</PaletteProvider>
	);
}

function createDeleteFct(
	props: TFormTemplateProps,
	deleteIdx: number
): () => void {
	return () => {
		const newItems = props.items.filter((_item, idx) => idx != deleteIdx);
		props.onUpdateItems?.(newItems);
	};
}
