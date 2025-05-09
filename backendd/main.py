from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from agent.graph import graph
from agent.state import OverallState, InputState, OutputState
from agent.configuration import Configuration
import logging

app = FastAPI()

class UserRequest(BaseModel):
    company: str

@app.post("/company-research")
async def run_agent(request: UserRequest):
    try:
        input_state = InputState(
            company=request.company
        )

        result = await graph.invoke(input_state)
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
