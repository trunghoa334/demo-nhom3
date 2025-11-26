import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import classNames from "classnames/bind"
import styles from "./table.module.scss"

const cx = classNames.bind(styles)

export interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  pagination?: boolean
  pageSize?: number
  defaultRowsLoading?: number
}

export function Table<TData, TValue>({
  columns,
  data,
  loading = false,
  pagination = false,
  pageSize = 10,
  defaultRowsLoading = 5,
}: Readonly<TableProps<TData, TValue>>) {
  const table = useReactTable({
    data,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination && { getPaginationRowModel: getPaginationRowModel() }),
  })

  return (
    <div className={cx("table")}>
      <table className={cx("tableBox")}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan} className={cx("tableHead")}>
                  {header.isPlaceholder ? null : (
                    <div className={cx("tableHeadItem")}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: defaultRowsLoading }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className={cx("tcol")}>
                      <div className={cx("tableSkeleton")} />
                    </td>
                  ))}
                </tr>
              ))
            : table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={cx("tcol")}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      {pagination && (
        <div className={cx("tablePagination")}>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cx("tableBoxPaginationItem", { disabled: !table.getCanPreviousPage() })}
          >
            Prev
          </button>
          <span>
            Page {table.getState().pagination?.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cx("tableBoxPaginationItem", { disabled: !table.getCanNextPage() })}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
