import Codeblock from '../code-blocks/code-block';
import Paragraph from '../paragraph/paragraph';
import DownloadComponentLink from '../../../components/download-component-link';
import SimpleTable from './simple-table';
import RenderTable from './render-table';
import ApiDescription from '@/app/components/api-description';

export default function Page() {
	return (
		<>
			<h1 className="font-serif text-2xl font-bold">Table</h1>
			<div className="my-3">
				<Paragraph>
					The Table component logically organizes related information in row and column format with
					headers being displayed on top.
				</Paragraph>
				<Paragraph>
					There are two options in regards to the Table component. If you are only interested in the
					styles, you can find those in the Simple example below. Further down, you will find a more
					functional table with built in data handling, sorting, pagination and the ability to pass
					in custom components and styling.
				</Paragraph>
				<h1 className="mt-4 font-serif text-2xl font-bold">Simple</h1>
				<Codeblock filePath="table/simple-table.tsx">
					<SimpleTable />
				</Codeblock>
				<h1 className="my-6 font-serif text-2xl font-bold">Advanced</h1>
				<Paragraph>
					You can click the link below to download the complete table component. This includes three
					files - the table.tsx component, the table context and the type definitions. There is also
					an example.tsx file that you can use to see how this component is implemented, but that
					can be deleted.
				</Paragraph>
				<DownloadComponentLink componentName="Table" filePath="public/ComponentDownloads/Table" />
				<Codeblock filePath="table/table.tsx">
					<RenderTable />
				</Codeblock>
				<h1 className="my-6 font-serif text-2xl font-bold">API</h1>
				<h2 className="my-6 font-serif text-xl font-bold">Required Props</h2>
				<ApiDescription name="Columns" type="TableColumn<T>[ ]">
					TableColumn is a generic interface that accepts any kind of class / interface. An example
					of this can be found in the example.tsx file in the component download. Each Column has
					three required properties -
					<ApiDescription name="id" type="string | number" variant="sub">
						The id must be distinct from other tableColumns
					</ApiDescription>
					<ApiDescription name="label" type="string" variant="sub">
						What will be displayed as the column header.
					</ApiDescription>
					<ApiDescription name="accessor" type="(data: T) => React.ReactNode" variant="sub">
						A callback function that assigns the column to a specific data field from the generic
						type provided. Additionally, by having this callback return a custom component, you can
						render any jsx element in the table. You can see an example of this in the example.tsx
						file under the &apos;edit-table&apos; TableColumn object.
					</ApiDescription>
					<ApiDescription name="className?" type="string" variant="sub">
						Any tailwind classes you want passed to the &apos;td&apos; element.
					</ApiDescription>
					<ApiDescription name="sort?" type="(a: T, b: T) => number;" variant="sub">
						Callback function that enables the table to sort rows based on that column&apos;s
						values. A basic implementation is shown in example.tsx, but can be more complex if
						needed.
					</ApiDescription>
					<ApiDescription name="defaultSort?" type="boolean" variant="sub">
						Whether the table should sort by this column initially.
					</ApiDescription>
					<ApiDescription name="defaultSortDirection?" type='"asc" | "desc"' variant="sub">
						Which direction it should sort by default. Only applicable if &apos;defaultSort&apos; is
						marked true.
					</ApiDescription>
				</ApiDescription>
				<ApiDescription name="data" type="T[ ] extends TableData">
					Data must be of the type given to the table columns. These types can be virtually
					anything. Again, you can see the Person type definition in example.tsx for an example.
					Your class / interface <span className="font-bold">must</span> extend from the{' '}
					<span className="text-UC-blue-500">TableData</span> interface. This is a lightweight class
					with only an &apos;id&apos; field - this is necessary for typescript to assign keys to
					objects. Each object rendered by the table should have a unique id.
				</ApiDescription>
				<Paragraph>
					Additionally, there a couple of optional properties you can assign to the TableColumn
					object.
				</Paragraph>
				<ApiDescription name="pagination?" type="boolean">
					<Paragraph>
						Pagination is included by default. If you want all data to be rendered in the table, you
						can just set the property to false. You can also change the default number of rows
						displayed on each page of the table by passing a &apos;rowsPerPage&apos; property to the
						table component. This is set to 10 by default.
					</Paragraph>
					<Paragraph>
						The pagination tool renders a different &apos;component&apos; based on the number of
						total pages, and where the current page falls in the range of pages. This rendering
						logic is contained in the &apos;PaginationComponent&apos; located in the table.tsx file.
					</Paragraph>
				</ApiDescription>
				<ApiDescription name="rowClickFunction?" type="(row: T) => unknown">
					This property accepts a callback function that is executed when a row is clicked. That
					row&apos;s data is passed as an argument to the callback, so it can be accessed. For
					example, in the component render above, you can click a row, and it will print the name to
					the console.
				</ApiDescription>
				<ApiDescription name="Hover?" type="boolean">
					Displays a hover effect on rows. True by default.
				</ApiDescription>
				<ApiDescription name="Pointer?" type="boolean">
					Displays a cursor-pointer on row hover. True by default.
				</ApiDescription>
				<h2 className="my-6 font-serif text-xl font-bold">Final Notes</h2>
				<Paragraph>
					Most of the logic for the table is handled in the table context, so if something needs to
					be adjusted, you can find it there.
				</Paragraph>
				<Paragraph>
					Currently, there is not built in ability to asynchronously load / paginate data; it only
					accepts an array of data and operates on that. If you are working with extremely large
					datasets, you will want to extend this component to handle that. An example of this is in
					the UCG-Payments application, on the main dashboard (That uses the react-data-table
					component, but the same principles apply).
				</Paragraph>
			</div>
		</>
	);
}
