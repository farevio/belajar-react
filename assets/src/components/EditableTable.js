import React from 'react';
import PropTypes from 'prop-types';

function Row({ tuple, onEdit, onDelete, id }) {
    Row.propTypes = {
        tuple: PropTypes.array,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func,
        id: PropTypes.number.isRequired
    }
    const handleEdit = () => onEdit(id);
    const handleDelete = () => onDelete(id);
    return (
        <tr>
            {tuple.map((data, i) => <td key={i}>{data}</td>)}
            <td>
                <button className="btn btn-default" onClick={handleEdit}>Ganti</button>
                <button className="btn btn-default" onClick={handleDelete}>Hapus</button>
            </td>
        </tr>
    )
}

export default function EditableTable({ tuples, rowIds, columns, onRowEdit, onRowDelete }) {
    EditableTable.propTypes = {
        tuples: PropTypes.arrayOf(PropTypes.array),
        rowIds: PropTypes.arrayOf(PropTypes.number.isRequired),
        columns: PropTypes.arrayOf(PropTypes.string),
        onRowEdit: PropTypes.func,
        onRowDelete: PropTypes.func
    }
    const header = columns.map((col, i) => <th key={i}>{col}</th>);
    const rows = tuples.map((tuple, i) => {
        return (
            <Row
                key={rowIds[i]}
                tuple={tuple}
                id={rowIds[i]}
                onEdit={onRowEdit}
                onDelete={onRowDelete}
            />
        )
    })
    return (
        <table className="table">
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )

}
