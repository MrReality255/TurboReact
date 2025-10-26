import { DateTime } from "luxon";

type TableItem = {
	name: string;
	id: number;
	value1: number;
	customValue2: number;
	date: DateTime;
};

// Sample data for TableItem type
export const SampleTableData: TableItem[] = [
	{
		id: 1,
		name: "Alice Johnson",
		value1: 245.75,
		customValue2: 89.3,
		date: DateTime.fromISO("2025-01-15T09:30:00"),
	},
	{
		id: 2,
		name: "Bob Smith",
		value1: 178.2,
		customValue2: 156.45,
		date: DateTime.fromISO("2025-01-16T14:15:00"),
	},
	{
		id: 3,
		name: "Carol Davis",
		value1: 312.9,
		customValue2: 23.67,
		date: DateTime.fromISO("2025-01-17T11:45:00"),
	},
	{
		id: 4,
		name: "David Wilson",
		value1: 89.5,
		customValue2: 234.12,
		date: DateTime.fromISO("2025-01-18T16:20:00"),
	},
	{
		id: 5,
		name: "Eva Martinez",
		value1: 456.3,
		customValue2: 78.9,
		date: DateTime.fromISO("2025-01-19T08:10:00"),
	},
	{
		id: 6,
		name: "Frank Brown",
		value1: 123.45,
		customValue2: 345.67,
		date: DateTime.fromISO("2025-01-20T13:25:00"),
	},
	{
		id: 7,
		name: "Grace Lee",
		value1: 678.9,
		customValue2: 12.34,
		date: DateTime.fromISO("2025-01-21T10:05:00"),
	},
	{
		id: 8,
		name: "Henry Garcia",
		value1: 234.56,
		customValue2: 189.01,
		date: DateTime.fromISO("2025-01-22T15:40:00"),
	},
	{
		id: 9,
		name: "Ivy Thompson",
		value1: 567.89,
		customValue2: 45.67,
		date: DateTime.fromISO("2025-01-23T12:30:00"),
	},
	{
		id: 10,
		name: "Jack Rodriguez",
		value1: 345.67,
		customValue2: 278.9,
		date: DateTime.fromISO("2025-01-24T17:15:00"),
	},
	{
		id: 11,
		name: "Kathy Anderson",
		value1: 789.01,
		customValue2: 67.89,
		date: DateTime.fromISO("2025-01-25T09:50:00"),
	},
	{
		id: 12,
		name: "Liam Taylor",
		value1: 456.78,
		customValue2: 134.56,
		date: DateTime.fromISO("2025-01-26T14:35:00"),
	},
	{
		id: 13,
		name: "Mia White",
		value1: 123.89,
		customValue2: 301.23,
		date: DateTime.fromISO("2025-01-27T11:20:00"),
	},
	{
		id: 14,
		name: "Noah Harris",
		value1: 890.12,
		customValue2: 89.45,
		date: DateTime.fromISO("2025-01-28T16:10:00"),
	},
	{
		id: 15,
		name: "Olivia Clark",
		value1: 234.01,
		customValue2: 167.89,
		date: DateTime.fromISO("2025-01-29T08:45:00"),
	},
	{
		id: 16,
		name: "Peter Lewis",
		value1: 567.23,
		customValue2: 234.01,
		date: DateTime.fromISO("2025-01-30T13:55:00"),
	},
	{
		id: 17,
		name: "Quinn Walker",
		value1: 345.45,
		customValue2: 56.78,
		date: DateTime.fromISO("2025-01-31T10:25:00"),
	},
	{
		id: 18,
		name: "Rachel Hall",
		value1: 678.34,
		customValue2: 289.34,
		date: DateTime.fromISO("2025-02-01T15:30:00"),
	},
	{
		id: 19,
		name: "Sam Young",
		value1: 123.67,
		customValue2: 145.67,
		date: DateTime.fromISO("2025-02-02T12:15:00"),
	},
	{
		id: 20,
		name: "Tina King",
		value1: 901.23,
		customValue2: 78.12,
		date: DateTime.fromISO("2025-02-03T17:05:00"),
	},
];
