FROM node:16.3.0

LABEL version="0.1"
LABEL description="issue-2021060801"

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo



# system update
RUN apt-get update && \
    apt-get install -y vim less psmisc


# ボリュームマウントで上書きされる想定
RUN mkdir /src
WORKDIR /src

ENV HOST 0.0.0.0
EXPOSE 3001
EXPOSE 3002
EXPOSE 8080
