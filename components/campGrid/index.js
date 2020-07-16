import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'gridjs'
import { isEqual } from 'lodash'
import { filterData } from '../../utils'
import { columns, rows } from './data'

const grid = new Grid({
  columns,
  data: rows,
  sort: true,
  pagination: false,
  autoWidth: false,
})

export default class CampGrid extends React.Component {
  state = {
    rows,
  }

  constructor(props) {
    super(props)
    this.wrapperRef = React.createRef()
  }

  componentDidMount() {
    grid.render(this.wrapperRef.current)
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.filters, this.props.filters)) {
      this.setState({
        rows: filterData(rows, this.props.filters),
      })
    }
    this._updateGrid()
  }

  render() {
    const { rows } = this.state
    const noData = rows && rows.length == 0

    return (
      <React.Fragment>
        {noData ? (
          <div className="p-5 text-lg text-center">
            No camps match your search
          </div>
        ) : null}

        <div
          className={`camp-grid ${noData ? 'hidden' : ''}`}
          ref={this.wrapperRef}
        />
      </React.Fragment>
    )
  }

  _updateGrid() {
    grid.updateConfig({
      data: this.state.rows,
    })
    grid.forceRender(this.wrapperRef.current)
  }
}

CampGrid.propTypes = {
  filters: PropTypes.object,
}
