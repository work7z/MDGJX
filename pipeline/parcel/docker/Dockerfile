FROM ubuntu:22.04
RUN mkdir /opt/app

RUN apt-get update && \
    apt-get install -y curl 
RUN mkdir -p /opt/app

ENV PATH "/opt/app/node/bin:${PATH}"
ENV NODE_ENV production

COPY ["./node","/opt/app/node"]
COPY ["./linux.tar.gz", "/opt/app"]
COPY ["./bootstrap.sh","/opt/app"]
WORKDIR "/opt/app"
CMD ["/opt/app/bootstrap.sh"]
