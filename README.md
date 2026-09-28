# Mortgage Calculator Website

A professional, fully-functional mortgage calculator website with multiple calculator tools for homebuyers and refinancers. Built with vanilla HTML, CSS, and JavaScript for easy deployment and customization.

## Features

### 🧮 Four Powerful Calculators

1. **Mortgage Payment Calculator**
   - Calculate monthly mortgage payments
   - Adjustable home price, down payment, loan term, and interest rate
   - Interactive sliders for easy adjustment
   - Includes property tax, home insurance, and HOA fees
   - Shows total interest paid over the loan lifetime

2. **Home Affordability Calculator**
   - Determine how much house you can afford
   - Based on annual income and monthly debt payments
   - Uses standard 28/36 debt-to-income ratios
   - Shows maximum affordable home price and estimated monthly payment

3. **Refinance Savings Calculator**
   - Compare current vs. new mortgage rates
   - Calculate monthly savings from refinancing
   - Determine break-even period
   - Shows total savings over the loan lifetime

4. **Amortization Schedule**
   - Generate detailed payment schedules
   - View principal vs. interest breakdown
   - Track remaining loan balance over time
   - Displays yearly payment summaries

### 🎨 Design Features

- **Professional Design**: Clean, modern interface inspired by major financial institutions
- **Red Accent Color**: Professional branding (#c41e3a)
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Sliders**: Real-time value adjustment for key inputs
- **Clear Results Display**: Well-formatted calculation results with currency formatting
- **Helpful Tooltips**: Guidance on what each field means
- **FAQ Section**: Common mortgage questions answered

### 🔧 Technical Details

- **Pure JavaScript**: No framework dependencies required
- **Standard Mortgage Formulas**: Uses industry-standard calculations
- **Real-time Synchronization**: Sliders and input fields sync automatically
- **Currency Formatting**: Automatic USD formatting for all values
- **Validation**: Input validation prevents calculation errors

## Project Structure

```
mortgage-calculator/
├── index.html          # Main HTML page with calculator forms
├── styles.css          # Professional styling and responsive design
├── app.js              # Calculator logic and JavaScript functionality
├── .claude/launch.json # Dev server configuration
└── README.md           # This file
```

## Calculation Logic

### Mortgage Payment Formula
The app uses the standard amortization formula:

```
M = P * [r(1+r)^n] / [(1+r)^n - 1]
```

Where:
- M = Monthly payment
- P = Principal (loan amount)
- r = Monthly interest rate (annual rate / 12 / 100)
- n = Total number of payments (years * 12)

### Home Affordability Calculation
Based on debt-to-income ratios:
- Maximum housing payment: 28% of gross monthly income
- Maximum total debt payment: 36% of gross monthly income
- Calculates maximum affordable home price using reverse mortgage formula

### Refinance Analysis
- Compares current remaining payments vs. new loan payments
- Calculates break-even period (when closing costs are recovered)
- Shows total interest savings over the remaining loan life

## Running Locally

### Option 1: Using Python HTTP Server
```bash
cd mortgage-calculator
python -m http.server 8000
```
Then open: `http://localhost:8000`

### Option 2: Using Node.js http-server
```bash
npm install -g http-server
http-server mortgage-calculator -p 8000
```
Then open: `http://localhost:8000`

### Option 3: Direct File Access
Open `index.html` in any modern web browser:
```bash
file:///path/to/mortgage-calculator/index.html
```

## Customization

### Change Brand Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #c41e3a;      /* Main red color */
    --secondary-color: #f0ad4e;    /* Accent yellow */
    --text-dark: #333;             /* Dark text */
    --bg-light: #f8f9fa;           /* Light background */
}
```

### Change Company Name
Replace "MortgageCalc" in `index.html` header with your company name.

### Add Your Contact Info
Add a contact section or footer with your phone number and email.

### Modify Default Values
Edit the default values in input fields:
```html
<input type="number" id="home-price" value="350000">
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Included

✅ Four calculator types
✅ Real-time calculations
✅ Interactive sliders
✅ Responsive design
✅ Currency formatting
✅ FAQ section
✅ Professional styling
✅ No external dependencies
✅ Easy to customize
✅ Mobile optimized

## Deployment

### Deployment to Static Hosting
The app is a static HTML/CSS/JS site - deploy to any static host:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server (Apache, Nginx)

### Simple Deployment Command (Netlify)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

## File Sizes

- HTML: ~15 KB
- CSS: ~8 KB
- JavaScript: ~12 KB
- Total: ~35 KB (highly optimized)

## Testing

The calculator has been tested with:
- Various home prices ($50K - $1M+)
- Different down payments (0% - 50%)
- Multiple loan terms (15, 20, 30 years)
- Interest rates from 2% - 12%
- Additional costs (taxes, insurance, HOA)

All calculations verified against standard mortgage formulas.

## Future Enhancements

Potential features to add:
- PMI (Private Mortgage Insurance) calculator
- Property tax estimates by location
- Interest rate comparison tool
- Loan comparison (15yr vs 30yr analysis)
- Export results to PDF
- Save calculator results
- Multi-currency support
- Loan pre-qualification integration

## Support

For issues or questions:
1. Check the FAQ section on the site
2. Review the calculation formulas
3. Verify input values are within reasonable ranges
4. Test in a different browser

## License

This mortgage calculator is provided as-is for commercial use.

## Notes

- Calculations are estimates only
- Actual mortgage payments may vary based on lender terms
- Results do not constitute financial advice
- Consult with a licensed mortgage professional for detailed quotes
- Property taxes and insurance rates vary by location

---

**Created:** September 2024
**Last Updated:** September 24, 2024
**Version:** 1.0
