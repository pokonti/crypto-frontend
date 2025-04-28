# Crypto Watcher
This is the frontend part of the Crypto application. The app provides real-time data about cryptocurrencies, including price changes, charts and detailed information for each coin. It also has a portfolio management system and an AI assistant to help users with their crypto investments.
## Features
* Display real-time price changes of various cryptocurrencies
* Quickly search for any cryptocurrency, the search feature updates the list of cryptocurrencies in real-time as users type
* Display the price of each cryptocurrency in Kazakhstani Tenge (KZT) alongside the standard value in USD and EUR
* Visualize the price changes of each cryptocurrency over time with interactive charts
* Manage your cryptocurrency portfolio, the system calculates and displays the user’s portfolio profit or loss based on the current price of the cryptocurrency
* An AI-powered assistant that helps users with investment advice, market trends and answers questions about cryptocurrencies
* The user interface is designed to show up-to-date data and give immediate feedback in case of errors or no data available for a given currency.
* The backend updates cryptocurrency data every 60 seconds, using background tasks
* Prikol'nyi loading states to improve the user experience


## Technologies Used
* **React.js:** Frontend framework for building the user interface
* **FastAPI:** Backend framework for connection API and frontend side
* **CoinGecko API:** For fetching data about cryptocurrencies
* **Exchange Rate API:** For converting usd to kzt
* **Gemini API:** For the AI Assistant to provide market insights and advice
* **Recharts:** For visualizing cryptocurrency price changes over time with interactive charts
* **Skeleton:** Used for engaging and smooth loading states, improving user experience during data fetching

## Installation and Setup
### Prerequisites
* Ensure that you have Node.js and npm installed.
* You will also need Python 3.8+ and pip installed for setting up the backend (FastAPI).

### Frontend Setup

1. Clone the repository:
   ```
   git clone https://github.com/pokonti/crypto-frontend
   cd crypto-front
   ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Start the development server:
    ```
    npm run dev
    ```

## Design and Development Process
### Frontend Design
The frontend is built using React.js to provide a dynamic, responsive interface. I used functional components and React hooks (useState, useEffect) to manage the state and data flow efficiently. The interactive chart feature is built with Recharts and it dynamically updates based on real-time data fetched from the backend.

### Backend Design
The backend is powered by FastAPI, a high-performance web framework for building APIs with Python. I used CoinGecko API to fetch real-time cryptocurrency prices and Exchange Rate API to convert prices into tenge (kzt). The AI assistant is powered by Gemini API, which provides valuable insights and recommendations on the market trends.
The backend runs in an asynchronous manner, fetching updated cryptocurrency data every 60 seconds using background tasks to ensure the data is always fresh.

### Issues occured 
- There was an issue during API rate limiting, it has been overloaded, but then i solved this problem by implementing caching and rate limit
- To display cryptocurrency prices in KZT, I used a separate Exchange Rate API
- I chose to update cryptocurrency prices every 5 minutes on the frontend, but data is updated every 60 sec on the backend
- Also deployment was a little bit tiring process

### Future Improvements
- Authorization
- Saving portfolio data
- Saving AI chat
- A new component with only crypto currency news


### Backend Link
https://github.com/pokonti/crypto-backend





