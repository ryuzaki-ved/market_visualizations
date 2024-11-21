from fastapi import FastAPI
from app.routes import data

app = FastAPI()

app.include_router(data.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Market Data API"}
