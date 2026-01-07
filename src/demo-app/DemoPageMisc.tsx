import { TWindow } from "../turbo-react/atoms/Window";
import { THeading } from "../turbo-react/atoms/Heading";
import { TLoadingBar } from "../turbo-react/atoms/LoadingBar";
import { DemoAppLayout } from "./DemoAppLayout";
import { TViewport } from "../turbo-react/atoms/Viewport";
import { TButton } from "../turbo-react/atoms/Buttons";
import { useNotifications } from "../turbo-react/hooks/useNotifications";
import { TNameValue } from "../turbo-react/atoms/NameValue";
import { TColLayout } from "../turbo-react/layout/ColLayout";
import { TRowLayout } from "../turbo-react/layout/RowLayout";
import { THorizLayout } from "../turbo-react/layout/HorizLayout";
import { TVertLayout } from "../turbo-react/layout/VertLayout";
import { StrUtils } from "../turbo-react";

export function DemoPageMisc() {
  const n = useNotifications();

  return (
    <DemoAppLayout selected="misc">
      <TRowLayout>
        <THeading>Loading</THeading>
        <TLoadingBar></TLoadingBar>
        <TWindow caption="Date+Time">
          <TRowLayout>
            <TNameValue name="Datetime" labelWidth={100}>
              {StrUtils.formatDateTime(1767768486, "datetime")}
            </TNameValue>
            <TNameValue name="Date" labelWidth={100}>
              {StrUtils.formatDateTime(1767768486, "date")}
            </TNameValue>
            <TNameValue name="Time" labelWidth={100}>
              {StrUtils.formatDateTime(1767768486, "time")}
            </TNameValue>
          </TRowLayout>
        </TWindow>
        <TWindow caption="Horizontal layout">
          <THorizLayout gap={"5em"} left={<p>Some text on the left side</p>}>
            <p>Some context on the right side</p>
          </THorizLayout>
          <THorizLayout
            alignMode="right"
            gap={"5em"}
            left={<p>Some text on the left side</p>}
          >
            <p>Some context on the right side</p>
          </THorizLayout>
        </TWindow>
        <TViewport height={"200px"}>
          <TWindow caption="Vertical layout" fill>
            <TVertLayout
              header={<THeading>Heading</THeading>}
              footer={
                <>
                  <THeading>Footer</THeading>
                  <p>Content</p>
                </>
              }
            >
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
            </TVertLayout>
          </TWindow>
        </TViewport>
        <TWindow border="none" innerPadding="space">
          <THeading>Notifications</THeading>
          <TButton
            w1
            onClick={() => {
              n.show("Something succeeded in this reality.", {
                palette: "cyan",
                timeout: 0,
              });
            }}
          >
            Succeeded
          </TButton>
          <TButton
            w1
            onClick={() => {
              n.show("Something failed in this reality.", {
                palette: "red",
                timeout: 2000,
              });
            }}
          >
            Failed
          </TButton>
        </TWindow>
        <TWindow>
          <TColLayout cols={2} gap={"5em"}>
            <TRowLayout>
              <TNameValue
                actionWidth={"75px"}
                action={<TButton variant="text">Action</TButton>}
                name="Property 1"
              >
                Value 1 with very very very long content so it makes sure it has
                more than one line in the window being displayed.
              </TNameValue>
              <TNameValue name="Property 2">Value 2</TNameValue>
              <TNameValue name="Property 3">Value 3</TNameValue>
              <TNameValue name="Property 4">Value 4</TNameValue>
            </TRowLayout>
            <TRowLayout>
              <TNameValue
                labelWidth={100}
                items={[
                  {
                    name: "Property 1",
                    value: "Value 1",
                    action: <TButton variant="text">Action</TButton>,
                  },
                  { name: "Property 2", value: "Value 2" },
                  { name: "Property 3", value: "Value 3" },
                  { name: "Property 4", value: "Value 4" },
                ]}
              ></TNameValue>
            </TRowLayout>
          </TColLayout>
        </TWindow>
      </TRowLayout>
    </DemoAppLayout>
  );
}
