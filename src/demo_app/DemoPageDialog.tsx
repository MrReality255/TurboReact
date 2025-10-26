import {
	Button,
	ColLayout,
	Form,
	FormField,
	GroupBox,
	Heading,
	HorizLayout,
	InputUtils,
	NameValue,
	Window,
	useNewFormContext,
} from "../turbo_react";

export function DemoForm() {
	const frm = useNewFormContext(
		InputUtils.getInitialState({ lastname: "Your name" })
	);
	return (
		<Window palette='dialog' caption='Form panel'>
			<NameValue name='Form is valid:' labelWidth={110}>
				{frm.isValid ? "yes" : "no"}
			</NameValue>
			<Form context={frm}>
				<FormField
					type='textbox'
					id='firstname'
					caption='First name'></FormField>
				<FormField type='textbox' id='lastname' caption='Last name'></FormField>
				<FormField
					type='dropdown'
					id='option'
					caption='Special option'
					dropDownProps={{
						items: [
							{ id: "option1", label: "Special option 1" },
							{ id: "option2", label: "Special option 2" },
						],
					}}></FormField>
				<Heading>Subform</Heading>
				<FormField
					type='form'
					id='Subform'
					caption='Subform'
					formProps={{
						items: [{ id: "caption", type: "textbox", caption: "Caption" }],
					}}></FormField>
				<Heading>Progress</Heading>
				<FormField
					type='progress'
					id='progress1'
					caption='Progress'></FormField>
				<FormField
					type='progress'
					id='progress2'
					caption='Progress'
					progressBarProps={{ readOnly: true }}
					value='75'></FormField>
				<Heading>Template</Heading>
				<FormField
					type='template'
					id='items'
					templateProps={{
						itemFct: (_ctx, deleteFct) => (
							<div style={{ display: "flex", width: "100%", gap: 20 }}>
								<div style={{ flexGrow: 1 }}>
									<ColLayout cols={2} gap={20}>
										<FormField
											type='textbox'
											caption='First Name'
											id='firstname'
										/>
										<FormField
											type='textbox'
											caption='Last Name'
											id='lastname'
										/>
									</ColLayout>
								</div>
								<div style={{ height: "100%", marginTop: "1.5em" }}>
									<Button onClick={() => deleteFct()}>Delete</Button>
								</div>
							</div>
						),
						wrapperFct: (content, addFct) => {
							return (
								<div style={{ marginBottom: "1em" }}>
									<GroupBox>
										{content}
										<div style={{ padding: "1em 0" }}>
											<Button palette='cyan' onClick={() => addFct()}>
												New item
											</Button>
										</div>
									</GroupBox>
								</div>
							);
						},
					}}></FormField>
			</Form>
			<HorizLayout>
				<Button
					onClick={() => {
						validate();
					}}>
					Validate
				</Button>
				<Button onClick={() => console.log(JSON.stringify(frm.data, null, 2))}>
					Output raw
				</Button>
				<Button
					onClick={() =>
						console.log(JSON.stringify(InputUtils.getDataContent(frm), null, 2))
					}>
					Output data
				</Button>
			</HorizLayout>
		</Window>
	);

	function validate() {
		frm.validate();
	}
}


