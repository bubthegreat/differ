FROM python:3.12

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Add things here you don't want to have to build any time it changes again.
RUN uv pip install --system fastapi jira ujson uvicorn email-validator

COPY . /api

WORKDIR /api

RUN uv sync --frozen --no-cache

EXPOSE 8000

CMD ["/api/.venv/bin/differ_api"]
