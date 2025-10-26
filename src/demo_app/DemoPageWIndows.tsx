import { useState } from "react";

import { Viewport, Window } from "../turbo_react";

import { DemoAppLayout } from "./DemoAppLayout";

export function DemoPageWindows() {
	const [isVisible, setVisible] = useState(true);

	return (
		<DemoAppLayout selected='windows'>
			<Viewport rect={{ x: "0em", x2: "0em", y: "0" }} height='10em'>
				<Window caption='Window fills the viewport' fill>
					Standard window with some text. It fills the viewport completely.
				</Window>
			</Viewport>
			<Viewport
				rect={{ x: "0em", y: "10.5em", x2: "0em", y2: "0em" }}
				scrollbar>
				<Window caption='Window with auto size' palette='dark'>
					It has some content. Its height is automatic.
				</Window>
				<div style={{ marginTop: "1em" }}>
					<Window
						caption='Error message'
						palette='red'
						innerPadding='space'
						border='single'>
						Some error occurred.
					</Window>
				</div>
				<div style={{ marginTop: "1em" }}>
					<Window palette='cyan' border='none'>
						Some error occurred.
					</Window>
				</div>
				<div style={{ marginTop: "1em" }}>
					{isVisible && (
						<Window
							caption='Some other window'
							palette='green'
							onClose={() => handleClose()}>
							Put more text inside. This window can close.
						</Window>
					)}
				</div>
				<div style={{ marginTop: "1em" }}>
					<Window caption='Some other window' palette='cyan'>
						It looks like help from Turbo Pascal.
					</Window>
				</div>
				<div style={{ marginTop: "1em" }}>
					<Window caption='Some other window' palette='mono'>
						This is a colorless screen. Just like a DOS box.
					</Window>
				</div>
			</Viewport>
		</DemoAppLayout>
	);

	function handleClose() {
		setVisible(false);
		setTimeout(() => {
			setVisible(true);
		}, 3000);
	}
}
