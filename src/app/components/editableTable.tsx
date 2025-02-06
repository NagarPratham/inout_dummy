"use client";  // ✅ Ensures it's a client component

import { useEffect, useState } from "react";
import axios from "axios";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";

interface Record {
  _id: string;
  name: string;
  age: number;
  email: string;
}

export default function EditableTable() {
  const [data, setData] = useState<Record[]>([]);

  useEffect(() => {
    axios.get("/api/records").then((res) => setData(res.data));
  }, []);

  const updateRecord = async (rowIndex: number, columnId: string, value: string | number) => {
    const updatedData = [...data];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: value };
    setData(updatedData);

    await axios.put("/api/records", updatedData[rowIndex]);
  };

  const columns: ColumnDef<Record>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue, row, column }) => {
        const value = getValue() as string;
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => updateRecord(row.index, column.id, e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      },
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ getValue, row, column }) => {
        const value = getValue() as number;
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => updateRecord(row.index, column.id, Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue, row, column }) => {
        const value = getValue() as string;
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => updateRecord(row.index, column.id, e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      },
    },
  ];

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Editable Records Table</h2>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}