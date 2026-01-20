# Esperanto-Style Case Study

This portfolio now includes an Esperanto-inspired case study template, similar to the one found at [robin-noguier.com/project/esperanto/](https://robin-noguier.com/project/esperanto/).

## What Was Created

### 1. **Esperanto Case Study Component** (`src/components/case-study-esperanto.tsx`)
A comprehensive, reusable component that follows the Esperanto structure:
- Hero section with project title, subtitle, and metadata
- Numbered sections (01-05) for different aspects
- Process documentation with images
- Visual identity section
- Design/development features
- Learnings and reflections
- Impact metrics and testimonials
- Awards section
- CTA section

### 2. **Case Study Data** (`src/data/esperanto-case-studies.ts`)
Example data structure showing how to format your case studies. Includes:
- Project metadata (title, subtitle, role, client, date)
- Section content (about, process, visual identity, design, learnings, impact)
- Images, colors, typography
- Testimonials and metrics

### 3. **Page Route** (`src/app/case-study-esperanto/[id]/page.tsx`)
A Next.js page that renders the Esperanto-style case study based on the ID.

## How to Use

### Viewing the Example Case Study

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the main page and click on "Case Study 1" (Global Software Updates)

3. Click the "View Esperanto Style" button on the case study card

4. Or directly visit: `http://localhost:3000/case-study-esperanto/1`

### Creating Your Own Case Study

1. **Add your case study data** to `src/data/esperanto-case-studies.ts`:
   ```typescript
   {
     id: 2,
     title: "Your Project Title",
     subtitle: "Your project subtitle",
     description: "Brief description",
     heroImage: "/path/to/image.jpg",
     role: ["Your Role 1", "Your Role 2"],
     client: "Client Name",
     date: "2024 - Duration",
     websiteUrl: "https://your-website.com", // optional
     sections: {
       about: { /* ... */ },
       process: [ /* ... */ ],
       // ... other sections
     }
   }
   ```

2. **Add images** to the `public` folder and reference them in your data

3. **Update the main page** (`src/app/page.tsx`) to link to your new case study:
   - Add a button similar to the one for case study 1
   - Or update the onClick handler to route to `/case-study-esperanto/[id]`

## Key Features

### Structure
- **Hero Section**: Large title, subtitle, project description, and metadata grid
- **Section 01**: Process & Research (numbered steps with images)
- **Section 02**: Visual Identity (colors, typography, logo)
- **Section 03**: Design & Development (feature showcase)
- **Section 04**: Learnings (reflection points with icons)
- **Section 05**: Impact & Results (metrics and testimonials)
- **Awards**: Recognition section
- **CTA**: Call-to-action for collaboration

### Design Elements
- Numbered section headers with circular badges
- Process steps with images and captions
- Color palette display
- Testimonial cards
- Metric cards with change indicators
- Responsive grid layouts
- Smooth animations and transitions

## Customization

### Styling
The component uses your existing design system (Tailwind CSS with your theme). You can customize:
- Colors in `globals.css`
- Component styles in the component file
- Layout spacing and sizing

### Adding New Sections
To add custom sections, extend the `EsperantoCaseStudyProps` interface and add rendering logic in the component.

### Images
- Place images in the `public` folder
- Reference them with paths like `/Images/your-image.jpg`
- Use Next.js `Image` component for optimization

## Example Structure

```typescript
{
  sections: {
    about: {
      title: "Section title",
      description: "Long description..."
    },
    process: [
      {
        number: "1",
        title: "Step title",
        description: "Step description",
        image: "/path/to/image.jpg",
        imageCaption: "Caption text"
      }
    ],
    visualIdentity: {
      title: "Identity title",
      description: "Description",
      colors: [
        { name: "Primary", value: "#hex" }
      ],
      typography: "Typography description"
    },
    design: {
      title: "Design title",
      description: "Description",
      features: [
        {
          title: "Feature",
          description: "Description",
          image: "/path/to/image.jpg"
        }
      ]
    },
    learnings: [
      {
        title: "Learning",
        description: "Description",
        icon: Lightbulb // from lucide-react
      }
    ],
    impact: {
      title: "Impact",
      description: "Description",
      metrics: [
        { value: "40%", label: "Improvement", change: "+40%" }
      ],
      testimonials: [
        {
          name: "Name",
          role: "Role",
          location: "🇺🇸",
          quote: "Quote text"
        }
      ]
    },
    awards: [
      {
        name: "Award Name",
        organization: "Organization"
      }
    ]
  }
}
```

## Next Steps

1. Replace the example data with your actual case studies
2. Add your project images
3. Customize the styling to match your brand
4. Add more case studies using the same structure
5. Consider adding animations or interactions

## Inspiration

This template is inspired by Robin Noguier's Esperanto case study, which demonstrates:
- Clear storytelling structure
- Process transparency
- Visual documentation
- Impact measurement
- Personal reflection

Enjoy building your portfolio! 🚀
