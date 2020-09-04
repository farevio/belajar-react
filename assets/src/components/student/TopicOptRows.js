import React from "react";

function SelectButton({topicId, topicOpt1Id, topicOpt2Id, setTopicOptId}) {
    const handleChange = (e) => {
        const optName = e.target.value;
        setTopicOptId(optName, topicId)
    }
    return (
        <select name={topicId} onChange={handleChange}>
            <option value="" defaultValue>pilih</option>
            {!topicOpt1Id && <option value="topicOpt1Id">opsi 1</option>}
            {!topicOpt2Id && <option value="topicOpt2Id">opsi 2</option>}
        </select>
    )
}

export default function TopicOptRows({ topics, topicOpt1Id, topicOpt2Id, setTopicOptId}) {
    return (
        <React.Fragment>
        {topics.map(topic => {
            return (
                <tr key={topic.id} className="row">
                    <td className="-col-xs-10">{topic.name}</td>
                    <td>{topic.quota}</td>
                    <td>
                        <SelectButton
                            topicId={topic.id}
                            topicOpt1Id={topicOpt1Id}
                            topicOpt2Id={topicOpt2Id}
                            setTopicOptId={setTopicOptId} />
                    </td>
                </tr>
            );
        })}
    </React.Fragment>
    );
    
};
