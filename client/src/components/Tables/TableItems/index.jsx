import React, { useMemo } from "react";
import { useTable } from "react-table";

function TableItems({ items }) {
  const COLUMNS = [
    { header: "Moneda", accessor: "currency" },
    { header: "Item", accessor: "item" },
    { header: "Costo", accessor: "cost" },
    { header: "Venta", accessor: "sale" },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => items, []);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableItems;
