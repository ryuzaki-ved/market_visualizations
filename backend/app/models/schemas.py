from pydantic import BaseModel
from typing import List

class StrikeSchema(BaseModel):
    expiry: str
    strikes: List[str]
    file_name: str
    charts: List[str]

class StrikeResponse(StrikeSchema):
    id: str  # MongoDB document ID
