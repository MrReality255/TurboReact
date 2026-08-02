import { useState } from 'react'
import { PalettePanel } from './components/PalettePanel'
import { SampleTableData } from './demo_data'
import { DemoAppLayout } from './DemoAppLayout'
import {
    TButton,
    THorizLayout,
    TNameValue,
    TRowLayout,
    TTable,
    TVertLayout,
    TWindow,
} from '../turbo-react'

export function DemoPageTables() {
    const [selectedRow, setSelectedRow] = useState<{
        value: string
        id: number | undefined
    }>({
        value: '',
        id: undefined,
    })
    const [selectedCol, setSelectedCol] = useState('')
    const [data, setData] = useState(SampleTableData)
    const [widths, setWidths] = useState<Record<string, number>>({})

    function onSetData(nr: number) {
        setData(SampleTableData.filter((_, x) => x < nr))
    }

    return (
        <DemoAppLayout selected="tables">
            <TRowLayout>
                <TWindow caption="Data">
                    <THorizLayout>
                        <TButton onClick={() => onSetData(0)}>No data</TButton>
                        <TButton onClick={() => onSetData(2)}>2 rows</TButton>
                        <TButton
                            onClick={() => onSetData(SampleTableData.length)}
                        >
                            Many rows
                        </TButton>
                    </THorizLayout>
                </TWindow>
                <PalettePanel lineHeight={'20em'}>
                    <TVertLayout
                        gap={'1em'}
                        header={
                            (selectedRow || selectedCol) && (
                                <TRowLayout>
                                    <TNameValue name="Selected col">
                                        {selectedCol}
                                    </TNameValue>
                                    <TNameValue name="Selected row">
                                        {selectedRow.value}
                                    </TNameValue>
                                </TRowLayout>
                            )
                        }
                    >
                        <TTable
                            data={data}
                            columns={[
                                {
                                    id: 'Name',
                                    caption: 'Name',
                                    data: 'name',
                                    sortIcon: 'down',
                                    resize: true,
                                },
                                {
                                    id: 'Some value',
                                    data: 'value1',
                                    align: 'center',
                                    sortIcon: 'up',
                                    resize: true,
                                },
                                {
                                    id: 'Custom value',
                                    data: 'customValue2',
                                    align: 'right',
                                    icon: 'up',
                                    resize: true,
                                },
                                {
                                    id: 'Date',
                                    data: 'date',
                                    align: 'center',
                                    icon: 'down',
                                    resize: true,
                                },
                            ]}
                            columnWidths={widths}
                            onColumnWidth={(id, w) =>
                                setWidths((prev) => ({ ...prev, [id]: w }))
                            }
                            onRowClick={(item) =>
                                setSelectedRow({
                                    value: JSON.stringify(item),
                                    id: item.id,
                                })
                            }
                            onGetSelected={(item) => item.id == selectedRow.id}
                            onHeaderClick={(hdr) => setSelectedCol(hdr.id)}
                        ></TTable>
                    </TVertLayout>
                </PalettePanel>
            </TRowLayout>
        </DemoAppLayout>
    )
}
