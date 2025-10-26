import { Form } from ".";
import {
	ClosingEffect,
	Glass,
	ErrorPanel,
	LoadingBar,
	Viewport,
	Window,
} from "../atoms";
import { CtxDialogControl } from "../contexts/dialog_control";
import { CtxLayerManager } from "../contexts/layer";
import { useNewFormContext, useLayer } from "../hooks";
import usePalette from "../hooks/usePalette";
import { VertLayout } from "../layout";
import {
	TDialogWrapperProps,
	TDialogModalResult,
	TDialogSubmitFctResult,
	TDialogSubmitResult,
} from "./types";

export function Dialog<T>(props: TDialogWrapperProps<T>) {
	const frm = useNewFormContext(props.initialState);

	const closer = {
		beforeClose: (_mr: TDialogModalResult | null) => {},
	};

	const ctx = {
		frm,
		close: () => closeDialog(),
		submit: (result: TDialogSubmitFctResult<T>) => submitHandler(result),
	};

	const p = props.fct(ctx);
	closer.beforeClose = p.onBeforeClose ?? closer.beforeClose;

	const plt = usePalette(undefined, { palette: p.palette ?? "dialog" });

	return (
		<>
			<Glass backdrop visible></Glass>
			<Glass visible>
				<CtxDialogControl.Provider
					value={{
						cancel: () => closeDialog(),
						submit: (result, data) =>
							submitDialog(result, data as T | undefined),
					}}>
					<Viewport
						{...p.pos}
						center
						style={{
							...props.style,
						}}>
						<Window
							palette={plt.palette}
							fill
							caption={p.caption}
							onClose={() => closeDialog()}
							{...p.windowProps}>
							<div
								style={{
									height: "100%",
									position: "relative",
								}}>
								<VertLayout
									header={
										<>
											{frm.error && <ErrorPanel>{frm.error}</ErrorPanel>}
											{p.header && <Form context={frm}>{p.header}</Form>}
										</>
									}
									footer={
										<>{p.footer && <Form context={frm}>{p.footer}</Form>}</>
									}>
									{frm.isLoading && (
										<div
											style={{
												display: "flex",
												position: "absolute",
												left: 0,
												top: 0,
												height: "100%",
												width: "100%",
												alignItems: "center",
												justifyContent: "center",
											}}>
											<div
												style={{
													display: "block",
													width: "100%",
													height: "1.5em",
												}}>
												<LoadingBar></LoadingBar>
											</div>
										</div>
									)}
									<div
										style={{
											opacity: frm.isLoading ? 0.1 : 1,
											height: "100%",
										}}>
										<Form context={frm} items={p.items}>
											{p.content}
										</Form>
									</div>
								</VertLayout>
							</div>
						</Window>
					</Viewport>
				</CtxDialogControl.Provider>
			</Glass>
		</>
	);

	function submitHandler(resultObj: TDialogSubmitFctResult<T>) {
		if (resultObj instanceof Promise) {
			submitHandlerPromise(resultObj);
			return;
		}

		if (resultObj.result) {
			submitDialog(resultObj.result, resultObj.data);
			return;
		}

		if (resultObj.error) {
			frm.setError(resultObj.error);
		}
	}

	function submitHandlerPromise(result: Promise<TDialogSubmitResult<T>>) {
		frm.setLoading(true);
		frm.setError(undefined);
		result.then((r) => {
			frm.setLoading(false);
			submitHandler(r);
		});
	}

	function submitDialog(result: TDialogModalResult, data?: T) {
		closer.beforeClose(result);
		props.onSubmit?.(result, data, frm);
	}

	function closeDialog() {
		closer.beforeClose(null);
		props.onCancel();
	}
}

export function DialogWrapper<T>(p: TDialogWrapperProps<T>) {
	const l = useLayer();

	return (
		<ClosingEffect
			animationDuration={100}
			onClose={() => l.hide()}
			emptyMode
			onRender={(onClose, props) => {
				return (
					<CtxLayerManager.Provider value={{ ...l, hide: () => onClose() }}>
						<Dialog
							fct={p.fct}
							initialState={p.initialState}
							onSubmit={(result, data, frm) => {
								p.onSubmit(result, data, frm);
								onClose();
							}}
							onCancel={() => {
								onClose();
								p.onCancel();
							}}
							style={props}></Dialog>
					</CtxLayerManager.Provider>
				);
			}}></ClosingEffect>
	);
}
