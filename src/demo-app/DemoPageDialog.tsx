import { THeading } from '../turbo-react/atoms/Heading';
import { TWindow } from '../turbo-react/atoms/Window';
import { DemoAppLayout } from './DemoAppLayout';
import { TButton } from '../turbo-react/atoms/Buttons';
import { TForm } from '../turbo-react/forms/Form';
import { TFormField } from '../turbo-react/forms/FormField';
import { useNewFormContext } from '../turbo-react/hooks/useNewFormContext';
import { TGroupBox } from '../turbo-react/atoms/GroupBox';
import { TColLayout } from '../turbo-react/layout/ColLayout';
import { TFormButton } from '../turbo-react/forms/FormButton';
import { useDialog } from '../turbo-react/hooks/useDialog';
import { TDialogModalResult } from '../turbo-react/forms/types';
import { useState } from 'react';
import { TNameValue } from '../turbo-react/atoms/NameValue';
import { InputUtils } from '../turbo-react/utils/input';
import { THorizLayout } from '../turbo-react/layout/HorizLayout';
import { TRowLayout } from '../turbo-react/layout/RowLayout';

export function DemoPageDialogs() {
  const [data, setData] = useState<string | null>(null);

  const myDlg = useDialog((ctx) => {
    return {
      caption: 'Test dialog ',
      pos: {
        height: '75%',
        width: '55%',
      },
      footer: (
        <THorizLayout alignMode="right">
          <TFormButton
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
                  }),
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
          </TFormButton>
          <TFormButton w0 cancel>
            Cancel
          </TFormButton>
        </THorizLayout>
      ),
      content: (
        <THorizLayout>
          <TRowLayout>
            <TNameValue name="Form is valid">{ctx.frm.isValid ? 'yes' : 'no'}</TNameValue>
            <TNameValue name="Outer context">{JSON.stringify(ctx.ctx)}</TNameValue>
            <TFormField type="textbox" caption="Name" id="name" autoFocus></TFormField>

            <TGroupBox caption={'A group box'} disabled={!!ctx.frm.checked('chk1')}>
              <TRowLayout>
                <TFormField type="textbox" caption="Name 1" id="name1"></TFormField>
                <TFormField type="textbox" caption="Name 2" id="name2"></TFormField>
                <TFormField type="textbox" caption="Name 3" id="name3"></TFormField>
              </TRowLayout>
            </TGroupBox>

            <TGroupBox>
              <TFormField type="checkbox" caption="Disable group box" id="chk1"></TFormField>
              <TFormField type="checkbox" caption="The submit fails" id="chkFails"></TFormField>
              <TFormField type="checkbox" caption="The submit needs to load a while" id="chkLoading"></TFormField>
            </TGroupBox>

            <TFormField type="progress" id="setting1" caption="Setting #1"></TFormField>
          </TRowLayout>
        </THorizLayout>
      ),
      onBeforeClose: function (modalResult: TDialogModalResult | null) {
        console.log(
          'triggered before closing the dialog:',
          modalResult,
          ' data: ',
          JSON.stringify(ctx.frm.data, null, 2),
        );
      },
    };
  });

  return (
    <DemoAppLayout selected="dialogs">
      <THeading>Dialogs</THeading>
      <TRowLayout>
        <TWindow border="none" palette="dark">
          <p>This is the panel with the dialog.</p>
          <TButton
            variant="text"
            onClick={async () => {
              const result = await myDlg.show(
                {
                  name: 'your name',
                  name1: 'name option 1',
                  name2: 'name option 2',
                  chk1: 'true',
                },
                { ctxContent: 'a value passed to the show function' },
              );
              setData(JSON.stringify(result, null, 2));
              if (result) {
                console.log(JSON.stringify(InputUtils.getDataContent(result.frm), null, 2));
              }
            }}
          >
            Open dialog
          </TButton>
        </TWindow>
        {data && <TWindow caption="Dialog result">{data}</TWindow>}
        <DemoForm></DemoForm>
      </TRowLayout>
    </DemoAppLayout>
  );
}

function DemoForm() {
  const frm = useNewFormContext(InputUtils.getInitialState({ lastname: 'Your name' }));
  return (
    <TWindow palette="dialog" caption="Form panel">
      <TNameValue name="Form is valid:" labelWidth={110}>
        {frm.isValid ? 'yes' : 'no'}
      </TNameValue>
      <TForm context={frm}>
        <TFormField type="textbox" id="firstname" caption="First name"></TFormField>
        <TFormField type="textbox" id="lastname" caption="Last name"></TFormField>
        <TFormField
          type="dropdown"
          id="option"
          caption="Special option"
          dropDownProps={{
            items: [
              { id: 'option1', label: 'Special option 1' },
              { id: 'option2', label: 'Special option 2' },
            ],
          }}
        ></TFormField>
        <THeading>Subform</THeading>
        <TFormField
          type="form"
          id="Subform"
          caption="Subform"
          formProps={{
            items: [{ id: 'caption', type: 'textbox', caption: 'Caption' }],
          }}
        ></TFormField>
        <THeading>Progress</THeading>
        <TFormField type="progress" id="progress1" caption="Progress"></TFormField>
        <TFormField
          type="progress"
          id="progress2"
          caption="Progress"
          progressBarProps={{ readOnly: true }}
          value="75"
        ></TFormField>
        <THeading>Template</THeading>
        <TFormField
          type="template"
          id="items"
          templateProps={{
            itemFct: (_ctx, deleteFct) => (
              <div style={{ display: 'flex', width: '100%', gap: 20 }}>
                <div style={{ flexGrow: 1 }}>
                  <TColLayout cols={2} gap={20}>
                    <TFormField type="textbox" caption="First Name" id="firstname" />
                    <TFormField type="textbox" caption="Last Name" id="lastname" />
                  </TColLayout>
                </div>
                <div style={{ height: '100%', marginTop: '1.5em' }}>
                  <TButton onClick={() => deleteFct()}>Delete</TButton>
                </div>
              </div>
            ),
            wrapperFct: (content, addFct) => {
              return (
                <div style={{ marginBottom: '1em' }}>
                  <TGroupBox>
                    {content}
                    <div style={{ padding: '1em 0' }}>
                      <TButton palette="cyan" onClick={() => addFct()}>
                        New item
                      </TButton>
                    </div>
                  </TGroupBox>
                </div>
              );
            },
          }}
        ></TFormField>
      </TForm>
      <THorizLayout>
        <TButton
          onClick={() => {
            validate();
          }}
        >
          Validate
        </TButton>
        <TButton onClick={() => console.log(JSON.stringify(frm.data, null, 2))}>Output raw</TButton>
        <TButton onClick={() => console.log(JSON.stringify(InputUtils.getDataContent(frm), null, 2))}>
          Output data
        </TButton>
      </THorizLayout>
    </TWindow>
  );

  function validate() {
    frm.validate();
  }
}
