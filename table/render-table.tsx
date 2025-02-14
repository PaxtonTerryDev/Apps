'use client';

import Button from '../button/button';
import Table from './table';
import type { TableColumn } from './types';
import people from './test-data.json';

export interface Person {
	id: string | number;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	dob: string;
	location: { state: string; city: string; zip: string };
}

const columns: TableColumn<Person>[] = [
	{
		id: 'first-name',
		label: 'First Name',
		accessor: (person) => person.firstName,
		sort: (a, b) => a.firstName.localeCompare(b.firstName),
		defaultSort: true,
		defaultSortDirection: 'desc',
	},
	{
		id: 'last-name',
		label: 'Last Name',
		accessor: (person) => person.lastName,
		sort: (a, b) => a.lastName.localeCompare(b.lastName),
	},
	{
		id: 'email',
		label: 'Email',
		accessor: (person) => person.email,
		sort: (a, b) => a.email.localeCompare(b.email),
	},
	{
		id: 'phone',
		label: 'Phone',
		accessor: (person) => {
			if (person.phone.substring(0, 4) === '801') {
				return <div className="text-UC-purple-500">${person.phone}</div>;
			}
			return person.phone;
		},
	},
	{
		id: 'edit-button',
		label: 'Edit',
		accessor: (person) => {
			return (
				<Button
					onClick={() => console.log(`Editing ${person.firstName}'s profile!`)}
					variant="secondary"
				>
					Edit
				</Button>
			);
		},
	},
];

const testFunction = (row: Person) => {
	console.log(row.id);
};

function RenderTable() {
	return (
		<div className="h-full w-full overflow-scroll p-10">
			<Table<Person>
				columns={columns}
				data={people as Person[]}
				hover
				rowClickFunction={testFunction}
			/>
		</div>
	);
}

export default RenderTable;
