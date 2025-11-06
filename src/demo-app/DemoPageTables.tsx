import { useState } from 'react';
import { TTable } from '../turbo-react/atoms/Table';
import { PalettePanel } from './components/PalettePanel';
import { SampleTableData } from './demo_data';
import { DemoAppLayout } from './DemoAppLayout';
import { TNameValue } from '../turbo-react/atoms/NameValue';
import { TRowLayout, TVertLayout } from '../turbo-react/layout';

export function DemoPageTables() {
  const [selectedRow, setSelectedRow] = useState('');
  const [selectedCol, setSelectedCol] = useState('');

  return (
    <DemoAppLayout selected="tables">
      <TRowLayout>
        <PalettePanel lineHeight={'20em'}>
          <TVertLayout
            gap={'1em'}
            header={
              (selectedRow || selectedCol) && (
                <TRowLayout>
                  <TNameValue name="Selected col">{selectedCol}</TNameValue>
                  <TNameValue name="Selected row">{selectedRow}</TNameValue>
                </TRowLayout>
              )
            }
          >
            <TTable
              data={SampleTableData}
              columns={[
                { id: 'Name', caption: 'Name', data: 'name', sortIcon: 'down' },
                {
                  id: 'Some value',
                  data: 'value1',
                  align: 'center',
                  sortIcon: 'up',
                },
                {
                  id: 'Custom value',
                  data: 'customValue2',
                  align: 'right',
                  icon: 'up',
                },
                { id: 'Date', data: 'date', align: 'center', icon: 'down' },
              ]}
              onRowClick={(item) => setSelectedRow(JSON.stringify(item))}
              onHeaderClick={(hdr) => setSelectedCol(hdr.id)}
            ></TTable>
          </TVertLayout>
        </PalettePanel>
      </TRowLayout>
    </DemoAppLayout>
  );
}