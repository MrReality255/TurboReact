import { useContext } from "react";
import { Button } from "../atoms/Buttons";
import { CtxFormPanel } from "../contexts/forms";
import { CtxLayerManager } from "../contexts/layer";
import { TFormButtonProps } from "./types";
import { CtxDialogControl } from "../contexts/dialog_control";

export function FormButton(p: TFormButtonProps) {
	const ctx = useContext(CtxFormPanel);
	const lm = useContext(CtxLayerManager);
	const dm = useContext(CtxDialogControl);

	return (
		<Button
			{...p}
			onClick={
				p.cancel && !p.onClick
					? () => {
							dm ? dm.cancel() : lm?.hide();
					  }
					: p.onClick
			}
			disabled={p.disabled || (!p.cancel && ctx?.isDisabled)}></Button>
	);
}
