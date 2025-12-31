import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// Lazy load all pages for better code splitting
const Home = lazy(() => import('./pages/Home.jsx'))
const BlogDetail = lazy(() => import('./pages/BlogDetail.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const HanketsuPage = lazy(() => import('./pages/HanketsuPage.jsx'))

// Loading component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background: '#0a0b14',
    color: 'white',
    fontSize: '1.5rem'
  }}>
    Loading...
  </div>
)

const src = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={
        <Suspense fallback={<PageLoader />}>
          <Home />
        </Suspense>
      } />
      <Route path="blog/:id" element={
        <Suspense fallback={<PageLoader />}>
          <BlogDetail />
        </Suspense>
      } />
      <Route path="about" element={
        <Suspense fallback={<PageLoader />}>
          <About />
        </Suspense>
      } />
      <Route path="contact" element={
        <Suspense fallback={<PageLoader />}>
          <Contact />
        </Suspense>
      } />
      <Route path="hanketsu" element={
        <Suspense fallback={<PageLoader />}>
          <HanketsuPage />
        </Suspense>
      } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={src} />
  </StrictMode>,
)
