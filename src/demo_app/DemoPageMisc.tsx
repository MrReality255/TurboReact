import {
	Button,
	ColLayout,
	Heading,
	HorizLayout,
	LoadingBar,
	NameValue,
	RowLayout,
	VertLayout,
	Viewport,
	Window,
	useNotifications,
} from "../turbo_react";

import { DemoAppLayout } from "./DemoAppLayout";

export function DemoPageMisc() {
	const n = useNotifications();

	return (
		<DemoAppLayout selected='misc'>
			<RowLayout>
				<Heading>Loading</Heading>
				<LoadingBar></LoadingBar>
				<Window caption='Horizontal layout'>
					<HorizLayout gap={"5em"} left={<p>Some text on the left side</p>}>
						<p>Some context on the right side</p>
					</HorizLayout>
					<HorizLayout
						alignMode='right'
						gap={"5em"}
						left={<p>Some text on the left side</p>}>
						<p>Some context on the right side</p>
					</HorizLayout>
				</Window>
				<Viewport height={"200px"}>
					<Window caption='Vertical layout' fill>
						<VertLayout
							header={<Heading>Heading</Heading>}
							footer={
								<>
									<Heading>Footer</Heading>
									<p>Content</p>
								</>
							}>
							<p>
								Some text in the main window. It has to be long so you can see
								that this block is getting a scroll bar. But you still can see
								the header and the footer.
							</p>
							<p>
								Some text in the main window. It has to be long so you can see
								that this block is getting a scroll bar. But you still can see
								the header and the footer.
							</p>
						</VertLayout>
					</Window>
				</Viewport>
				<Window border='none' innerPadding='space'>
					<Heading>Notifications</Heading>
					<Button
						w1
						onClick={() => {
							n.show("Something succeeded in this reality.", {
								palette: "cyan",
								timeout: 0,
							});
						}}>
						Succeeded
					</Button>
					<Button
						w1
						onClick={() => {
							n.show("Something failed in this reality.", {
								palette: "red",
								timeout: 2000,
							});
						}}>
						Failed
					</Button>
				</Window>
				<Window>
					<ColLayout cols={2} gap={"5em"}>
						<RowLayout>
							<NameValue
								actionWidth={"75px"}
								action={<Button variant='text'>Action</Button>}
								name='Property 1'>
								Value 1 with very very very long content so it makes sure it has
								more than one line in the window being displayed.
							</NameValue>
							<NameValue name='Property 2'>Value 2</NameValue>
							<NameValue name='Property 3'>Value 3</NameValue>
							<NameValue name='Property 4'>Value 4</NameValue>
						</RowLayout>
						<RowLayout>
							<NameValue
								labelWidth={100}
								items={[
									{
										name: "Property 1",
										value: "Value 1",
										action: <Button variant='text'>Action</Button>,
									},
									{ name: "Property 2", value: "Value 2" },
									{ name: "Property 3", value: "Value 3" },
									{ name: "Property 4", value: "Value 4" },
								]}></NameValue>
						</RowLayout>
					</ColLayout>
				</Window>
			</RowLayout>
		</DemoAppLayout>
	);
}
