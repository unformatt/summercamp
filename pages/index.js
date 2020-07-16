import { useState } from 'react'
import Layout from '../components/layout'
import CampGrid from '../components/campGrid'
import AgeFilter from '../components/filter/ageFilter'
import FormatFilter from '../components/filter/formatFilter'

export default function Index() {
  const [ageFilterValues, setAgeFilterValues] = useState(null)
  const [formatFilterValues, setFormatFilterValues] = useState(null)

  return (
    <>
      <Layout className="home">
        <div className="filters flex justify-center flex-col md:flex-row py-3">
          <span className="md:self-center md:p-2">Filters</span>
          <FormatFilter onChange={setFormatFilterValues} />
          <AgeFilter onChange={setAgeFilterValues} />
        </div>
        <CampGrid
          filters={{
            format: formatFilterValues
              ? formatFilterValues.map(o => o.value)
              : null,
            ages: ageFilterValues ? ageFilterValues.map(o => o.value) : null,
          }}
        />
      </Layout>
    </>
  )
}
