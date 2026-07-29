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
      buttonsRight: [
        { action: "submit", label: "OK", default: true },
        { action: "cancel", label: "Stornieren", w1: true },
      ],
      buttonsLeft: [{ label: "Set defaults", w1: true }],
    },
    onSubmit: async (ctx) => {
      return {
        close: true,
        id: 12,
        submitData: 3333,
        rawData: ctx.rawData,
      };
    },
    onUpdate: () => {
      return {};
    },
    controls: (state) => {
      const isGroupDisabled = state.data.getValue("chk1") !== "true";
      return [
        {
          class: "plain",
          renderProps: { column: "1 / 3" },
          onRender: () => {
            console.log(JSON.stringify(state.data.getRef(), null, 2));
            return <div>is valid? {state.data.isValid() ? "y" : "n"}</div>;
          },
        },
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
          prop: { label: "Long text", prefix: "$", palette: "dark" },
        },
        {
          id: "sftmp1",
          class: "subform",
          renderProps: { column: "1 / 3" },
          subform: {
            groupBox: {},
            controls: [
              {
                id: "chk1",
                class: undefined,
                type: "checkBox",
                prop: { label: "Activate" },
              },
            ],
          },
        },
        {
          id: "grp1",
          hidden: isGroupDisabled,
          class: "subform",
          renderProps: { column: "1 / 3" },
          subform: {
            container: {
              columns: "1fr 1fr",
              gap: "1em",
            },
            groupBox: {
              label: "A group box with two options",
            },
            controls: [
              {
                id: "opt1",
                type: "textBox",
                prop: { label: "Option 1" },
              },
              {
                id: "opt2",
                type: "textBox",
                prop: { label: "Option 2" },
              },
            ],
          },
        },
      ];
    },
  });
  return frm;
}
