import { useState } from "react";
import {
  TButton,
  THeading,
  TNameValue,
  TWindow,
  useForm,
} from "../turbo-react";
import { DemoAppLayout } from "./DemoAppLayout";

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
    const result = await dlg.show(null, 23);
    setResult(JSON.stringify(result));
  }
}

function useTestDlg() {
  const frm = useForm({
    form: {
      title: "My title",
      columns: "1fr 1fr",
      gap: "1em",
    },
    controls: [
      {
        id: "firstname",
        class: undefined,
        type: "textBox",
        prop: { label: "First Name", autoFocus: true },
      },
      {
        id: "lastname",
        class: undefined,
        type: "textBox",
        prop: { label: "Last Name" },
      },
      {
        id: "longtext",
        class: undefined,
        type: "textBox",
        renderProps: {
          column: "1 / 3",
        },
        prop: { label: "Long text" },
      },
    ],
  });
  return frm;
}
