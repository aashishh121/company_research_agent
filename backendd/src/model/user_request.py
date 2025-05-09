from pydantic import BaseModel

class UserRequest(BaseModel):
    company: str