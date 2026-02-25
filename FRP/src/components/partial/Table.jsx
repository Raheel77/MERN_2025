import React from "react";
export default function DataTable({columns, data, onDelete, onUpdate}) {
    return (<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 py-4 sm:px-6 sm:py-5"><h3 className="text-base font-medium text-gray-800 dark:text-white/90">All Students</h3></div>
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <table className="min-w-full">{/* ✅ THEAD FROM PROPS */}
                        <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                            {columns.map((col, index) => (
                                <th key={index} className="px-5 py-3 text-left text-xs font-medium text-gray-500">
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-5 py-3 text-center text-xs">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">{data.map((row) => (
                            <tr key={row.id}>{
                                columns.map((col, index) => (
                                    <td key={index} className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <b>
                                            {col.render ? col.render(row) : row[col.field]}
                                        </b>
                                    </td>
                                ))}
                            <td className="px-5 py-3 text-center">
                                <button onClick={() => onUpdate(row)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Update</button>
                                <button onClick={() => onDelete(row.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>))}</tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>);
}