"""Basic API for jiranator."""

import asyncio
import codecs
import hashlib
import logging
import os

import json
import uvicorn
import redis

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse


DIFFER_HOST = os.environ.get("DIFFER_ENV", 'differ-redis')


app = FastAPI(root_path="/api")
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['GET', 'OPTIONS', 'POST'], allow_headers=['*'])
logger = logging.getLogger('fastapi')


REDIS_POOL = redis.ConnectionPool(host=DIFFER_HOST, port=6379, db=0)
REDIS = redis.Redis(connection_pool=REDIS_POOL)

class DiffInfo(BaseModel):
    left: str
    right: str

@app.get("/")
async def read_root():
    """Test path for making sure we're up...like a health check!"""
    return JSONResponse({'status': 'UP'})


@app.get("/diffs/{id}")
async def get_diff(id):
    logger.info(f'Getting diff for id: {id}')
    diff_string = REDIS.get(id)
    return diff_string

@app.post("/new-diff/")
async def post_diff(diff_info: DiffInfo):
    diff_id = hashlib.md5(codecs.encode(diff_info.json())).hexdigest()
    REDIS.set(diff_id, diff_info.json())
    return diff_id


def main():
    """Run through uvicorn when run."""
    uvicorn.run("differ_api:app", host='0.0.0.0', port=8000, reload=True)

if __name__ == "__main__":
    main()
