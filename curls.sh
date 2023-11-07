#curl1
curl --location 'http://localhost:3000/elastic/index/init?index_name=test1'

#curl2
curl --location 'http://localhost:3000/elastic/index/check?index_name=test1'

#curl3
curl --location 'http://localhost:3000/elastic/index/mapping' --header 'Content-Type: application/json' --data '{"index_name": "test1","payload": {"properties": {"title": {"type": "text"},"description": {"type": "text"},"tags": {"type": "keyword"}}}}'

#curl4
curl --location 'http://localhost:3000/elastic/add' --header 'Content-Type: application/json' --data '{"index_name": "courses","id": 1234567,"type": "document","payload": {"title": "Digital marketing","tags": "taga, tag-1b, tag3, tag4","categories": ["Online","Marketing"],"price": "12000","level": "Beginner","badges": ["Popular","Normal"]}}'

#curl5
curl --location --request PUT 'http://localhost:3000/elastic/update' --header 'Content-Type: application/json' --data '{"index_name": "courses","id": 1234567,"type": "document", "payload": {"title": "Rangoon"}}'

#curl6
curl --location 'http://localhost:3000/elastic/search' --header 'Content-Type: application/json' --data '{"index_name": "courses","type": "document","payload": {"query": {"match": { "title": "Digital marketing" }}}}'

#curl7
curl --location --request DELETE 'http://localhost:3000/elastic/delete-document' --header 'Content-Type: application/json' --data '{"index_name": "courses","id": 1234567,"type": "document"}'

#curl8
curl --location --request DELETE 'http://localhost:3000/elastic/delete-index/test1'

