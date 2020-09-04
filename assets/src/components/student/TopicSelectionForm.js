import React from "react";
import PropTypes from 'prop-types';

import TopicOptControl from "./TopicOptControl";
import NimControl from "./NimControl";
import MetlitSelect from "./MetlitSelect";

export default class TopicSelectionForm extends React.Component {
    constructor(props) {
        super(props);
        TopicSelectionForm.propTypes = {
            metlits: PropTypes.array.isRequired,
            topics: PropTypes.array.isRequired,
        }        
        this.state = {
            data: {
                topicOpt1Id: null,
                topicOpt2Id: null,
                metlitId: props.metlits[0].id,
                nims: [],
            },
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.setTopicOptId = this.setTopicOptId.bind(this);
        this.handleDltNim = this.handleDltNim.bind(this);
        this.handleAddNim = this.handleAddNim.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidateNim = this.handleValidateNim.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const parsedValue = isNaN(Number(value))? value : Number(value); //parse value kalo bisa diparse ke integer

        this.setState(({ data }) => {
            const newData  = {...data, ...{[name]: parsedValue}}
            return { data: newData }
        });
    }

    setTopicOptId(optName, topicId) {
        this.setState(({data}) => {
            const newData = {...data, ...{[optName]: topicId}}
            return {data: newData}
        })
    }

    handleDltNim(nimToDlt) {
        this.setState(({data}) => {
            const newNims = data.nims.filter(nim => {
                return nim !== nimToDlt;
            });
            const newData = {...data, ...{nims: newNims}}
            return {data: newData}
        })
    }

    handleAddNim(nimToAdd) {
        const parsedNim = parseInt(nimToAdd)
        this.setState(({data, errors}) => {
            if (errors.nims) return null;
            const newData = {...data, ...{nims: [...data.nims, parsedNim]}}
            return {data: newData}
        })
    }

    handleValidateNim(nimToValidate) {
        this.setState(({data: {nims}}) => {
            if (!nimToValidate) {
                return {
                    errors: {
                        nims: "Nim harus diisi"
                    }
                }
            }

            const sameNim = nims.find(nim => {return nim == nimToValidate});
            if (sameNim) {
                return {
                    errors: {
                        nims: `Nim "${nimToValidate}" sudah ditambahkan`
                    }
                };
            }

            return {
                errors: {
                    nims: ''
                }
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('/student/new-topic-selection', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.data),
            redirect: 'follow'
        })
        .then(res => {return res.json()})
        .then(res => {
            console.log('RES JSONED')
            console.dir(res)
            if (res.errors) this.setState({errors: res.errors})
        });
    }

    render() {
        const { metlits, topics } = this.props;
        const { data: { nims }, errors } = this.state;
        return (
            <div className="container">
                <form
                    method="POST"
                    onSubmit={this.handleSubmit}
                >
                    <NimControl
                        nims={nims}
                        onAddNim={this.handleAddNim}
                        onValidateNim={this.handleValidateNim}
                        onDltNim={this.handleDltNim}
                        error={errors.nims? errors.nims : null}
                    />
                    <MetlitSelect
                        metlits={metlits}
                        onChange={this.handleChange}
                    />
                    <TopicOptControl
                        topics={topics}
                        topicOpt1Id={topicOpt1Id}
                        topicOpt2Id={topicOpt2Id}
                        setTopicOptId={this.setTopicOptId}
                    />
                    <button type="submit" className="btn btn-default">
                        Ajukan
                    </button>
                </form>
            </div>
        );
    }
}