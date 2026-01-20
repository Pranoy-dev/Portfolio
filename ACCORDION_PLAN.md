# Accordion/Dropdown Style Case Study Plan
## All Sections Collapsible for Maximum Skimmability

---

## 🎯 Core Concept
**Everything is collapsed by default. Users expand only what interests them.**

---

## 📐 Structure: Accordion Layout

```
┌─────────────────────────────────────────┐
│  [HERO - Always Visible]                │
│  Image + Title + One Metric             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ▼ STATS                                │
│  [Click to expand: 3 key numbers]      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ▼ THE PROBLEM                          │
│  [Click to expand: Visual + sentence]   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ▼ THE SOLUTION                         │
│  [Click to expand: Visual + bullets]    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ▼ KEY DECISIONS                        │
│  [Click to expand: Decision logs]       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ▼ RESULTS                              │
│  [Click to expand: Metrics + chart]     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ▼ ARTIFACTS                            │
│  [Click to expand: Links]               │
└─────────────────────────────────────────┘
```

---

## 🎨 Accordion Design Pattern

### **Collapsed State (Default)**
```
┌─────────────────────────────────────────┐
│  ▼ Section Title                        │
│  [One-line preview/teaser text]        │
│                                          │
│  [Optional: Small icon or number]       │
└─────────────────────────────────────────┘
```

### **Expanded State**
```
┌─────────────────────────────────────────┐
│  ▲ Section Title                        │
│                                          │
│  [Full content: visuals, text, etc.]   │
│                                          │
└─────────────────────────────────────────┘
```

---

## 📋 Section-by-Section Breakdown

### **1. HERO (Always Visible - No Accordion)**
```
┌─────────────────────────────────────────┐
│  [Hero Image - 400px]                   │
│  Title: "Scania Conversion Systems"    │
│  Metric: "100k updates/month"          │
└─────────────────────────────────────────┘
```
**Why:** First impression, should always be visible

---

### **2. STATS (Accordion)**
**Collapsed:**
```
┌─────────────────────────────────────────┐
│  ▼ Key Metrics                          │
│  6 User Roles • 6 Continents • 100k/Month│
└─────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────┐
│  ▲ Key Metrics                          │
│                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │  6   │ │  6   │ │ 100k │           │
│  │ User │ │Cont. │ │Updates│          │
│  │Roles │ │      │ │/Month │          │
│  └──────┘ └──────┘ └──────┘           │
│                                          │
└─────────────────────────────────────────┘
```

---

### **3. THE PROBLEM (Accordion)**
**Collapsed:**
```
┌─────────────────────────────────────────┐
│  ▼ The Problem                          │
│  Engineering teams couldn't decide which│
│  software updates to approve...         │
└─────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────┐
│  ▲ The Problem                          │
│                                          │
│  [Before/After Visual]                  │
│                                          │
│  Engineering teams across 12 regions    │
│  couldn't decide which software        │
│  updates to approve, causing delays     │
│  and inconsistent rollouts.             │
│                                          │
│  [Expandable details: bullets, data]   │
└─────────────────────────────────────────┘
```

---

### **4. THE SOLUTION (Accordion)**
**Collapsed:**
```
┌─────────────────────────────────────────┐
│  ▼ The Solution                         │
│  Contextual decision cards • Role-based │
│  dashboards • Mobile interface...      │
└─────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────┐
│  ▲ The Solution                         │
│                                          │
│  [Large Visual: Key Interface]         │
│                                          │
│  What We Built:                          │
│  • Contextual decision cards             │
│  • Role-based dashboards                 │
│  • Mobile review interface               │
│                                          │
│  [Additional details, flows, etc.]     │
└─────────────────────────────────────────┘
```

---

### **5. KEY DECISIONS (Accordion)**
**Collapsed:**
```
┌─────────────────────────────────────────┐
│  ▼ Key Decisions                        │
│  3 major decisions made during design   │
└─────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────┐
│  ▲ Key Decisions                        │
│                                          │
│  [Decision 1 Card]                      │
│  [Decision 2 Card]                      │
│  [Decision 3 Card]                      │
│                                          │
└─────────────────────────────────────────┘
```

---

### **6. RESULTS (Accordion)**
**Collapsed:**
```
┌─────────────────────────────────────────┐
│  ▼ Results                              │
│  40% faster • 92% satisfaction • 85%  │
│  adoption...                            │
└─────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────┐
│  ▲ Results                              │
│                                          │
│  ┌──────────┐ ┌──────────┐             │
│  │   40%    │ │   92%    │             │
│  │  Faster  │ │Satisfied │             │
│  └──────────┘ └──────────┘             │
│                                          │
│  [Chart: Before → After]                │
│                                          │
│  What's Next:                           │
│  • Phase 2 features                     │
│  • Expansion plans                      │
└─────────────────────────────────────────┘
```

---

