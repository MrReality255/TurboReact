import { TAppContainer } from "@mrreality255/turbo-react-forms";
import { HashRouter, Route, Routes } from "react-router-dom";

import { DemoPageButtons } from "./DemoPageButtons";
import { DemoPageMenus } from "./DemoPageMenus";
import { DemoPageTables } from "./DemoPageTables";
import { DemoPageTextBoxes } from "./DemoAppTextBoxes";
import { DemoPageWindows } from "./DemoPageWnd";
import { DemoPageOtherControls } from "./DemoAppInputs";
import { DemoPageMisc } from "./DemoPageMisc";

/*
import { DemoPageButtons } from './DemoPageButtons';
import { DemoPageOtherControls, DemoPageTextBoxes } from './DemoAppInputs';
import { DemoPageSelects } from './DemoPageSelects';
import { DemoPageMenus } from './DemoPageMenus';
import { DemoPageTables } from './DemoPageTables';
import { TAppContainer } from '../turbo-react/app/AppContainer';
import { DemoPageMisc } from './DemoPageMisc';
import { DemoPageDialogs } from './DemoPageDialog';
*/

export default function DemoApp() {
  return (
    <TAppContainer>
      <AppRouter />
    </TAppContainer>
  );
}

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/windows" element={<DemoPageWindows />}></Route>
        <Route path="/buttons" element={<DemoPageButtons />}></Route>
        <Route path="/textboxes" element={<DemoPageTextBoxes />}></Route>
        <Route path="/menus" element={<DemoPageMenus />}></Route>
        <Route path="/tables" element={<DemoPageTables />}></Route>
        <Route path="/inputs" element={<DemoPageOtherControls />}></Route>
        <Route path="/misc" element={<DemoPageMisc />}></Route>
        {/*}
        <Route path="/dialogs" element={<DemoPageDialogs />}></Route>
        <Route path="/selects" element={<DemoPageSelects />}></Route>
        {*/}
      </Routes>
    </HashRouter>
  );
}

function Main() {
  return <DemoPageWindows />;
}
