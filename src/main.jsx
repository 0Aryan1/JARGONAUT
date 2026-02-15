import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Protected from './components/AuthLayout.jsx'

// Lazy load all pages for better code splitting
const Home = lazy(() => import('./pages/Home.jsx'))
const BlogDetail = lazy(() => import('./pages/BlogDetail.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const HanketsuPage = lazy(() => import('./pages/HanketsuPage.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))
const AddPost = lazy(() => import('./pages/AddPost.jsx'))
const EditPost = lazy(() => import('./pages/EditPost.jsx'))

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
      <Route path="/post/:slug" element={
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
      <Route path="login" element={
        <Suspense fallback={<PageLoader />}>
          <Protected authentication={false}>
            <Login />
          </Protected>
        </Suspense>
      } />
      <Route path="signup" element={
        <Suspense fallback={<PageLoader />}>
          <Protected authentication={false}>
            <Signup />
          </Protected>
        </Suspense>
      } />
      <Route path="add-post" element={
        <Suspense fallback={<PageLoader />}>
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        </Suspense>
      } />
      <Route path="edit-post/:slug" element={
        <Suspense fallback={<PageLoader />}>
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        </Suspense>
      } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <RouterProvider router={src}/>
    </Provider>
  </StrictMode>,
)
