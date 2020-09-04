import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "shards-react";

function Row({ tuple, onEdit, onDelete, id, tabelName }) {
    Row.propTypes = {
        tuple: PropTypes.array,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func,
        tabelName: PropTypes.string,
        id: PropTypes.number.isRequired
    }
    const handleEdit = () => onEdit(id);
    const handleDelete = () => onDelete(tabelName,id);
    return (
        <tr>
            {tuple.map((data, i) => <td key={i}>{data}</td>)}
            <td>
                <Button theme="success" className="btn" onClick={handleEdit}>Ganti</Button>
                <Button theme="danger" className="btn" onClick={handleDelete}>Hapus</Button>
            </td>
        </tr>
    )
}


export default function EditableTable({ tuples, rowIds, columns, onRowEdit, onRowDelete, tbName, roleList }) {

    EditableTable.propTypes = {
        tuples: PropTypes.arrayOf(PropTypes.array),
        rowIds: PropTypes.arrayOf(PropTypes.number.isRequired),
        columns: PropTypes.arrayOf(PropTypes.string),
        onRowEdit: PropTypes.func,
        onRowDelete: PropTypes.func,
        tbName: PropTypes.string
    }
    const header = columns.map((col, i) => <th key={i}>{col}</th>);
    const rows = tuples.map((tuple, i) => {
        return (
            <Row
                key={rowIds[i]}
                tuple={tuple}
                id={rowIds[i]}
                tabelName={tbName}
                onEdit={onRowEdit}
                onDelete={onRowDelete}
            />
        )
    })
    return (
        <div className="table">
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
        </div>
    )

}
