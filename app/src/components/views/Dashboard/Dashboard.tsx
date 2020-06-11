import React from 'react'
import Header from '../../parts/Header/Header'
import ProductList from '../../parts/ProductList/ProductList'
import ProductBrowser from '../../parts/ProductBrowser/ProductBrowser'
import "./Dashboard.css"

export default function Dashboard(){
  return (
    <>
      <Header />
      <main className="main">
        <ProductList></ProductList>
        <ProductBrowser></ProductBrowser>
      </main>
    </>
  )
}