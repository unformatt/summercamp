import PropTypes from 'prop-types'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ pageTitle = null, className = '', children }) {
  return (
    <div className="px-4">
      <Meta pageTitle={pageTitle} />
      <Header />
      <div className={`${className} min-h-screen`}>
        <main className="content">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array,
}
