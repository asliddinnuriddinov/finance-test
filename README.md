# Personal Finance Management Dashboard

A comprehensive personal finance management system built with ReactJS and Bootstrap that helps users track their income, expenses, and monitor currency exchange rates in real-time.

## Features

- 💱 Real-time currency conversion with ExchangeRate-API
- 💰 Income and expense transaction management
- 📊 Visual data representation with charts and graphs
- 📱 Responsive design for all devices
- 💾 Local storage for transaction persistence
- 🔍 Transaction filtering by date range and categories
- 📈 Beautiful animations for financial data visualization

## Tech Stack

- React.js 18
- Bootstrap 5
- Chart.js
- Framer Motion
- React Bootstrap
- React Hook Form
- React Datepicker
- React Toastify
- ExchangeRate-API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- ExchangeRate-API key

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd finance-test
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your ExchangeRate-API key:
```env
VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. **Currency Conversion**
   - Select currencies from the dropdown
   - Enter amount to see real-time conversion

2. **Transaction Management**
   - Add new transactions with amount, category, and date
   - View transactions filtered by date or category
   - See automatic USD conversion for all transactions

3. **Dashboard Analytics**
   - Monitor total income and expenses
   - View expense distribution by category
   - Track financial trends over time

## Project Structure

```
finance-test/
├── src/
│   ├── modules/
│   │   ├── Analytics/
│   │   ├── CurrencyConversion/
│   │   └── Transaction/
│   ├── services/
│   ├── layout/
│   └── App.jsx
├── public/
└── package.json
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
