# QbAir Booking Application

A Next.js web application for booking flights with QbAir airline. Users can book either one-way or round-trip flights with proper date validation.

## Features

- Choose and book one-way trips (default option)
- Choose and book round-trip flights
- Form validation:
  - Date inputs must be formatted as: yyyy-mm-dd
  - Dates can't be in the past
  - The departure date must be before or equal to the return date
  - Invalid fields are highlighted visually with error messages
- Form inputs can be set from query parameters
  - Example: Visiting the page with ?departure=2021-12-31 will set the departure date
  - Invalid values are ignored

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/alperbaskir/qbair-booking.git
   cd qbair-booking
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## URL Parameters

The application supports the following URL parameters:

- `departure`: Sets the departure date (format: yyyy-mm-dd)
- `return`: Sets the return date (format: yyyy-mm-dd)
- `tripType`: Sets the trip type ('oneWay' or 'roundTrip')

Example:
\`\`\`
http://localhost:3000/?departure=2023-12-25&return=2023-12-31&tripType=roundTrip
\`\`\`

## Deployment

The application is deployed on Vercel and can be accessed at:
[https://qbair-booking-alper-baskir.vercel.app](https://qbair-booking-alper-baskir.vercel.app)

## Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
