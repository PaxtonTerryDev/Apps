import type { ReactNode } from 'react';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import type { SortConfig, TableColumn, TableData } from './types';

interface TableContextProps<T extends TableData> {
	columns: TableColumn<T>[];
	data: T[];
	sortedData: T[];
	sortConfig: SortConfig | null;
	rowsPerPage: number;
	currentPage: number;
	totalPages: number;
	displayedRows: T[];
	setSortConfig: (config: SortConfig | null) => void;
	setSortedData: (data: T[]) => void;
	handleSort: (column: TableColumn<T>) => void;
	setRowsPerPage: (rows: number) => void;
	setCurrentPage: (page: number) => void;
	canIncreasePage: boolean;
	canDecreasePage: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<TableContextProps<any> | null>(null);

export function useTableContext<T extends TableData>() {
	const context = useContext(TableContext);
	if (!context) {
		throw new Error('useTableContext must be used within a TableProvider');
	}
	return context as TableContextProps<T>;
}

export function TableProvider<T extends TableData>({
	children,
	columns,
	data,
	pagination,
	rowsPerPage = 10,
}: {
	children: ReactNode;
	columns: TableColumn<T>[];
	data: T[];
	pagination: boolean;
	rowsPerPage: number;
}) {
	const [sortedData, setSortedData] = useState(data);
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(getDefaultSortConfig());
	const [displayedRows, setDisplayedRows] = useState<T[]>(data);
	const [rowsPer, setRowsPer] = useState<number>(rowsPerPage);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(
		calculateTotalPages(sortedData.length, rowsPer)
	);
	const [canIncreasePage, setCanIncreasePage] = useState<boolean>(
		currentPage >= 1 && currentPage < totalPages
	);
	const [canDecreasePage, setCanDecreasePage] = useState<boolean>(
		currentPage > 1 && currentPage <= totalPages
	);

	useEffect(() => {
		try {
			validateColumnsArray();
		} catch (error) {
			console.error(error);
		}
	}, [columns]);

	function validateColumnsArray(): void {
		// ensuress that only one column is marked as default
		const columnsMarkedDefault = columns.filter((col: TableColumn<T>) => col.defaultSort);
		if (columnsMarkedDefault.length > 1) {
			const invalidColumns = columnsMarkedDefault.map((col) => col.id).join('\n');
			throw new Error(
				`More than one column marked as defaultSort. The following columns are marked as defaultSort:\n${invalidColumns}`
			);
		}

		// Makes a lookup map of column id's to make sure they are all unique. If id doesn't exist, adds it to the table. If it does exist, it throws an error.
		const map = new Map();
		for (const col of columns) {
			if (map.has(col.id)) {
				throw new Error(`More than one column with id: ${col.id}`);
			}
			map.set(col.id, true);
		}
	}

	function getDefaultSortConfig(): SortConfig | null {
		const defaultCol: TableColumn<T> | undefined = columns.find(
			(col: TableColumn<T>) => col.defaultSort
		);
		if (!defaultCol) return null;
		const sortDirection = defaultCol.defaultSortDirection ?? 'asc';

		return {
			columnId: defaultCol.id,
			direction: sortDirection,
		};
	}

	const handleSort = (column: TableColumn<T>) => {
		if (!column.sort) return;

		// this sets the sort order back to default if the direction === 'desc'
		if (sortConfig?.columnId === column.id && sortConfig.direction === 'desc') {
			setSortConfig(null);
			setSortedData(data);
			return;
		}

		const direction =
			sortConfig?.columnId === column.id && sortConfig.direction === 'asc' ? 'desc' : 'asc';

		const sorted = [...data].sort((a, b) => {
			const sortOrder = direction === 'asc' ? 1 : -1;
			return column.sort!(a, b) * sortOrder;
		});

		setSortedData(sorted);
		setSortConfig({ columnId: column.id, direction });
	};

	useEffect(() => {
		if (!pagination) return;
		const newDisplayedRows = getPaginatedData(sortedData, sortedData.length, rowsPer, currentPage);
		setDisplayedRows([...newDisplayedRows]);
		setTotalPages(calculateTotalPages(sortedData.length, rowsPer));
	}, [sortedData, currentPage]);

	function getPaginatedData(
		fullDataArray: T[],
		totalRows: number,
		rowsPerPageVal: number,
		currentPaginationPage: number
	): T[] {
		const bounds = calculateDisplayedRowBounds(totalRows, rowsPerPageVal, currentPaginationPage);
		const renderedData = fullDataArray.slice(bounds.min, bounds.max);
		return renderedData;
	}

	function calculateDisplayedRowBounds(
		totalRowCount: number,
		rowsPerPageVal: number,
		currentPaginationPage: number
	): { min: number; max: number } {
		// Calculate the starting index (min) for the current page
		const min = Math.max(0, (currentPaginationPage - 1) * rowsPerPageVal);

		// Calculate the ending index (max) for the current page
		const max = Math.min(totalRowCount, min + rowsPerPageVal);

		return {
			min,
			max,
		};
	}

	function calculateTotalPages(totalRowCount: number, rowsPerPageVal: number): number {
		// Calculate the total number of pages
		return Math.ceil(totalRowCount / rowsPerPageVal);
	}

	useMemo(() => {
		setCanIncreasePage(currentPage >= 1 && currentPage < totalPages);
		setCanDecreasePage(currentPage > 1 && currentPage <= totalPages);
	}, [currentPage, totalPages]);

	const value: TableContextProps<T> = {
		columns,
		data,
		sortedData,
		sortConfig,
		rowsPerPage: rowsPer,
		currentPage,
		totalPages,
		displayedRows,
		setSortConfig,
		setSortedData,
		handleSort,
		setRowsPerPage: setRowsPer,
		setCurrentPage,
		canIncreasePage,
		canDecreasePage,
	};

	// Use the generic T when setting the context
	return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}
