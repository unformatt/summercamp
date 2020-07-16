import PropTypes from 'prop-types'
import Head from 'next/head'

export default function Meta({ pageTitle }) {
  return (
    <Head>
      <title>{pageTitle ? pageTitle + ' -' : ''} Summercamps</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}

Meta.propTypes = {
  pageTitle: PropTypes.string,
}
