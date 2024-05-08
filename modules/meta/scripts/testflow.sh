

# on server
docker stop test-normal-docker
docker rm test-normal-docker
docker run -e DEBUG_MODE=yes -e LAFREGION=CN -e APPLANG=zh_CN --name test-normal-docker -d -p 0.0.0.0:2066:39899 codegentoolbox/laftools-linux-x64:v2.2.11-beta


docker run -e DEBUG_MODE=yes -e LAFREGION=US -e APPLANG=zh_CN --name test-normal-docker -d -p 0.0.0.0:2066:39899 codegentoolbox/laftools-linux-x64:v2.2.11-beta
