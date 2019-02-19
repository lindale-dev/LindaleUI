import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Select from './Select';
import ParameterElement from './ParameterElement';

function SelectElement(props)
{
    return(
        <ParameterElement name={props.name} tooltip={props.tooltip} actionCols={props.actionCols} >
            <Select className='small'
                    disabled={props.disabled}
                    fullWidth
                    options={props.options}
                    selectedOption={props.selectedOption}
                    onChange={props.onChange} />
        </ParameterElement>
    )
}

SelectElement.propTypes = {
    actionCols: PropTypes.number,
    disabled: PropTypes.bool,
    options: PropTypes.objectOf(PropTypes.node).isRequired,
    name: PropTypes.string.isRequired,
    selectedOption: PropTypes.string,
    onChange: PropTypes.func
};

SelectElement.defaultProps = {
    actionCols: 6,
    disabled: false
}

export default React.memo(SelectElement);
