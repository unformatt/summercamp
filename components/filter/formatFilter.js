import PropTypes from 'prop-types'
import { uniqueValues } from '../../utils'
import { rows } from '../campGrid/data'
import Filter from './index'

const options = uniqueValues(rows, 'format').map(v => ({
  value: v,
  label: v,
}))

function FormatFilter({ onChange }) {
  return (
    <Filter
      placeholder="filter by camp format"
      options={options}
      onChange={onChange}
    />
  )
}

FormatFilter.propTypes = {
  onChange: PropTypes.func,
}

export default FormatFilter
