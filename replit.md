# Internet Clock - Big Clock & Stopwatch Application

## Overview

This is a viral revenue-generating Internet Clock website featuring a dark theme with neon green glowing numbers. The application provides a single-page, no-scroll interface with massive digital clock and stopwatch displays optimized for maximum user engagement. Built as a React frontend with Express.js backend, designed specifically for viral growth and ad revenue generation.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Dark charcoal background, neon green glowing clock numbers, single page layout with no scrolling, no segmented boxes for content, header space dedicated to ads, matching bottom space for ads, AM/PM positioned to the right of clock digits.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/UI components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with CSS variables for theming support
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks for local state, TanStack Query for server state
- **Responsive Design**: Mobile-first approach with grid layouts for desktop

### Component Structure
- **Mode-based Architecture**: Toggleable between Big Clock and Stopwatch modes
- **Custom Hooks**: `useClock` for time management, `useStopwatch` for timer functionality
- **Reusable UI Components**: Complete set of accessible components from Shadcn/UI
- **Layout Components**: Header, Footer, ModeSelector, and sidebar with world clocks

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Setup**: Vite middleware integration for hot module replacement
- **API Structure**: RESTful routes with `/api` prefix
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Build Process**: ESBuild for server-side bundling in production

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Type-safe schema definitions with Drizzle-Zod integration
- **Development Storage**: In-memory storage implementation for rapid development
- **User Management**: Basic user schema with UUID primary keys

### Key Features
- **Big Clock Display**: Large, readable time with timezone selection and AM/PM positioning
- **Stopwatch Functionality**: Start/stop/reset with split time recording and millisecond precision
- **World Clock Mode**: Local time plus New York, Paris, and Sydney with real-time updates and orange glow
- **Focus (Pomodoro) Mode**: 25-minute timer with progress bar, break reminders, and session tracking
- **Alarm Clock Mode**: Multiple alarms (up to 5), custom labels, snooze options, and next alarm countdown
- **Timer Mode**: Customizable countdown with presets, progress indicator, and completion alerts
- **Complete Navigation**: All 6 modes fully functional with mode memory via localStorage
- **Timezone Support**: Auto-detection and manual selection for multiple zones
- **Responsive Design**: Mobile-first approach with flexible navigation wrapping
- **Refined Styling**: Dark theme with subtle neon effects, white numbers with reduced glow intensity

### Build and Development
- **Development**: Hot reload with Vite, TypeScript checking, and error overlays
- **Production**: Optimized builds with static asset serving
- **Path Aliases**: Configured for clean imports (`@/` for client, `@shared/` for shared code)

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router

### UI and Styling
- **@radix-ui/***: Complete set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management for components
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool with HMR and optimized production builds
- **typescript**: Type safety across the entire application
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **esbuild**: Fast JavaScript bundler for server-side code

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **react-hook-form**: Form handling with validation
- **zod**: Runtime type validation and schema definition
- **clsx**: Conditional CSS class management

The application is structured for easy deployment on platforms like Replit, with proper environment variable handling and database configuration management.