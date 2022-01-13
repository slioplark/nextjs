import styles from '@styles/Home.module.css'
import React from 'react'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
