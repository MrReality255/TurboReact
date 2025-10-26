import { useState } from "react";

import {
	Button,
	FormButton,
	FormField,
	GroupBox,
	Heading,
	HorizLayout,
	InputUtils,
	NameValue,
	RowLayout,
	TDialogModalResult,
	Window,
	useDialog,
} from "../turbo_react";

import { DemoAppLayout } from "./DemoAppLayout";
import { DemoForm } from "./DemoPageDialog";

export function DemoPageDialogs() {
	const [data, setData] = useState<string | null>(null);

	const myDlg = useDialog((ctx) => {
		return {
			caption: "Test dialog ",
			pos: {
				height: "50%",
				width: "99%",
			},
			footer: (
				<HorizLayout alignMode='right'>
					<FormButton
						w0
						default
						disabled={!ctx.frm.isValid}
						onClick={() => {
							ctx.frm.validate();
							const isLoading = ctx.frm.checked("chkLoading");
							const isErr = ctx.frm.checked("chkFails");

							if (isLoading) {
								ctx.submit(
									new Promise((resolve) => {
										setTimeout(() => {
											resolve({
												result: !isErr ? "ok" : undefined,
												data: "response-data",
												error: isErr ? "Request failed" : undefined,
											});
										}, 5000);
									})
								);
								return;
							}

							ctx.submit({
								result: !isErr ? "ok" : undefined,
								data: "response-data",
								error: isErr ? "Request failed" : undefined,
							});
						}}>
						OK
					</FormButton>
					<FormButton w0 cancel>
						Cancel
					</FormButton>
				</HorizLayout>
			),
			content: (
				<HorizLayout>
					<RowLayout>
						<NameValue name='Form is valid'>
							{ctx.frm.isValid ? "yes" : "no"}
						</NameValue>
						<FormField type='textbox' caption='Name' id='name'></FormField>

						<GroupBox
							caption={"A group box"}
							disabled={!!ctx.frm.checked("chk1")}>
							<RowLayout>
								<FormField
									type='textbox'
									caption='Name 1'
									id='name1'></FormField>
								<FormField
									type='textbox'
									caption='Name 2'
									id='name2'></FormField>
								<FormField
									type='textbox'
									caption='Name 3'
									id='name3'></FormField>
							</RowLayout>
						</GroupBox>

						<GroupBox>
							<FormField
								type='checkbox'
								caption='Disable group box'
								id='chk1'></FormField>
							<FormField
								type='checkbox'
								caption='The submit fails'
								id='chkFails'></FormField>
							<FormField
								type='checkbox'
								caption='The submit needs to load a while'
								id='chkLoading'></FormField>
						</GroupBox>

						<FormField
							type='progress'
							id='setting1'
							caption='Setting #1'></FormField>
					</RowLayout>
				</HorizLayout>
			),
			onBeforeClose: function (modalResult: TDialogModalResult | null) {
				console.log(
					"triggered before closing the dialog:",
					modalResult,
					" data: ",
					JSON.stringify(ctx.frm.data, null, 2)
				);
			},
		};
	});

	return (
		<DemoAppLayout selected='dialogs'>
			<Heading>Dialogs</Heading>
			<RowLayout>
				<Window border='none' palette='dark'>
					<p>This is the panel with the dialog.</p>
					<Button
						variant='text'
						onClick={async () => {
							const result = await myDlg.show({
								name: "your name",
								name1: "name option 1",
								name2: "name option 2",
								chk1: "true",
							});
							setData(JSON.stringify(result, null, 2));
							if (result) {
								console.log(
									JSON.stringify(InputUtils.getDataContent(result.frm), null, 2)
								);
							}
						}}>
						Open dialog
					</Button>
				</Window>
				{data && <Window caption='Dialog result'>{data}</Window>}
				<DemoForm></DemoForm>
			</RowLayout>
		</DemoAppLayout>
	);
}
