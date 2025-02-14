export interface TableProps<T extends TableData> {
	columns: TableColumn<T>[];
	data: T[];
	hover?: boolean;
	pointer?: boolean;
	pagination?: boolean;
	rowClickFunction?: (rowData: T) => unknown;
	rowsPerPage?: number;
}

export interface TableColumn<T> {
	id: string;
	label: string;
	accessor: (data: T) => React.ReactNode;
	sort?: (a: T, b: T) => number;
	defaultSort?: boolean;
	defaultSortDirection?: 'asc' | 'desc';
	headerClassName?: string;
	cellClassName?: string;
}

export interface TableData {
	id: string | number;
}

export interface SortConfig {
	columnId: string;
	direction: 'asc' | 'desc';
}
