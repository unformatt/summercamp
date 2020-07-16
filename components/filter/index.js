import PropTypes from 'prop-types'
import Select from 'react-select'

function Filter({ onChange, options, placeholder }) {
  return (
    <Select
      className="select-filter"
      classNamePrefix="select-filter"
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={false}
      isSearchable={false}
      isMulti
    />
  )
}

Filter.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
}

export default Filter
