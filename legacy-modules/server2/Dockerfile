# Start with a base image containing Java runtime
FROM ubuntu:22.04

# mirrors for China mainland
RUN sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list

# Install OpenJDK-8
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y mysql-client && \
    apt-get install -y nodejs npm && \
    npm install -g pm2 && \
    apt-get clean;

RUN mkdir -p /opt/app
COPY ["./", "/opt/app"]
COPY ["./docker/bootstrap.sh","/opt/app"]
WORKDIR "/opt/app"
RUN mkdir -p /opt/logs
RUN curl https://cdn.npmmirror.com/binaries/node/v20.12.0/node-v20.12.0-linux-x64.tar.gz -O
RUN tar -xf node-v20.12.0-linux-x64.tar.gz
ENV PATH "/opt/app/node-v20.12.0-linux-x64/bin:${PATH}"
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --legacy-peer-deps --force
ENV PORT 2016
ENV LOG_DIR /opt/logs
ENV NODE_ENV production
RUN chmod +x /opt/app/bootstrap.sh
CMD ["/opt/app/bootstrap.sh"]