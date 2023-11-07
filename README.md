<!-- Use this command to run the elasticsearch container -->
docker run -p 9200:9200 -p 9300:9300 --name elasticsearch -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.17.14

<!-- Update the host where elasticsearch container is deployed in elasticsearch.js -->

<!-- Install the node modules -->

<!-- Run index.js -->

<!-- Run curls from curl.sh -->