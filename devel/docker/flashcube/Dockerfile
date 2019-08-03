FROM python:3
ENV PYTHONBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN ls
COPY flashcube/requirements.txt /code/
RUN pip install -r requirements.txt
COPY flashcube /code/
COPY devel/docker/flashcube/startup.sh /code/
RUN chmod +x startup.sh