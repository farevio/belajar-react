import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination({pageNum, maxPage, maxRow, onPageNumChange, onMaxRowChange}) {
    Pagination.propTypes = {
        pageNum: PropTypes.number.isRequired,
        maxPage: PropTypes.number,
        maxRow: PropTypes.number.isRequired,
        onPageNumChange: PropTypes.func.isRequired,
        onMaxRowChange: PropTypes.func.isRequired
    }
    const handlePageNumChange = (e) => {
        onPageNumChange(e.target.value)
    }
    const goPrevPage = () => {
        if (pageNum == 1) return;
        onPageNumChange(pageNum - 1);
    }
    const goNextPage = () => {
        if (pageNum == maxPage) return;
        onPageNumChange(pageNum + 1);
    }
    const handleMaxRowChange = (e) => {
        onMaxRowChange(parseInt(e.target.value));
    }
    return (
        <div className="page-setting">
            <nav>
                <ul className="pager">
                    <li className={`previous ${pageNum == 1 ? 'disabled' : ''}`}><a href="#" role="button" onClick={goPrevPage}><span aria-hidden="true">&larr;</span> Kembali</a></li>
                    <li>Halaman {pageNum} dari {maxPage}</li>
                    <li className={`next ${pageNum == maxPage} disabled`}><a href="#" role="button" onClick={goNextPage}>Lanjut <span aria-hidden="true">&rarr;</span></a></li>
                </ul>
            </nav>
            <div className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="maxRow">Baris per halaman</label>  
                    <select name="maxRow" className="form-control" value={maxRow} onChange={handleMaxRowChange}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </div>
    )
}