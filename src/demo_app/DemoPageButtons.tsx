import { Button, ColLayout, Heading, TPalette, Window } from "../turbo_react";

import { DemoAppLayout } from "./DemoAppLayout";

const colors: TPalette[] = [
	"blue",
	"green",
	"cyan",
	"dark",
	"grey",
	"mono",
	"red",
	"dialog",
];

export function DemoPageButtons() {
	return (
		<DemoAppLayout selected='buttons'>
			<div style={{ marginBottom: "1em" }}>
				<Heading>Standard buttons</Heading>
				<Button>Standard</Button>
				<Button default>Default</Button>
				<Button disabled>Disabled</Button>
				<Button default disabled>
					Default disabled
				</Button>
			</div>
			<div style={{ marginBottom: "1em" }}>
				<Heading>Buttons with full fill</Heading>
				<div
					style={{
						height: "3em",
						marginTop: "1em",
						backgroundColor: "#000",
						width: "calc(100% - 1em)",
					}}>
					<Button fill>Test button</Button>
				</div>
			</div>
			<div style={{ marginBottom: "1em" }}>
				<Heading>Buttons with predefined width</Heading>
				<div style={{ height: "3em", marginTop: "1em" }}>
					<Button width='110px'>A</Button>
					<Button width='110px'>wide</Button>
					<Button width='110px'>button</Button>
				</div>
			</div>
			<div style={{ marginBottom: "1em" }}>
				<Heading>Plain buttons</Heading>
				<Button variant='plain'>Standard</Button>
				<Button variant='plain' default>
					Default
				</Button>
				<Button variant='plain' disabled>
					Disabled
				</Button>
				<Button variant='plain' default disabled>
					Default disabled
				</Button>
			</div>
			<ColLayout cols={2} lineHeight={"13em"}>
				{colors.map((c, key) => (
					<Window key={key} palette={c} caption={"Palette " + c}>
						<div style={{ marginBottom: "1em" }}> Sample button</div>
						<Button>Std button</Button>
						<Button variant='plain'>Plain button</Button>
						<Button variant='plain' default>
							Plain default
						</Button>
						<div style={{ marginBottom: "1em", marginTop: "1em" }}>
							Text buttons
						</div>
						<ColLayout cols={4}>
							<Button variant='link'>Link button</Button>
							<Button variant='link' disabled>
								Link button disabled
							</Button>
							<Button variant='text'>Text button</Button>
							<Button variant='text' disabled>
								Text button disabled
							</Button>
						</ColLayout>
					</Window>
				))}
			</ColLayout>
		</DemoAppLayout>
	);
}
