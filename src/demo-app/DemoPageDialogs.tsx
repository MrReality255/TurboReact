import { TButton, THeading, TWindow, useForm } from "../turbo-react";
import { DemoAppLayout } from "./DemoAppLayout";

export function DemoPageDialogs() {
  const dlg = useTestDlg();
  return (
    <DemoAppLayout selected="dialogs">
      <TWindow>
        <THeading>Standard dialog</THeading>
        <TButton onClick={() => handleShowDlg()}>Show a dialog</TButton>
      </TWindow>
    </DemoAppLayout>
  );

  async function handleShowDlg() {
    const result = await dlg.show(null, 23);
    alert(JSON.stringify(result));
  }
}

function useTestDlg() {
  const frm = useForm({
    form: {
      title: "My title",
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
    ],
  });
  return frm;
}
