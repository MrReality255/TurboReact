import { HashRouter, Route, Routes } from "react-router-dom";

import { AppContainer } from "../turbo_react";

import { DemoPageWindows } from "./DemoPageWIndows";
import { DemoPageButtons } from "./DemoPageButtons";
import { DemoPageOtherControls, DemoPageTextBoxes } from "./DemoAppInputs";
import { DemoPageSelects } from "./DemoPageSelects";
import { DemoPageMenus } from "./DemoPageMenus";
import { DemoPageTables } from "./DemoPageTables";
import { DemoPageMisc } from "./DemoPageMisc";
import { DemoPageDialogs } from "./DemoPageDialogs";

export default function DemoApp() {
	return (
		<AppContainer>
			<AppRouter />
		</AppContainer>
	);
}

function AppRouter() {
	return (
		<HashRouter>
			<Routes>
				<Route path='/' element={<Main></Main>}></Route>
				<Route path='/buttons' element={<DemoPageButtons />}></Route>
				<Route path='/dialogs' element={<DemoPageDialogs />}></Route>
				<Route path='/inputs' element={<DemoPageOtherControls />}></Route>
				<Route path='/menus' element={<DemoPageMenus />}></Route>
				<Route path='/misc' element={<DemoPageMisc />}></Route>
				<Route path='/selects' element={<DemoPageSelects />}></Route>
				<Route path='/tables' element={<DemoPageTables />}></Route>
				<Route path='/textboxes' element={<DemoPageTextBoxes />}></Route>
				<Route path='/windows' element={<DemoPageWindows />}></Route>
			</Routes>
		</HashRouter>
	);
}

function Main() {
	return <DemoPageWindows />;
}
