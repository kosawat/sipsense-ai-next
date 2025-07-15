# SipSense

SipSense is a Next.js app that helps users discover drinks recommendations tailored to their preferences using AI models (Grok, OpenAI, DeepSeek). The app currently features a quiz for wine selection and demo pages for mixed drinks and whisky.

## Features

- Wine recommendation quiz powered by AI
- Password-protected demo sections
- Modern UI with Tailwind CSS
- Supports Grok, OpenAI, and DeepSeek APIs

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- API keys for Grok, OpenAI, and/or DeepSeek

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/sipsense-ai-next.git
   cd sipsense-ai-next
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```
   GROK_API_KEY=your_grok_api_key
   OPEN_API_KEY=your_openai_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   APP_PASSWORD=your_demo_password
   ```

### Running the App

Start the development server:
```sh
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Click "Find My Wine" to take the quiz and get recommendations.
- "Find My Mixed Drink" and "Find My Whisky" pages are coming soon.
- Protected sections require a password (set via `APP_PASSWORD`).

## Project Structure

- `src/app/` – Next.js app routes and pages
- `src/services/` – API integration for Grok, OpenAI, DeepSeek
- `src/components/` – UI components
- `public/` and `favicon_io/` – Static assets


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
