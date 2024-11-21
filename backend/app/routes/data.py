from fastapi import APIRouter, Query
from app.database import database
from app.database import historical_data_collection
from app.models.schemas import StrikeSchema, StrikeResponse
from bson import ObjectId

router = APIRouter()

@router.post("/strikes/", response_model=StrikeResponse)
async def create_strike(strike: StrikeSchema):
    strike_dict = strike.dict()
    result = await database.strikes.insert_one(strike_dict)
    return StrikeResponse(**strike_dict, id=str(result.inserted_id))

@router.get("/strikes/")
async def get_strikes():
    strikes = []
    async for strike in database.strikes.find():
        strikes.append(StrikeResponse(**strike, id=str(strike["_id"])))
    return strikes

@router.get("/historical_data/")
async def get_historical_data(expiry: str = Query(None)):
    query = {}
    if expiry:
        query["expiry"] = expiry

    historical_data = []
    async for record in historical_data_collection.find(query):
        historical_data.append({
            "id": str(record["_id"]),
            "symbol": record["symbol"],
            "timestamp": record["timestamp"],
            "open": record["open"],
            "high": record["high"],
            "low": record["low"],
            "close": record["close"],
            "volume": record["volume"],
            "expiry": record["expiry"],
        })
    return historical_data