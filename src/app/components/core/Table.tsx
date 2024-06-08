import React, { useState } from "react";

type TableColumn<T> = {
    key: string;
    header: string;
    getter: (row: T) => React.ReactNode;
};

type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    onCellEdit?: (newValue: string, row: T, columnKey: string) => void;
};

const Table = <T extends Record<string, any>>({
    data,
    columns,
    onCellEdit,
}: TableProps<T>) => {
    const [editingCell, setEditingCell] = useState<{
        rowKey: string | null;
        columnKey: string | null;
    }>({ rowKey: null, columnKey: null });

    const handleCellDoubleClick = (rowKey: string, columnKey: string) => {
        setEditingCell({ rowKey, columnKey });
    };

    const handleCellBlur = (
        rowKey: string,
        columnKey: string,
        newValue: string
    ) => {
        if (
            onCellEdit &&
            editingCell.rowKey === rowKey &&
            editingCell.columnKey === columnKey
        ) {
            onCellEdit(newValue, data.find((d) => d.id === rowKey)!, columnKey);
        }
        setEditingCell({ rowKey: null, columnKey: null });
    };

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                onDoubleClick={() =>
                                    handleCellDoubleClick(row.id, column.key)
                                }
                            >
                                {editingCell.rowKey === row.id &&
                                editingCell.columnKey === column.key ? (
                                    <input
                                        type="text"
                                        defaultValue={
                                            column.getter(row) as string
                                        }
                                        onBlur={(e) =>
                                            handleCellBlur(
                                                row.id,
                                                column.key,
                                                e.target.value
                                            )
                                        }
                                        autoFocus
                                    />
                                ) : (
                                    column.getter(row)
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default Table