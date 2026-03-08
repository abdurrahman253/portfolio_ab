# Portfolio Updates — File Placement Guide

Replace each file in your project at the exact path shown below.

## 📁 File Map

| Updated File                     | Replace In Your Project At                        |
|----------------------------------|---------------------------------------------------|
| components/Hero.jsx              | src/components/Hero.jsx                           |
| components/Navbar.jsx            | src/components/Navbar.jsx                         |
| components/About.jsx             | src/components/About.jsx                          |
| components/Experience.jsx        | src/components/Experience.jsx                     |
| components/Education.jsx         | src/components/Education.jsx                      |
| components/Projects.jsx          | src/components/Projects.jsx                       |
| components/Contact.jsx           | src/components/Contact.jsx                        |
| layout.js                        | src/app/layout.js                                 |
| globals-additions.css            | APPEND to src/app/globals.css (do NOT replace)    |

---

## ✅ Summary of All Changes Made

### Hero.jsx
- Button label: "Let's Collaborate" → "Get In Touch"
- Button label: "Get Resume" → "Download CV"
- Added scroll indicator animation at bottom of hero section
- Added `id="home"` to section (was missing, broke scroll spy)

### Navbar.jsx
- Added **Resume download button** on desktop nav (red pill, one-click)
- Added **Download Resume** button in mobile dropdown menu
- Imported `Download` icon from lucide-react

### About.jsx
- Replaced "100% Self-Motivated" stat → "30+ Skills Mastered" (real & verifiable)
- Renamed "Year of Journey" → "Year of Experience"
- Renamed "Projects Built" → "Projects Shipped"
- Added "3 Live Products" stat (concrete & checkable)
- Rewrote paragraph 2 & 3 to show what you bring to employers
- Info card below image now links to GitHub (with arrow icon)

### Experience.jsx
- "Personal Projects" → "Independent Projects" (more professional)
- "Self-Learning" type → "Product Development" (focus on output)
- Tech count: '46+' → '30+' (consistent with Skills page)
- Bullet points rewritten to be quantified and output-focused

### Education.jsx
- Tech count: '46+' → '30+' (consistent)

### Projects.jsx
- Added `role` field to each project ("Full-Stack Developer · Solo Build")
- Role displayed below project title with user icon
- Recruiter can now see exactly what you built and your contribution

### Contact.jsx
- **CRITICAL BUG FIX**: `zHeight: 9999` → `zIndex: 9999` (toast was invisible)
- Removed broken `--ph` CSS variable on inputs
- Added `className="contact-form"` for scoped placeholder CSS
- Input focus state uses border highlight instead of broken variable

### layout.js
- Added full `metadata` export (title, description, keywords, OG tags, Twitter card)
- Improves Google indexing + LinkedIn/Twitter preview when recruiters share your URL

### globals-additions.css
- Placeholder color fix (global)
- Input autofill dark mode fix
- Custom red scrollbar matching brand