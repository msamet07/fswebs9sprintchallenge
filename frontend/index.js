import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import AppFunctional from './components/AppFunctional'
import './styles/reset.css'
import './styles/styles.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <h1>GRID'e hoşgeldiniz</h1>
    <Routes>
      <Route path="/" element={<AppFunctional className="functional" />} />
    </Routes>
  </BrowserRouter>
)
