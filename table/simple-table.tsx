'use client';
import clsx from 'clsx';

export default function Table({
	hover = true,
	pointer = true,
}: {
	hover?: boolean;
	pointer?: boolean;
}) {
	const renderSortIcons = () => {
		return (
			<div className="flex flex-col items-center">
				<span
					className={clsx(
						'material-symbols-outlined',
						'-mb-2 opacity-100 transition-opacity duration-200'
					)}
				>
					arrow_drop_up
				</span>
				<span
					className={clsx(
						'material-symbols-outlined',
						'-mt-2 opacity-25 transition-opacity duration-200'
					)}
				>
					arrow_drop_down
				</span>
			</div>
		);
	};
	return (
		<div className="min-w-1/2 mt-8 flow-root w-full">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block w-fit min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
						<table className="min-w-full divide-y divide-gray-300 border-b-gray-300">
							<thead className="bg-gray-50">
								<tr>
									<th
										className={clsx(
											'cursor-pointer px-6 py-3.5 text-sm font-semibold text-gray-500'
										)}
									>
										<div className="flex select-none items-center justify-start gap-x-2">
											Name
											{renderSortIcons()}
										</div>
									</th>
									<th className={clsx('px-6 py-3.5 text-sm font-semibold text-gray-500')}>
										<div className="flex select-none items-center justify-start gap-x-2">Title</div>
									</th>
									<th className={clsx('px-6 py-3.5 text-sm font-semibold text-gray-500')}>
										<div className="flex select-none items-center justify-start gap-x-2">Email</div>
									</th>
									<th className={clsx('px-6 py-3.5 text-sm font-semibold text-gray-500')}>
										<div className="flex select-none items-center justify-start gap-x-2">Role</div>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{testTableData.map((data: TestData) => (
									<tr
										key={data.id}
										className={clsx(hover && 'hover:bg-gray-100', pointer && 'cursor-pointer')}
									>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
											{data.name}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
											{data.title}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
											{data.email}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
											{data.role}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="h-fit w-full border-t border-gray-300">
							<div className="my-4 flex h-full items-center justify-center">
								<div className="flex w-fit justify-center gap-x-1 transition duration-150">
									<div
										className={clsx(
											'flex h-6 w-6 select-none items-center justify-center rounded-md bg-gray-200'
										)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="20px"
											viewBox="0 -960 960 960"
											width="20px"
											className={clsx('fill-current text-slate-400')}
										>
											<path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z" />
										</svg>
									</div>
									<div
										className={clsx(
											'mx-[2px] flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md bg-gray-500 text-center text-sm text-UC-bg-white'
										)}
									>
										<div className="">1</div>
									</div>
									<div
										className={clsx(
											'mx-[2px] flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-center text-sm text-slate-400 hover:text-slate-700'
										)}
									>
										<div className="">2</div>
									</div>
									<div
										className={clsx(
											'mx-[2px] flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-center text-sm text-slate-400 hover:text-slate-700'
										)}
									>
										<div className="">3</div>
									</div>
									<div
										className={clsx(
											'mx-[2px] flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-center text-sm text-slate-400 hover:text-slate-700'
										)}
									>
										<div className="">4</div>
									</div>
									<div
										className={clsx(
											'mx-[2px] flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-center text-sm text-slate-400 hover:text-slate-700'
										)}
									>
										<div className="">5</div>
									</div>
									<div className="flex h-6 w-6 select-none items-center justify-center text-center text-sm">
										...
									</div>
									<div
										className={clsx(
											'mx-[2px] flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-center text-sm text-slate-400 hover:text-slate-700'
										)}
									>
										<div className="">10</div>
									</div>
									<div
										className={clsx(
											'flex h-6 w-6 select-none items-center justify-center rounded-md'
										)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="20px"
											viewBox="0 -960 960 960"
											width="20px"
											className={clsx(
												'cursor-pointer fill-current text-slate-400 hover:text-slate-700'
											)}
										>
											<path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z" />
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export interface TestData {
	id: string | number;
	name: string;
	title: string;
	email: string;
	role: string;
}
const testTableData: TestData[] = [
	{
		id: 1,
		name: 'Person 1',
		title: 'Title 2',
		email: 'person1@example.com',
		role: 'Member',
	},
	{
		id: 2,
		name: 'Person 2',
		title: 'Title 3',
		email: 'person2@example.com',
		role: 'Member',
	},
	{
		id: 3,
		name: 'Person 3',
		title: 'Title 4',
		email: 'person3@example.com',
		role: 'Admin',
	},
	{
		id: 4,
		name: 'Person 4',
		title: 'Title 5',
		email: 'person4@example.com',
		role: 'Member',
	},
	{
		id: 5,
		name: 'Person 5',
		title: 'Title 1',
		email: 'person5@example.com',
		role: 'Member',
	},
	{
		id: 6,
		name: 'Person 6',
		title: 'Title 2',
		email: 'person6@example.com',
		role: 'Admin',
	},
	{
		id: 7,
		name: 'Person 7',
		title: 'Title 3',
		email: 'person7@example.com',
		role: 'Member',
	},
	{
		id: 8,
		name: 'Person 8',
		title: 'Title 4',
		email: 'person8@example.com',
		role: 'Member',
	},
	{
		id: 9,
		name: 'Person 9',
		title: 'Title 5',
		email: 'person9@example.com',
		role: 'Admin',
	},
	{
		id: 10,
		name: 'Person 10',
		title: 'Title 1',
		email: 'person10@example.com',
		role: 'Member',
	},
];
