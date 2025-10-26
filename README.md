# FNB Premier Account Fees

Searchable HTML app for FNB Premier Account fees extracted from the official FNB Premier Annual Pricing Guide (1 July 2025 to 30 June 2026).

## Features

- **Searchable Interface**: Search through all fees, services, and account types in real-time
- **Category Filters**: Filter by Accounts, Transactions, Credit, Global, Travel, or Benefits
- **Structured Data**: All pricing data organized in JSON format for easy integration
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **No Database Required**: Pure HTML/CSS/JavaScript with JSON data file

## What's Included

The app includes comprehensive information about:

- **Account Types**: All FNB Premier account variants with monthly fees and features
- **Transaction Fees**: No-charge transactions, standard fees, cash transactions, real-time payments
- **Credit Facilities**: Fusion credit, overdraft, revolving facility, and personal loans
- **FNB Global Account**: Foreign currency account fees (USD, EUR, GBP)
- **eBucks Travel**: Airport lounge, airline tickets, car rental, and accommodation booking fees
- **Benefits & Rewards**: Family banking discounts, WhatsApp messaging, eBucks rewards, insurance benefits

## Usage

### Running Locally

Simply open `index.html` in a web browser, or serve with any HTTP server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

### Files

- `index.html` - Main web application interface
- `styles.css` - Styling and responsive design
- `app.js` - Search and filter functionality
- `data.json` - Structured pricing data extracted from the PDF

## Data Source

Data extracted from the official FNB Premier Account Annual Pricing Guide PDF (1 July 2025 to 30 June 2026).

## License

This is an unofficial tool created to make FNB Premier pricing information more accessible. All pricing information belongs to FirstRand Bank Limited.
