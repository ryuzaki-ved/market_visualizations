from pymongo import MongoClient
import os

MONGO_DETAILS = os.getenv("MONGO_DETAILS")  # Set MongoDB URI in an environment variable

client = MongoClient(MONGO_DETAILS)
database = client.market_data  # database named 'market_data'
