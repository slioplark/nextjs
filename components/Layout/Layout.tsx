import styles from '@styles/Home.module.css'
import React, { ReactNode } from 'react'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
