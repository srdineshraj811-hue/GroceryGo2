# Grocery Delivery App Design Guidelines

## Design Approach
**Design System:** Material Design 3 principles adapted for mobile-first grocery delivery platform
**Rationale:** This utility-focused, multi-role application requires consistent patterns, clear information hierarchy, and proven mobile UX patterns. Material Design provides the necessary component library while allowing customization for the grocery retail context.

## Core Design Principles
- **Trust & Freshness:** Visual language evokes reliability and fresh produce
- **Clarity Over Decoration:** Information-dense interfaces prioritize readability
- **Role-Appropriate Density:** Customers get spacious layouts, admins get data-dense views
- **Mobile-Priority:** All interfaces optimized for touch-first interaction

## Color Palette

### Light Mode (Primary)
- **Primary Brand:** 140 75% 45% (Fresh green - groceries/organic)
- **Primary Variant:** 140 60% 35% (Darker green for emphasis)
- **Secondary:** 25 85% 55% (Warm orange - special offers/urgency)
- **Background:** 0 0% 98% (Soft off-white)
- **Surface:** 0 0% 100% (Pure white for cards)
- **Surface Variant:** 140 15% 96% (Subtle green tint)
- **Error:** 0 70% 50% (Standard red for alerts)
- **Success:** 140 60% 45% (Matches primary)

### Dark Mode
- **Primary Brand:** 140 60% 65% (Lighter green for contrast)
- **Primary Variant:** 140 75% 55%
- **Secondary:** 25 75% 65%
- **Background:** 0 0% 10% (Deep charcoal)
- **Surface:** 0 0% 15% (Elevated surfaces)
- **Surface Variant:** 140 10% 18%

### Semantic Colors
- **Warning:** 45 95% 55% (Delivery time alerts)
- **Info:** 210 80% 55% (Notifications)
- **Delivery Active:** 140 75% 45% (Driver en route)
- **Pending Order:** 25 60% 50%

## Typography

### Font Stack
- **Primary:** 'Inter', system-ui, -apple-system, sans-serif
- **Accent/Display:** 'Plus Jakarta Sans', sans-serif (for branding, banners)

### Type Scale
- **Hero/Banner:** 32px/1.2, Bold (Special offers, promotions)
- **Page Titles:** 24px/1.3, Semibold
- **Section Headers:** 20px/1.4, Semibold
- **Body Large:** 16px/1.5, Regular (Product names, order details)
- **Body:** 14px/1.5, Regular (General content)
- **Caption:** 12px/1.4, Medium (Timestamps, metadata)
- **Button Text:** 14px/1, Semibold

## Layout System

### Spacing Scale (Tailwind Units)
**Core Units:** 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section spacing: py-8, py-12
- Card spacing: p-4 (mobile), p-6 (desktop)
- List item spacing: py-3
- Form field spacing: space-y-4

### Container Widths
- **Mobile:** Full width with px-4 side padding
- **Tablet:** max-w-2xl mx-auto
- **Desktop Admin:** max-w-7xl mx-auto
- **Desktop Customer:** max-w-4xl mx-auto (focused shopping experience)

### Grid Systems
- **Product Grid:** grid-cols-2 (mobile), grid-cols-3 (tablet), grid-cols-4 (desktop)
- **Category Grid:** grid-cols-2 (mobile), grid-cols-3 (desktop)
- **Order Cards:** Single column stack on all devices
- **Admin Tables:** Responsive horizontal scroll on mobile

## Component Library

### Navigation
**Customer Bottom Tab Bar:**
- Fixed bottom navigation with 5 icons (Home, Orders, Specials, Notifications, Cart)
- Active state: Primary green with label, Inactive: Gray with icon only
- Cart badge: Red circle with item count
- Notification badge: Red dot indicator

**Driver Top Bar:**
- Minimal header with driver name, current delivery count
- Hamburger menu for settings/profile

**Admin Sidebar:**
- Persistent left sidebar (desktop) with collapsible sections
- Converts to hamburger menu on mobile
- Icons + labels for all sections

