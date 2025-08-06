# Vaudoise Brand Partnership Landing Page

## Overview
This is a themed landing page for the Vaudoise Assurances partnership, demonstrating how to create brand-specific experiences while maintaining core functionality.

## File Structure

### Brand-Specific Files
```
src/
├── app/(brands)/vaudoise/           # Route group for Vaudoise pages
│   ├── page.tsx                     # Main landing page
│   ├── layout.tsx                   # Brand-specific layout
│   ├── globals.css                  # Brand color scheme
│   ├── redirect/page.tsx            # Redirect helper
│   └── README.md                    # This documentation
├── components/brands/vaudoise/      # Brand-specific components
│   ├── vaudoise-logo.tsx           # Vaudoise logo component
│   └── collaboration-logo.tsx      # Partnership branding
└── public/brands/vaudoise/         # Brand assets
    └── vaudoise-logo.svg           # Official Vaudoise logo
```

## Features

### Brand Identity
- **Official Colors**: Uses Vaudoise's official green `#009640` (HSL: 146, 100%, 29%)
- **Logo Integration**: Official Vaudoise logo with transparent background
- **Partnership Display**: "Pharewest × Vaudoise Assurances" collaboration branding
- **Professional Design**: Corporate aesthetic with subtle animations

### Technical Implementation
- **Route Group**: Uses Next.js route groups for clean URL structure
- **CSS Isolation**: Separate color scheme without affecting main site
- **Component Modularity**: Reusable brand components
- **Image Optimization**: Uses `getImagePath()` utility for deployment

## Access Points
- **Main URL**: `/vaudoise` - Branded landing page
- **Redirect URL**: `/vaudoise/redirect` - Automatic redirect

## Color System
```css
/* Vaudoise Brand Colors */
--primary: 146 100% 29%;           /* Official green #009640 */
--foreground: 146 100% 20%;        /* Dark text for readability */
--accent: 146 100% 35%;            /* Slightly lighter green */
--muted-foreground: 146 100% 25%;  /* Darker green for muted text */
--secondary: 146 50% 95%;          /* Very light for backgrounds */
```

## Adding New Brand Partnerships

### Step 1: Create Brand Directory Structure
```bash
# Create brand-specific directories
mkdir -p src/app/(brands)/[brand-name]
mkdir -p src/components/brands/[brand-name]
mkdir -p public/brands/[brand-name]
```

### Step 2: Copy and Customize Files
1. **Copy Vaudoise files as template**
2. **Update brand-specific content**:
   - Replace logo files
   - Update color scheme
   - Modify partnership text
   - Adjust component imports

### Step 3: Update Brand Assets
1. **Logo**: Place official logo in `public/brands/[brand-name]/`
2. **Colors**: Update HSL values in `globals.css`
3. **Components**: Customize logo and collaboration components

### Step 4: Update Import Paths
- Update component imports in `page.tsx`
- Update image paths in logo components
- Update collaboration logo references

### Step 5: Test and Deploy
- Verify `/[brand-name]` route works
- Test all functionality
- Ensure responsive design
- Validate brand colors

## Brand Partnership Checklist

### Required Files
- [ ] `src/app/(brands)/[brand-name]/page.tsx`
- [ ] `src/app/(brands)/[brand-name]/layout.tsx`
- [ ] `src/app/(brands)/[brand-name]/globals.css`
- [ ] `src/components/brands/[brand-name]/[brand-name]-logo.tsx`
- [ ] `src/components/brands/[brand-name]/collaboration-logo.tsx`
- [ ] `public/brands/[brand-name]/[brand-name]-logo.svg`

### Required Updates
- [ ] Brand colors (HSL values)
- [ ] Logo file and path
- [ ] Partnership text
- [ ] Component imports
- [ ] Image paths
- [ ] Brand-specific CSS classes

### Quality Assurance
- [ ] `/[brand-name]` route accessible
- [ ] Logo displays correctly
- [ ] Colors match brand guidelines
- [ ] All functionality preserved
- [ ] Responsive design works
- [ ] No console errors

## Technical Notes

### Route Groups
The `(brands)` route group allows for clean URLs while organizing brand-specific pages:
- `/vaudoise` instead of `/brands/vaudoise`
- Maintains SEO-friendly URLs
- Keeps brand pages separate from main site

### Component Organization
Brand-specific components are isolated in `src/components/brands/[brand-name]/`:
- Prevents naming conflicts
- Makes brand removal easy
- Enables parallel development

### Asset Management
Brand assets are organized in `public/brands/[brand-name]/`:
- Clear separation of brand assets
- Easy to manage multiple partnerships
- Prevents asset conflicts

## Maintenance

### Adding New Brands
1. Follow the file structure template
2. Update this README with new brand details
3. Test thoroughly before deployment
4. Document brand-specific requirements

### Updating Existing Brands
1. Update assets in brand-specific directories
2. Test color scheme changes
3. Verify logo updates
4. Ensure all functionality preserved

### Removing Brands
1. Delete brand-specific directories
2. Remove any cross-references
3. Update documentation
4. Test main site functionality

This structure enables scalable brand partnerships while maintaining code organization and deployment efficiency. 