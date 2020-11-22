FROM python:3.8-buster

RUN pip install fastapi
RUN pip install jira
RUN pip install ujson
RUN pip install uvicorn
RUN pip install email-validator

WORKDIR /api-differ
COPY . .

RUN pip install .

EXPOSE 8000

CMD uvicorn --reload --host 0.0.0.0 --port 8000 differ_api:app