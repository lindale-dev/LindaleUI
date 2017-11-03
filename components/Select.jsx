import React from 'react';
import PropTypes from 'prop-types';
import mat from 'materialize-css';

class Select extends React.Component
{
    render()
    {
        const options = Object.keys(this.props.options).map((value, i) =>
            <option key={i} value={value}>
                {this.props.options[value]}
            </option>);

        return (
            <div className='option_element row'>
                <label className='col s5'>{this.props.name}</label>
                <select className='col s7' value={this.props.selectedOption} ref={this.initSelect.bind(this)}>
                    {options}
                </select>
            </div>
        );
    }

    initSelect(element)
    {
        // Materialize requires the select element to be initialized via JS
        $(element).material_select();

        $(element).on('change', e => {
            this.props.onChange(e.target.value);
        });
    }
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.objectOf(PropTypes.string).isRequired,
    selectedOption: PropTypes.string,
    onChange: PropTypes.func
};

export default Select;