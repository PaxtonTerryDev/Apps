'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import type { TableColumn, TableData, TableProps } from './types';
import { TableProvider, useTableContext } from './table-context';

export default function Table<T extends TableData>({
	columns,
	data,
	hover = true,
	pointer = true,
	pagination = true,
	rowsPerPage = 10,
	rowClickFunction,
}: TableProps<T>) {
	return (
		<TableProvider columns={columns} data={data} pagination={pagination} rowsPerPage={rowsPerPage}>
			<TableComponent
				hover={hover}
				pointer={pointer}
				rowClickFunction={rowClickFunction}
				pagination={pagination}
			/>
		</TableProvider>
	);
}
export function TableComponent<T extends TableData>({
	hover = true,
	pointer = true,
	pagination = true,
	rowClickFunction,
}: {
	hover?: boolean;
	pointer?: boolean;
	rowClickFunction?: (rowData: T) => unknown;
	pagination?: boolean;
}) {
	const { columns, sortConfig, displayedRows, handleSort } = useTableContext<T>();

	const renderSortIcons = (column: TableColumn<T>) => {
		if (!column.sort) return null;

		return (
			<div className="flex flex-col items-center">
				<span
					className={clsx(
						'material-symbols-outlined',
						'-mb-2 transition-opacity duration-200',
						sortConfig?.columnId === column.id && sortConfig.direction === 'asc'
							? 'opacity-100'
							: 'opacity-25'
					)}
				>
					arrow_drop_up
				</span>
				<span
					className={clsx(
						'material-symbols-outlined',
						'-mt-2 transition-opacity duration-200',
						sortConfig?.columnId === column.id && sortConfig.direction === 'desc'
							? 'opacity-100'
							: 'opacity-25'
					)}
				>
					arrow_drop_down
				</span>
			</div>
		);
	};

	return (
		<div className="mt-8 flow-root">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block w-fit min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
						<table
							className={clsx(
								'min-w-full divide-y divide-gray-300 border-b-gray-300 rounded-lg',
								'px-4 sm:px-6 lg:px-8'
							)}
						>
							<thead className={clsx('bg-gray-50')}>
								<tr>
									{columns.map((column: TableColumn<T>) => (
										<th
											key={column.id}
											className={clsx(
												'px-6 py-3.5 text-sm font-semibold text-gray-500',
												column.sort && 'cursor-pointer',
											)}
											onClick={() => column.sort && handleSort(column)}
										>
											<div
												className={clsx(
													'flex select-none items-center justify-start gap-x-2',
													column.headerClassName
												)}
											>
												{column.label}
												{renderSortIcons(column)}
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{displayedRows.map((row) => (
									<tr
										key={row.id}
										className={clsx(hover && 'hover:bg-gray-100', pointer && 'cursor-pointer')}
										onClick={() => rowClickFunction?.(row)}
									>
										{columns.map((column) => (
											<td
												key={column.id}
												className={clsx(
													'whitespace-nowrap px-6 py-4 text-sm text-gray-700',
													column.cellClassName
												)}
											>
												{column.accessor(row)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
						{pagination ? <PaginationComponent<T> /> : null}
					</div>
				</div>
			</div>
		</div>
	);
}

function PaginationComponent<T extends TableData>() {
	const { currentPage, totalPages } = useTableContext<T>();
	const [paginationArray, setPaginationArray] = useState<number[]>(
		createPaginationNumberArray(totalPages)
	);

	function createPaginationNumberArray(maxPage: number): number[] {
		let arr: number[] = [];
		for (let i = 1; i <= maxPage; i++) {
			arr.push(i);
		}
		return arr;
	}

	useMemo(() => setPaginationArray(createPaginationNumberArray(totalPages)), [totalPages]);

	function getPaginationCore() {
		const distanceToBase = currentPage - 1;
		const distanceToMax = totalPages - currentPage;
		if (totalPages <= 5) return <NoEllipsesPagination<T> numbers={paginationArray} />;

		if (distanceToBase <= 4) return <LeftWeightedPagination<T> numbers={paginationArray} />;

		if (distanceToMax <= 4) return <RightWeightedPagination<T> numbers={paginationArray} />;

		// if (distanceToBase >= 4 && distanceToMax <= 4)
		return <MiddleWeightedPagination<T> numbers={paginationArray} />;
	}

	return (
		<div className="h-fit w-full border-t border-gray-300">
			<div className="my-4 flex h-full items-center justify-center">
				<div className="flex max-w-fit justify-center overflow-x-hidden transition duration-150">
					<PreviousPage<T> />
					{getPaginationCore()}
					<NextPage<T> />
				</div>
			</div>
		</div>
	);
}

function NoEllipsesPagination<T extends TableData>({ numbers }: { numbers: number[] }) {
	return (
		<>
			{numbers.map((num: number) => (
				<PaginationNumber<T> pageNumber={num} key={num} />
			))}
		</>
	);
}
function LeftWeightedPagination<T extends TableData>({ numbers }: { numbers: number[] }) {
	return (
		<>
			<PaginationNumber<T> pageNumber={1} />
			<PaginationNumber<T> pageNumber={2} />
			<PaginationNumber<T> pageNumber={3} />
			<PaginationNumber<T> pageNumber={4} />
			<PaginationNumber<T> pageNumber={5} />
			<PaginationEllipses />
			<PaginationNumber<T> pageNumber={numbers[numbers.length - 1]} />
		</>
	);
}
function MiddleWeightedPagination<T extends TableData>({ numbers }: { numbers: number[] }) {
	const { currentPage } = useTableContext<T>();
	return (
		<>
			<PaginationNumber<T> pageNumber={1} />
			<PaginationEllipses />
			<PaginationNumber<T> pageNumber={numbers[currentPage - 2]} />
			<PaginationNumber<T> pageNumber={numbers[currentPage - 1]} />
			<PaginationNumber<T> pageNumber={numbers[currentPage]} />

			<PaginationEllipses />
			<PaginationNumber<T> pageNumber={numbers[numbers.length - 1]} />
		</>
	);
}
function RightWeightedPagination<T extends TableData>({ numbers }: { numbers: number[] }) {
	return (
		<>
			<PaginationNumber<T> pageNumber={1} />
			<PaginationEllipses />
			<PaginationNumber<T> pageNumber={numbers[numbers.length - 5]} />
			<PaginationNumber<T> pageNumber={numbers[numbers.length - 4]} />
			<PaginationNumber<T> pageNumber={numbers[numbers.length - 3]} />
			<PaginationNumber<T> pageNumber={numbers[numbers.length - 2]} />
			<PaginationNumber<T> pageNumber={numbers[numbers.length - 1]} />
		</>
	);
}

function PaginationNumber<T extends TableData>({ pageNumber }: { pageNumber: number }) {
	const { currentPage, setCurrentPage } = useTableContext<T>();
	const [active, setActive] = useState<boolean>(isCurrentPage());

	function isCurrentPage(): boolean {
		return pageNumber === currentPage;
	}

	useEffect(() => {
		setActive(isCurrentPage());
	}, [currentPage]);

	return (
		<div
			onClick={() => setCurrentPage(pageNumber)}
			className={clsx(
				'mx-[2px] flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-md text-center text-sm',
				active && 'bg-gray-500 text-UC-bg-white',
				!active && 'text-gray-500 hover:text-gray-700'
			)}
		>
			<div className="">{pageNumber}</div>
		</div>
	);
}

function PaginationEllipses() {
	return (
		<div className="flex h-6 w-6 select-none items-center justify-center text-center text-sm">
			...
		</div>
	);
}

function NextPage<T extends TableData>() {
	const { currentPage, setCurrentPage, canIncreasePage } = useTableContext<T>();
	const handleClick = () => {
		if (!canIncreasePage) return;
		setCurrentPage(currentPage + 1);
	};
	return (
		<div
			className={clsx(
				'flex h-6 w-6 select-none items-center justify-center rounded-md',
				!canIncreasePage && 'bg-gray-100'
			)}
			onClick={() => handleClick()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="20px"
				viewBox="0 -960 960 960"
				width="20px"
				className={clsx(
					'fill-current text-gray-500',
					canIncreasePage && 'cursor-pointer hover:text-gray-700'
				)}
			>
				<path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z" />
			</svg>
		</div>
	);
}

function PreviousPage<T extends TableData>() {
	const { currentPage, setCurrentPage, canDecreasePage } = useTableContext<T>();
	const handleClick = () => {
		if (!canDecreasePage) return;
		setCurrentPage(currentPage - 1);
	};
	return (
		<div
			className={clsx(
				'flex h-6 w-6 select-none items-center justify-center rounded-md',
				!canDecreasePage && 'bg-gray-100'
			)}
			onClick={() => handleClick()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="20px"
				viewBox="0 -960 960 960"
				width="20px"
				className={clsx(
					'fill-current text-gray-500',
					canDecreasePage && 'cursor-pointer hover:text-gray-500'
				)}
			>
				<path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z" />
			</svg>
		</div>
	);
}