### Cards
**Product Card:**
- Image aspect ratio 1:1 (square)
- Product name (truncate 2 lines)
- Price (bold, large)
- Stock indicator (subtle badge)
- Quick add button (floating FAB style on image)

**Order Card:**
- Elevated surface with rounded-2xl corners
- Status chip at top right
- Order number, date (caption size)
- Item count, total price (prominent)
- Action button based on status
- Proof of delivery photo (thumbnail, expandable)

**Category Card:**
- Image aspect ratio 16:9
- Category name overlay (gradient scrim)
- Item count badge

### Banners
**Promotional Banner (Home):**
- Full-width, rounded-xl
- Height: 160px (mobile), 200px (desktop)
- Gradient overlay for text legibility
- Bold headline + CTA button
- Swipeable carousel if multiple banners

### Forms
**Input Fields:**
- Outlined style with rounded-lg corners
- Label floats on focus
- Helper text below field
- Error state: Red outline + message
- Success state: Green checkmark icon

**Cart Controls:**
- Quantity stepper: [-] number [+] buttons
- Remove item: Swipe gesture + trash icon
- Coupon selector: Dropdown or modal sheet
- Delivery time: Date/time picker modal

### Buttons
**Primary Actions:**
- Filled style, rounded-lg
- Height: h-12
- Full width on mobile, auto width on desktop
- Loading state: Spinner replaces text

**Secondary Actions:**
- Outlined style with 2px border
- Same sizing as primary

**Icon Buttons:**
- Circular, 40px diameter
- Ripple effect on tap

### Data Display
**Order Status Flow:**
- Horizontal stepper showing: Placed → Preparing → Out for Delivery → Delivered
- Active step: Primary color, Completed: Success green, Upcoming: Gray

**Driver Map:**
- Full screen Google Maps integration
- Custom markers: Start (green pin), Deliveries (numbered pins), Current location (blue dot)
- Route polyline in primary green
- Bottom sheet overlay with delivery list

**Admin Tables:**
- Striped rows for readability
- Sortable column headers
- Inline edit for inventory
- Quick action buttons in last column
- Pagination footer

### Modals & Overlays
**Checkout Modal:**
- Bottom sheet (mobile), centered modal (desktop)
- Sections clearly divided with dividers
- Sticky footer with total + Pay button

**Notification Center:**
- Slide-in drawer from right
- Unread notifications: Subtle background tint
- Time grouping: Today, Yesterday, Earlier
- Tap to mark as read

**Profile Sheet:**
- Modal with form fields
- Saved addresses as expandable list
- Add new address: Opens full-screen form

### Images
**Hero/Banner Images:**
- Use high-quality grocery photography (fresh produce, prepared meals, shopping scenes)
- Apply gradient overlays for text legibility
- Compress for mobile performance

**Product Images:**
- Consistent white/transparent backgrounds
- Minimum 800x800px resolution
- Lazy load below fold

**Proof of Delivery:**
- Compressed to 1200px max width
- Display as thumbnail in order card
- Tap to view full-screen lightbox

**Category Images:**
- Curated food photography representing category
- Consistent color treatment across all categories

## Accessibility
- Minimum touch target: 44x44px
- Color contrast ratio: 4.5:1 for text, 3:1 for UI components
- Focus indicators visible on all interactive elements
- Screen reader labels for icon-only buttons
- Dark mode toggle in settings

## Animations
Use sparingly for feedback only:
- Button press: Subtle scale down (0.95)
- Cart add: Brief scale pulse on cart icon
- Page transitions: 200ms fade
- Loading states: Shimmer placeholders
- Delivery status change: Confetti animation (delivered state only)

## Role-Specific Design Notes

**Customer App:** Spacious, image-rich, large touch targets, minimal text density
**Driver App:** Map-centric, quick actions, large status buttons, GPS-optimized
**Admin Panel:** Dense information, data tables, bulk actions, multiple filters, desktop-optimized with mobile fallback