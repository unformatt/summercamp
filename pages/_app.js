import PropTypes from 'prop-types'
import 'gridjs/dist/theme/mermaid.css'
import '../styles/index.scss'

export default function SummerCampApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

SummerCampApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}
