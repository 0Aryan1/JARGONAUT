# Navbar Component Usage Guide

## Overview
The Navbar component is now a separate, reusable component that can be used across all pages. It supports authentication states, mobile menu, and scroll-hide behavior.

## Location
`/src/components/navbar/Navbar.jsx`

## Features
✅ Responsive design (mobile + desktop)
✅ Authentication-aware (shows Login/Signup OR Add Post/Logout based on auth status)
✅ Mobile hamburger menu
✅ Scroll-hide behavior (optional)
✅ Glass-morphism design with backdrop blur

## Usage

### Basic Usage (Absolute Position)
```jsx
import Navbar from '../components/navbar/Navbar';

function YourPage() {
  return (
    <div>
      <Navbar />
      {/* Your page content */}
    </div>
  );
}
```

### With Scroll-Hide Behavior (Fixed Position)
```jsx
<Navbar position="fixed" scrollBehavior={true} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | string | `'absolute'` | CSS position value: `'absolute'`, `'fixed'`, or `'relative'` |
| `scrollBehavior` | boolean | `false` | Enable scroll-hide behavior (navbar hides on scroll down, shows on scroll up) |

## Examples

### Home Page (Absolute, No Scroll Behavior)
```jsx
<Navbar />
```

### About Page (Fixed with Scroll Behavior)
```jsx
<Navbar position="fixed" scrollBehavior={true} />
```

### Contact Page (Fixed, No Scroll Behavior)
```jsx
<Navbar position="fixed" />
```

## Navigation Items

### When User is NOT Logged In:
- Logo (home)
- About
- Contact Us
- Login
- Sign Up

### When User IS Logged In:
- Logo (home)
- About
- Contact Us
- Add Post
- Logout Button

## Mobile Menu
- Hamburger icon appears on screens < 768px (md breakpoint)
- Smooth slide-down animation
- Closes automatically when navigating
- All desktop items available in mobile view

## Styling
The navbar uses:
- Glass-morphism effect (`backdrop-blur-md`)
- Rounded corners (`rounded-3xl`)
- Hover effects with scale transformations
- Responsive sizing for logo and padding

## Dependencies
- `react-router-dom` (for navigation)
- `react-redux` (for auth status)
- `./LogoutBtn` component (for logout functionality)

## Next Steps
Update all your page components to import and use this Navbar:

1. **Home.jsx** - ✅ Already updated
2. **About.jsx** - Replace navbar code with `<Navbar position="fixed" scrollBehavior={true} />`
3. **Contact.jsx** - Replace navbar code with `<Navbar />`
4. **BlogDetail.jsx** - Replace navbar code with `<Navbar position="fixed" scrollBehavior={true} />`
5. **HanketsuPage.jsx** - Replace navbar code with `<Navbar />`
6. **AddPost.jsx** - Add `<Navbar />`
7. **EditPost.jsx** - Add `<Navbar />`
