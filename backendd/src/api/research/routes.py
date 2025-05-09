import logging
from fastapi import APIRouter, HTTPException
from src.agent import graph
from src.agent.state import InputState
from src.model.user_request import UserRequest

router = APIRouter()

@router.post("/research")
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


@router.get("/")
async def helloworld():
    return 'Hello world'
