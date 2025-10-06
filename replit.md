# FreshCart - Grocery Delivery Application

> NOTE: This repository previously included Replit-specific Vite plugins. Those have been removed to give maintainers full control over dev tooling. If you used Replit integrations, check `.replit` (removed) and install `vite-plugin-checker` for local overlays.

## Overview

FreshCart is a multi-role grocery delivery platform built as a mobile-first web application. The system serves three distinct user roles: customers browsing and ordering groceries, delivery drivers managing their routes and deliveries, and administrators managing the entire platform. The application emphasizes fresh produce delivery with features like real-time order tracking, special offers, promotional banners, and a comprehensive product catalog organized by categories.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Design System**: shadcn/ui components built on Radix UI primitives, following Material Design 3 principles adapted for mobile-first grocery delivery

**Styling**: Tailwind CSS with custom theme variables supporting both light and dark modes. The design emphasizes a fresh green color palette (HSL 140 75% 45%) to evoke organic/fresh produce, with semantic colors for different order states and delivery statuses.

**State Management**: TanStack Query (React Query) for server state with custom query client configuration. Local component state managed with React hooks.

**Routing**: Currently implements client-side navigation through component state rather than a traditional router (uses tab-based navigation for customer views and role switching).

**UI Patterns**: 
- Mobile-first responsive design with bottom navigation for customers
- Sidebar navigation for admin dashboard
- Card-based layouts for products, orders, and deliveries
- Carousel/banner components for promotions
- Modal dialogs for confirmations and detailed views

### Backend Architecture

**Runtime**: Node.js with Express.js server

**Language**: TypeScript with ES modules

**API Pattern**: RESTful API with routes prefixed under `/api`

**Development Mode**: Vite middleware integration for hot module replacement in development

**Storage Interface**: Abstract storage interface (`IStorage`) currently implemented with in-memory storage (`MemStorage`) - designed to be swapped with database implementation

**Session Management**: Structure exists for session handling (references to `connect-pg-simple` in dependencies suggest PostgreSQL session storage planned)

### Data Storage Solutions

**ORM**: Drizzle ORM configured for PostgreSQL

**Database**: Neon serverless PostgreSQL (via `@neondatabase/serverless` with WebSocket support)

**Schema Design**: 
- Users table with username/password authentication
- Categories with images, sort order, and active status
- Special banners for promotions with configurable display order
- Additional product, order, and delivery tables referenced in components but not yet in schema file

**Migrations**: Drizzle Kit configured with migrations stored in `./migrations` directory

**Data Validation**: Zod schemas generated from Drizzle table definitions for runtime validation

### Authentication & Authorization

**Current State**: Basic user schema exists with username/password fields, but authentication middleware not yet implemented

**Planned Approach**: Session-based authentication (indicated by session store dependencies)

**Role System**: Three-tier role system (customer, driver, admin) currently managed client-side through role selector - needs server-side enforcement

### External Dependencies

**Payment Processing**: Stripe integration via `@stripe/stripe-js` and `@stripe/react-stripe-js`

**Database Provider**: Neon serverless PostgreSQL for scalable database hosting

**Font Services**: Google Fonts serving Inter (primary) and Plus Jakarta Sans (display/accent)

**Image Hosting**: Currently using Unsplash URLs for placeholder images - production should use CDN or object storage

**UI Component Library**: Radix UI primitives for accessible, unstyled components with custom theming

**Development Tools**: 
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript for type safety
- ESBuild for production bundling
- PostCSS with Autoprefixer for CSS processing

### Key Architectural Decisions

**Monorepo Structure**: Client and server code share types through `shared/schema.ts`, enabling type-safe API contracts

**Mobile-First Design**: All interfaces optimized for touch interaction with responsive breakpoints, safe area handling for mobile browsers

**Role-Based Views**: Single application serving different interfaces based on user role rather than separate applications, reducing code duplication while maintaining distinct UX for each persona

**Mock Data Strategy**: Extensive use of mock data in components (marked with `//todo: remove mock functionality`) allows frontend development to proceed independently of backend implementation

**Progressive Enhancement**: Storage interface abstraction allows starting with in-memory storage and migrating to PostgreSQL without changing application logic

**Component Isolation**: Example components provided for design system documentation and testing in isolation

**Theming Approach**: CSS custom properties for colors with automatic dark mode support, allowing runtime theme switching without rebuilding