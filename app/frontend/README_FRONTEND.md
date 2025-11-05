# Love Fund - Frontend Documentation Index

Welcome to the Love Fund frontend documentation! This directory contains comprehensive guides for frontend developers.

---

## 📚 Documentation Files

### 1. **[FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)**
**📖 Complete Frontend Codebase Guide**

This is the main documentation file covering:
- Project overview and architecture
- Technology stack details
- Complete project structure
- Setup and installation instructions
- Component breakdown and explanations
- Routing and page flow
- Styling system (fonts, colors, Tailwind)
- User action flows
- Code examples
- Development guidelines

**👉 Start here for a complete understanding of the codebase.**

---

### 2. **[ACTION_FLOW_DIAGRAM.md](./ACTION_FLOW_DIAGRAM.md)**
**🎯 Visual User Flow Diagrams**

Visual representations of:
- User journey flows
- Component interaction diagrams
- State management flows
- Responsive design breakpoints
- Data flow diagrams
- Component dependencies

**👉 Use this to understand how users navigate and interact with the app.**

---

### 3. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)**
**⚡ Developer Quick Reference**

A cheat sheet covering:
- Quick start commands
- Common code patterns
- Styling shortcuts
- Component templates
- Common tasks
- Debugging tips
- Troubleshooting

**👉 Keep this open while coding for quick lookups.**

---

## 🚀 Getting Started

### New to the Project?

1. **Start with**: [FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)
   - Read the "Project Overview" section
   - Review the "Technology Stack"
   - Follow the "Setup & Installation" steps

2. **Understand the flow**: [ACTION_FLOW_DIAGRAM.md](./ACTION_FLOW_DIAGRAM.md)
   - Review user journey diagrams
   - Understand component interactions
   - Study the routing structure

3. **Start coding**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
   - Use component templates
   - Reference styling patterns
   - Follow common task examples

### Returning Developer?

- Jump to [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for quick lookups
- Check [ACTION_FLOW_DIAGRAM.md](./ACTION_FLOW_DIAGRAM.md) for flow understanding
- Reference [FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md) for detailed explanations

---

## 📋 Quick Navigation

### By Topic

**Setup & Installation**
- [Setup Instructions](./FRONTEND_DOCUMENTATION.md#setup--installation)

**Architecture**
- [Project Structure](./FRONTEND_DOCUMENTATION.md#project-structure)
- [Architecture Overview](./FRONTEND_DOCUMENTATION.md#architecture-overview)
- [Component Breakdown](./FRONTEND_DOCUMENTATION.md#component-breakdown)

**Styling**
- [Styling System](./FRONTEND_DOCUMENTATION.md#styling-system)
- [Font System](./QUICK_REFERENCE.md#fonts)
- [Color Reference](./QUICK_REFERENCE.md#colors)

**Development**
- [Component Templates](./QUICK_REFERENCE.md#component-templates)
- [Common Tasks](./QUICK_REFERENCE.md#common-tasks)
- [Debugging Tips](./QUICK_REFERENCE.md#debugging-tips)

**User Flows**
- [User Action Flow](./FRONTEND_DOCUMENTATION.md#user-action-flow)
- [Flow Diagrams](./ACTION_FLOW_DIAGRAM.md#main-user-flows)

---

## 🎯 Project Overview

**Love Fund** is a Next.js-based DeFi platform for epoch-based hedge fund vaults.

### Key Technologies
- **Next.js 15** (App Router)
- **React 19** with TypeScript
- **Tailwind CSS 4**
- **React Three Fiber** (3D graphics)
- **Radix UI** (Component primitives)

### Main Features
- Landing page with 3D particle background
- Vault listing and filtering
- Vault creation form
- Individual vault management
- Deposit/withdraw functionality
- Epoch-based cycle visualization

---

## 📁 Project Structure

```
app/frontend/
├── app/                    # Next.js pages
├── components/             # React components
├── lib/                    # Utilities
├── public/                 # Static assets
├── styles/                 # Global styles
└── Documentation Files
    ├── README_FRONTEND.md          (this file)
    ├── FRONTEND_DOCUMENTATION.md   (main docs)
    ├── ACTION_FLOW_DIAGRAM.md      (flow diagrams)
    └── QUICK_REFERENCE.md           (quick ref)
```

---

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

---

## 🎨 Design System

### Primary Font
- **Sentient** - Used for headings and branding
- Extralight (200) and Light Italic (300) variants

### Color Palette
- **Primary**: `#FFC700` (Yellow) - `yellow-200`
- **Background**: `#000000` (Black)
- **Text**: `#FFFFFF` (White) / `#A3A3A3` (Gray) - `neutral-400`
- **Borders**: `#424242` (Dark Gray) - `neutral-800`

### Typography
- **Headings**: Sentient font, various sizes (3xl to 7xl)
- **Body**: System font or Geist Mono
- **Code/Data**: Geist Mono

---

## 🔗 Key Routes

- `/` - Landing page (Hero + 3D background)
- `/app` - Vault listing page
- `/app/create` - Create new vault
- `/app/vault/[id]` - Individual vault details

---

## 📖 Documentation Standards

When adding new features:

1. **Update** `FRONTEND_DOCUMENTATION.md` with new components/features
2. **Add** flow diagrams to `ACTION_FLOW_DIAGRAM.md` if needed
3. **Include** new patterns in `QUICK_REFERENCE.md`
4. **Document** breaking changes or migrations

---

## 🐛 Troubleshooting

Having issues? Check:

1. **[QUICK_REFERENCE.md - Troubleshooting](./QUICK_REFERENCE.md#common-issues--solutions)**
2. **[FRONTEND_DOCUMENTATION.md - Troubleshooting](./FRONTEND_DOCUMENTATION.md#troubleshooting)**

Common fixes:
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Restart dev server
- Check browser console for errors

---

## 📞 Support

For questions:
1. Review relevant documentation sections
2. Check component source code with inline comments
3. Review Git history for context
4. Consult project README files

---

## 📝 Quick Links

- **Main Documentation**: [FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)
- **Flow Diagrams**: [ACTION_FLOW_DIAGRAM.md](./ACTION_FLOW_DIAGRAM.md)
- **Quick Reference**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

**Last Updated**: Documentation created for Love Fund frontend codebase  
**Project**: Love Fund (formerly Hedge Vault)  
**Framework**: Next.js 15 with React 19