### **7. ARTIFACTS (Accordion)**
**Collapsed:**
```
┌─────────────────────────────────────────┐
│  ▼ Artifacts                            │
│  Prototype • Flow • Research • Design  │
└─────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────┐
│  ▲ Artifacts                            │
│                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │Proto │ │Flow │ │Research│ │Design│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                          │
└─────────────────────────────────────────┘
```

---

## 🎨 Visual Design

### **Accordion Header Style**
```
┌─────────────────────────────────────────┐
│  ▼ Section Title              [Icon]    │
│  Preview text or key metrics...        │
└─────────────────────────────────────────┘
```

**Features:**
- Chevron icon (▼ collapsed, ▲ expanded)
- Hover state: subtle background change
- Smooth animation on expand/collapse
- Preview text in collapsed state

### **Spacing**
- Collapsed: Minimal padding (16px)
- Expanded: Generous padding (32px)
- Smooth transition between states

---

## 💻 Implementation Details

### **Component Structure**
```tsx
<AccordionSection
  title="Section Title"
  preview="Preview text or key metrics"
  defaultOpen={false}
  icon={Icon}
>
  {/* Full content */}
</AccordionSection>
```

### **Animation**
- Duration: 300ms
- Easing: ease-out
- Height transition: smooth expand/collapse

### **State Management**
- All collapsed by default
- Remember last expanded state (optional)
- URL hash for deep linking (optional)

---

## 📱 Mobile Considerations

### **Mobile Layout**
- Full-width accordions
- Touch-friendly (min 44px height)
- Larger tap targets
- Swipe gestures (optional)

### **Desktop Layout**
- Same accordion style
- Hover states
- Keyboard navigation (Enter/Space)

---

## ✅ Benefits of Accordion Style

1. **Immediate Skimmability**
   - See all sections at once
   - Understand structure instantly
   - Choose what to read

2. **Reduced Cognitive Load**
   - Only see what you need
   - No overwhelming wall of text
   - Progressive disclosure

3. **Faster Scanning**
   - All titles visible
   - Preview text helps decide
   - Quick navigation

4. **Mobile-Friendly**
   - Less scrolling
   - Focused reading
   - Better UX on small screens

5. **Flexible Depth**
   - Casual readers: skim titles
   - Interested readers: expand sections
   - Deep divers: expand all

---

## 🎯 User Flow

### **Casual Reader (30 seconds)**
1. See hero
2. Scan accordion titles
3. Expand 1-2 interesting sections
4. Done

### **Interested Reader (2-3 minutes)**
1. See hero
2. Expand all sections
3. Read through content
4. Check artifacts

### **Deep Diver (5+ minutes)**
1. See hero
2. Expand all sections
3. Read everything
4. Click artifact links
5. Explore details

---

## 🔧 Technical Implementation

### **Using Collapsible Component**
```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
```

### **Accordion Pattern**
```tsx
<Collapsible defaultOpen={false}>
  <CollapsibleTrigger className="w-full">
    <div className="flex items-center justify-between p-4">
      <div>
        <h3>Section Title</h3>
        <p className="text-sm text-muted-foreground">
          Preview text
        </p>
      </div>
      <ChevronDown className="transition-transform" />
    </div>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="p-6">
      {/* Full content */}
    </div>
  </CollapsibleContent>
</Collapsible>
```

---

## 📊 Content Strategy

### **Collapsed State Content**
- **Title:** Clear, descriptive
- **Preview:** One-line summary or key metrics
- **Icon:** Optional visual indicator

### **Expanded State Content**
- **Visual:** Primary image/diagram
- **Text:** Concise bullets or short paragraphs
- **Details:** Additional context if needed

---

## 🎨 Styling Guidelines

### **Accordion Header**
- Background: Subtle (bg-muted/30)
- Border: Bottom border when collapsed
- Hover: Slight background change
- Active: Border highlight

### **Content Area**
- Padding: 24-32px
- Spacing: Generous between elements
- Visuals: Full-width or centered

### **Transitions**
- Smooth height animation
- Fade in content
- Icon rotation (chevron)

---

## ✅ Implementation Checklist

- [ ] Create AccordionSection component
- [ ] Style collapsed state (header + preview)
- [ ] Style expanded state (content area)
- [ ] Add smooth animations
- [ ] Implement for Stats section
- [ ] Implement for Problem section
- [ ] Implement for Solution section
- [ ] Implement for Decisions section
- [ ] Implement for Results section
- [ ] Implement for Artifacts section
- [ ] Test mobile responsiveness
- [ ] Add keyboard navigation
- [ ] Test animations and transitions

---

## 🚀 Quick Start

**Phase 1: Basic Accordion**
- Convert all sections to collapsible
- Simple expand/collapse
- Basic styling

**Phase 2: Enhanced UX**
- Preview text in collapsed state
- Smooth animations
- Hover states

**Phase 3: Polish**
- Icons and visual indicators
- Keyboard navigation
- Mobile optimizations

---

This accordion approach makes the case study **instantly scannable** while keeping all details accessible. Users can see everything at a glance and dive deep only where interested.
