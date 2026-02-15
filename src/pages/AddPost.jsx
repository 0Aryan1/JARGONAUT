import React, { lazy, Suspense } from 'react'
import PostForm from '../components/post-form/PostForm.jsx'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer'

const Galaxy = lazy(() => import('../components/Galaxy'));

function AddPost() {
  return (
    <div className="min-h-screen bg-[#0a0b14] relative overflow-hidden">
      {/* Navbar */}
      <Navbar position="fixed" scrollBehavior={false} />

      {/* Galaxy Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#0a0b14]" />}>
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0.2}
            hueShift={200}
            transparent={false}
            repulsionStrength={3}
            twinkleIntensity={0.5}
          />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b14]/50 via-[#0a0b14]/70 to-[#0a0b14] z-10" />

      {/* Content */}
      <div className="relative z-20 pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Create New Post</h1>
            <PostForm />
          </div>
        </div>
      </div>

     
    </div>
  )
}

export default AddPost
