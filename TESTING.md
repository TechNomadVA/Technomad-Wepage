# Testing Guide for TechNomad

## Quick Start Testing

### 1. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` (or the port Vite assigns)

### 2. Test Production Build Locally
```bash
npm run build
npm run preview
```
Visit `http://localhost:4173`

---

## Testing Each Feature

### 1. Service Worker (Offline Support)

**Test Steps:**
1. Open your site in a browser
2. Open DevTools (F12) → Application tab → Service Workers
3. Verify service worker is registered
4. Go to Network tab → Check "Offline" checkbox
5. Reload the page - it should still work!

**What to Check:**
- ✅ Site loads from cache when offline
- ✅ Service worker appears in Application tab
- ✅ No console errors

**Chrome DevTools:**
- Application → Service Workers → Should see "activated and running"
- Application → Cache Storage → Should see cached files

---

### 2. Lazy Image Loading

**Test Steps:**
1. Open site with DevTools
2. Go to Network tab → Filter by "Img"
3. Scroll down slowly
4. Watch images load as they enter viewport

**What to Check:**
- ✅ Images don't load until scrolled into view
- ✅ Skeleton placeholder shows while loading
- ✅ Images fade in smoothly when loaded

**To Test:**
- Add `<LazyImage>` component to a page
- Scroll and watch Network tab

---

### 3. Error Boundary

**Test Steps:**
1. Intentionally break something in a component
2. Or add this test code:
```jsx
// In any component, add:
throw new Error("Test error")
```

**What to Check:**
- ✅ Error boundary catches the error
- ✅ Shows user-friendly error message
- ✅ "Try Again" button works
- ✅ "Go Home" button works
- ✅ Error details shown in development mode

---

### 4. Network Status (Offline Detection)

**Test Steps:**
1. Open site in browser
2. Open DevTools → Network tab
3. Check "Offline" checkbox
4. Should see offline notification appear

**What to Check:**
- ✅ Notification appears when going offline
- ✅ Notification disappears when back online
- ✅ Dismiss button works
- ✅ Styled correctly (magenta/pink)

---

### 5. Analytics

**Test Steps:**
1. Open site in production mode
2. Open DevTools → Network tab
3. Filter by "gtag" or "analytics"
4. Should see requests to Google Analytics

**What to Check:**
- ✅ Analytics script loads (only in production)
- ✅ Page views are tracked
- ✅ No errors in console

**To Verify:**
- Check Google Analytics dashboard after visiting site
- Should see real-time visitors

---

### 6. Mobile Responsive Design

**Test Steps:**
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test different devices:
   - iPhone 12/13/14
   - iPad
   - Samsung Galaxy
   - Custom sizes

**What to Check:**
- ✅ Layout adapts to screen size
- ✅ Touch interactions work
- ✅ Text is readable
- ✅ Buttons are tappable (min 48px)
- ✅ No horizontal scrolling

**Test Breakpoints:**
- 480px (small mobile)
- 768px (mobile/tablet)
- 1024px (tablet)

---

### 7. Touch Interactions

**Test Steps:**
1. Use a mobile device or Chrome DevTools device mode
2. Tap the "Apply for Founding Access" button
3. Watch particle effects change color

**What to Check:**
- ✅ Button scales down when pressed
- ✅ Pulse animation plays
- ✅ Particles change color on touch
- ✅ Smooth transitions

---

### 8. PWA (Progressive Web App)

**Test Steps:**
1. Open site on mobile device
2. Look for "Add to Home Screen" prompt
3. Or manually: Browser menu → "Add to Home Screen"

**What to Check:**
- ✅ App icon appears on home screen
- ✅ Opens in standalone mode (no browser UI)
- ✅ Works offline after first visit
- ✅ Theme color matches brand

**Chrome DevTools:**
- Application → Manifest → Should see manifest details
- Application → Service Workers → Should be registered

---

### 9. Performance Testing

**Test Steps:**
1. Open DevTools → Lighthouse tab
2. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
   - PWA

**What to Check:**
- ✅ Performance score > 80
- ✅ Mobile-friendly
- ✅ Fast load times
- ✅ Good Core Web Vitals

---

### 10. Safe Area Insets (Notched Devices)

**Test Steps:**
1. Test on iPhone X or newer (or simulator)
2. Check that content doesn't hide behind notch
3. Check bottom content doesn't hide behind home indicator

**What to Check:**
- ✅ Header positioned below notch
- ✅ Content has proper padding
- ✅ Coming soon card respects safe areas

---

## Common Issues & Solutions

### Service Worker Not Registering
- **Check:** HTTPS required (or localhost)
- **Check:** Service worker file exists in `public/sw.js`
- **Check:** Browser console for errors

### Analytics Not Working
- **Check:** Only works in production build (`npm run build`)
- **Check:** Google Analytics ID is correct
- **Check:** Network tab for gtag requests

### Images Not Lazy Loading
- **Check:** Using `<LazyImage>` component, not `<img>`
- **Check:** Intersection Observer is supported (all modern browsers)

### Offline Mode Not Working
- **Check:** Service worker is registered
- **Check:** Site visited at least once while online
- **Check:** Cache Storage has files

---

## Browser Testing Checklist

Test in these browsers:
- ✅ Chrome (desktop & mobile)
- ✅ Safari (iOS)
- ✅ Firefox
- ✅ Edge
- ✅ Samsung Internet (Android)

---

## Quick Test Commands

```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Check for errors
npm run build 2>&1 | grep -i error
```

---

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests
- Lighthouse CI for performance

