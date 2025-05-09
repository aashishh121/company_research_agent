from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from src.agent.graph import graph
from src.agent.state import OverallState, InputState, OutputState
from src.agent.configuration import Configuration
import logging
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

class UserRequest(BaseModel):
    company: str

@app.post("/research")
async def run_agent(request: UserRequest):
    try:
        input_state = InputState(
            company=request.company
        )

        result = await graph.ainvoke(input_state)
        return result

    except ValueError as ve:
        logging.exception("ValueError occurred")
        raise HTTPException(status_code=400, detail=str(ve))

    except TypeError as te:
        logging.exception("TypeError occurred")
        raise HTTPException(status_code=422, detail=str(te))

    except Exception as e:
        logging.exception("Unexpected error occurred")
        raise HTTPException(status_code=500, detail="Internal server error")
