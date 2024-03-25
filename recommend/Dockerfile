FROM python:3.10.6-alpine

ENV PYTHONBUFFER=1

WORKDIR /app

COPY ./recommend/requirements.txt /app/requirements.txt
RUN pip install --upgrade pip

RUN pip3 install -r requirements.txt

COPY ./recommend /app