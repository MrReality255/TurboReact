import { Heading } from '../turbo-react/atoms/Heading';
import { Window } from '../turbo-react/atoms/Window';
import { DemoAppLayout } from './DemoAppLayout';
import { Button } from '../turbo-react/atoms/Buttons';
import { Form } from '../turbo-react/forms/Form';
import { FormField } from '../turbo-react/forms/FormField';
import { useNewFormContext } from '../turbo-react/hooks/useFormContext';
import { GroupBox } from '../turbo-react/atoms/GroupBox';
import { ColLayout } from '../turbo-react/layout/ColLayout';
import { FormButton } from '../turbo-react/forms/FormButton';
import { useDialog } from '../turbo-react/hooks/useDialog';
import { TDialogModalResult } from '../turbo-react/forms/types';
import { useState } from 'react';
import { NameValue } from '../turbo-react/atoms/NameValue';
import { InputUtils } from '../turbo-react/utils/input';
import { HorizLayout } from '../turbo-react/layout/HorizLayout';
import { RowLayout } from '../turbo-react/layout/RowLayout';

export function DemoPageDialogs() {
  const [data, setData] = useState<string | null>(null);

  const myDlg = useDialog((ctx) => {
    return {
      caption: 'Test dialog ',
      pos: {
        height: '50%',
        width: '99%',
      },
      footer: (
        <HorizLayout alignMode="right">
          <FormButton
            w0
            default
            disabled={!ctx.frm.isValid}
            onClick={() => {
              ctx.frm.validate();
              const isLoading = ctx.frm.checked('chkLoading');
              const isErr = ctx.frm.checked('chkFails');

              if (isLoading) {
                ctx.submit(
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({
                        result: !isErr ? 'ok' : undefined,
                        data: 'response-data',
                        error: isErr ? 'Request failed' : undefined,
                      });
                    }, 5000);
                  })
                );
                return;
              }

              ctx.submit({
                result: !isErr ? 'ok' : undefined,
                data: 'response-data',
                error: isErr ? 'Request failed' : undefined,
              });
            }}
          >
            OK
          </FormButton>
          <FormButton w0 cancel>
            Cancel
          </FormButton>
        </HorizLayout>
      ),
      content: (
        <HorizLayout>
          <RowLayout>
            <NameValue name="Form is valid">{ctx.frm.isValid ? 'yes' : 'no'}</NameValue>
            <FormField type="textbox" caption="Name" id="name"></FormField>

            <GroupBox caption={'A group box'} disabled={!!ctx.frm.checked('chk1')}>
              <RowLayout>
                <FormField type="textbox" caption="Name 1" id="name1"></FormField>
                <FormField type="textbox" caption="Name 2" id="name2"></FormField>
                <FormField type="textbox" caption="Name 3" id="name3"></FormField>
              </RowLayout>
            </GroupBox>

            <GroupBox>
              <FormField type="checkbox" caption="Disable group box" id="chk1"></FormField>
              <FormField type="checkbox" caption="The submit fails" id="chkFails"></FormField>
              <FormField type="checkbox" caption="The submit needs to load a while" id="chkLoading"></FormField>
            </GroupBox>

            <FormField type="progress" id="setting1" caption="Setting #1"></FormField>
          </RowLayout>
        </HorizLayout>
      ),
      onBeforeClose: function (modalResult: TDialogModalResult | null) {
        console.log(
          'triggered before closing the dialog:',
          modalResult,
          ' data: ',
          JSON.stringify(ctx.frm.data, null, 2)
        );
      },
    };
  });

  return (
    <DemoAppLayout selected="dialogs">
      <Heading>Dialogs</Heading>
      <RowLayout>
        <Window border="none" palette="dark">
          <p>This is the panel with the dialog.</p>
          <Button
            variant="text"
            onClick={async () => {
              const result = await myDlg.show({
                name: 'your name',
                name1: 'name option 1',
                name2: 'name option 2',
                chk1: 'true',
              });
              setData(JSON.stringify(result, null, 2));
              if (result) {
                console.log(JSON.stringify(InputUtils.getDataContent(result.frm), null, 2));
              }
            }}
          >
            Open dialog
          </Button>
        </Window>
        {data && <Window caption="Dialog result">{data}</Window>}
        <DemoForm></DemoForm>
      </RowLayout>
    </DemoAppLayout>
  );
}

function DemoForm() {
  const frm = useNewFormContext(InputUtils.getInitialState({ lastname: 'Your name' }));
  return (
    <Window palette="dialog" caption="Form panel">
      <NameValue name="Form is valid:" labelWidth={110}>
        {frm.isValid ? 'yes' : 'no'}
      </NameValue>
      <Form context={frm}>
        <FormField type="textbox" id="firstname" caption="First name"></FormField>
        <FormField type="textbox" id="lastname" caption="Last name"></FormField>
        <FormField
          type="dropdown"
          id="option"
          caption="Special option"
          dropDownProps={{
            items: [
              { id: 'option1', label: 'Special option 1' },
              { id: 'option2', label: 'Special option 2' },
            ],
          }}
        ></FormField>
        <Heading>Subform</Heading>
        <FormField
          type="form"
          id="Subform"
          caption="Subform"
          formProps={{
            items: [{ id: 'caption', type: 'textbox', caption: 'Caption' }],
          }}
        ></FormField>
        <Heading>Progress</Heading>
        <FormField type="progress" id="progress1" caption="Progress"></FormField>
        <FormField
          type="progress"
          id="progress2"
          caption="Progress"
          progressBarProps={{ readOnly: true }}
          value="75"
        ></FormField>
        <Heading>Template</Heading>
        <FormField
          type="template"
          id="items"
          templateProps={{
            itemFct: (_ctx, deleteFct) => (
              <div style={{ display: 'flex', width: '100%', gap: 20 }}>
                <div style={{ flexGrow: 1 }}>
                  <ColLayout cols={2} gap={20}>
                    <FormField type="textbox" caption="First Name" id="firstname" />
                    <FormField type="textbox" caption="Last Name" id="lastname" />
                  </ColLayout>
                </div>
                <div style={{ height: '100%', marginTop: '1.5em' }}>
                  <Button onClick={() => deleteFct()}>Delete</Button>
                </div>
              </div>
            ),
            wrapperFct: (content, addFct) => {
              return (
                <div style={{ marginBottom: '1em' }}>
                  <GroupBox>
                    {content}
                    <div style={{ padding: '1em 0' }}>
                      <Button palette="cyan" onClick={() => addFct()}>
                        New item
                      </Button>
                    </div>
                  </GroupBox>
                </div>
              );
            },
          }}
        ></FormField>
      </Form>
      <HorizLayout>
        <Button
          onClick={() => {
            validate();
          }}
        >
          Validate
        </Button>
        <Button onClick={() => console.log(JSON.stringify(frm.data, null, 2))}>Output raw</Button>
        <Button onClick={() => console.log(JSON.stringify(InputUtils.getDataContent(frm), null, 2))}>
          Output data
        </Button>
      </HorizLayout>
    </Window>
  );

  function validate() {
    frm.validate();
  }
}
