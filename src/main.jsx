import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import HanketsuPage from './pages/HanketsuPage.jsx'

const src = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="blog/:id" element={<BlogDetail />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="hanketsu" element={<HanketsuPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={src} />
  </StrictMode>,
)
