import PropTypes from 'prop-types'
import { uniqueValues } from '../../utils'
import { rows } from '../campGrid/data'
import Filter from './index'

const options = uniqueValues(rows, 'ages').map(v => ({
  value: v,
  label: v,
}))

function AgeFilter({ onChange }) {
  return (
    <Filter
      placeholder="filter by age group"
      options={options}
      onChange={onChange}
    />
  )
}

AgeFilter.propTypes = {
  onChange: PropTypes.func,
}

export default AgeFilter
