import { useState } from "react";

import { NameValue, RowLayout, Table, VertLayout } from "../turbo_react";

import { PalettePanel } from "./components/PalettePanel";
import { SampleTableData } from "./demo_data";
import { DemoAppLayout } from "./DemoAppLayout";

export function DemoPageTables() {
	const [selectedRow, setSelectedRow] = useState("");
	const [selectedCol, setSelectedCol] = useState("");

	return (
		<DemoAppLayout selected='tables'>
			<RowLayout>
				<PalettePanel lineHeight={"20em"}>
					<VertLayout
						gap={"1em"}
						header={
							(selectedRow || selectedCol) && (
								<RowLayout>
									<NameValue name='Selected col'>{selectedCol}</NameValue>
									<NameValue name='Selected row'>{selectedRow}</NameValue>
								</RowLayout>
							)
						}>
						<Table
							data={SampleTableData}
							columns={[
								{ id: "Name", caption: "Name", data: "name", sortIcon: "down" },
								{
									id: "Some value",
									data: "value1",
									align: "center",
									sortIcon: "up",
								},
								{
									id: "Custom value",
									data: "customValue2",
									align: "right",
									icon: "↑",
								},
								{ id: "Date", data: "date", align: "center", icon: "↓" },
							]}
							onRowClick={(item) => setSelectedRow(JSON.stringify(item))}
							onHeaderClick={(hdr) => setSelectedCol(hdr.id)}></Table>
					</VertLayout>
				</PalettePanel>
			</RowLayout>
		</DemoAppLayout>
	);
}
