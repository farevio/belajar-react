import React from 'react';
import PropTypes from 'prop-types';

export default class NimField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddNim = this.handleAddNim.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleAddNim(e) {
        this.props.onValidateNim(this.state.value);
        this.props.onAddNim(this.state.value);
        this.setState({value: ''});
    }

    render() {
        const value = this.state.value;
        const error = this.props.error;
        return (
            <tr>
                <td>
                    <div className={"form-group "+ (error? "has-error" : "")}>
                        <input
                            type="number"
                            className="form-control"
                            name="nimToAdd"
                            value={value}
                            onChange={this.handleChange}
                        />
                        {error &&
                            <span className="help-block">
                                {error}
                            </span>
                        }
                    </div>
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.handleAddNim}>
                        Tambah Anggota
                    </button>
                </td>
            </tr>
        );
    }
}

NimField.propTypes = {
    onAddNim: PropTypes.func.isRequired,
    onValidateNim: PropTypes.func.isRequired,
    error: PropTypes.string
}