# Company Researcher Agent

  A scalable company research agent that helps business professionals and analysts efficiently gather and analyze company information.
  The system utilizes LangGraph, the Tavily API, and language models to collect, analyze, and structure company-related data from various sources with high efficiency and accuracy.
        
# Setup Instructions For Backend

Set API keys for the LLM of choice (OpenAI is set by default in src/agent/graph.py) and Tavily API:
```
cp .env.example .env
```
Clone this repository and navigate to the project directory:
Run below command in terminal
```
pip install .

To run the FastAPI app, you need an ASGI server like `uvicorn`, `hypercorn`, or `daphne`.
For example, using `uvicorn`:
pip install uvicorn
python -m uvicorn main:app
```
The application will be available at http://127.0.0.1:8000.

# Setup Instructions For Frontend

Clone this repository and navigate to the project directory:
Run below command in terminal
```
npm install
npm run start
```
The application will be available at http://localhost:3000.

# Tech Stack
  Backend
  ```
  Python (FastAPI)
  LangGraph
  Tavily API
  OpenAI API or similar LLM
  ```
  Frontend
  ```
  React JS
  Tailwind CSS
  ```

# Architecture
    Frontend (React)
     • Input company name
     • Display structured data
     • Show loading/errors
        |
        v
    Backend API (Using FastAPI)
      • API endpoint (/api/v1/research)
      • Request validation & routing
      • Error handling & logging
        |
        v
    AI Agent (With LangGraph)
      • Query coordination                         
      • Task routing to APIs/LLMs                  
      • Schema extraction & refinement
        |
        v
    Tavily API & LLMs
      • Web search results 
        |
        v
    Aggregated Structured Data

# Data Flow Summary
```
  > User submits company name via the frontend UI.
  > Backend API receives the request, calls the LangGraph agent.
  > LangGraph orchestrates tasks: it queries Tavily for raw info and uses an LLM to extract key insights.
  > Results are returned to the backend and sent back to the UI for display.
```

# API Documentation
  POST /api/v1/research

  Request Payload:
  ```
  {
  "company": "facebook"
  }
  ```

  Response:
  ```
  {
    "info": {
        "company_name": "Facebook",
        "founding_year": 2004,
        "founder_names": [],
        "product_description": ""
        funding_summary": ""
      }
  }
  ```

# Future Improvement Suggestions
```
> User Authentication : Add user authentication for the personalized search histories.
> Caching Mechanism : we can add caching mechanism for search results to reduce API calls and improve response times for repeated queries.
> Rate Limiting : Implement rate limiting on the backend to prevent abuse of the API and ensure fair usage of external API keys.
> Download : Download features for the research summary in PDF or CSV format.
> UI : Interactive dashboard with timeline views and graphical data representation
```

# Need Help?
For any issues, feel free to create an issue in the repository or reach out to aashishkumargh@gmail.com.
