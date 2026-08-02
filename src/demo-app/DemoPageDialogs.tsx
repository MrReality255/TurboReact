import { useState } from "react";
import { TButton, THeading, TNameValue, TWindow } from "../turbo-react";
import { DemoAppLayout } from "./DemoAppLayout";
import { useTestDlg } from "./components/TestDlg";

export function DemoPageDialogs() {
  const dlg = useTestDlg();
  const [result, setResult] = useState<string>("--");
  return (
    <DemoAppLayout selected="dialogs">
      <TWindow>
        <THeading>Standard dialog</THeading>
        <TNameValue
          items={[{ name: "Dialog data", value: result }]}
        ></TNameValue>
        <TButton onClick={() => handleShowDlg()}>Show a dialog</TButton>
      </TWindow>
    </DemoAppLayout>
  );

  async function handleShowDlg() {
    const result = await dlg.show(null, { id: 34 });
    setResult(
      JSON.stringify({
        ctx: result?.ctx,
        data: result?.submitData,
        raw: result?.rawData.getRef(),
      }),
    );
  }
}
