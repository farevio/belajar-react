import React from 'react';
import PropTypes from 'prop-types';
import { FormCheckbox } from "shards-react";

export default function RoleSelect({ roleList, onChange}) {
    RoleSelect.propTypes = {
        roleList: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChange: PropTypes.func
    }
    return (
        roleList.map(role => 
            
                <FormCheckbox key={role.id} value={role.id} onChange={onChange}
                    inline
                    name="role_id"
                  
                >
                    {role.role}
                </FormCheckbox>
            
        )


    )
}