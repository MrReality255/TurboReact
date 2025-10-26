import { createRoot } from "react-dom/client";
import React from "react";
import DemoApp from "./demo_app/DemoApp.tsx";

createRoot(document.getElementById("root")!).render(
	<React.Fragment>
		<DemoApp />
	</React.Fragment>
);
