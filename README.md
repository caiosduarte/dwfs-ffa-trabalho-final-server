# ffa-trabalho-final-server


## Ambientes

produção: https://ffa-server-todo-list.herokuapp.com/
desenvolvimento: http://localhost:8080/

## Verifica o status do servidor

curl -v http://localhost:8080/status

Resposta:
*   Trying ::1:8080...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> GET /status HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 37
< ETag: W/"25-CO8ipiZCeUBdUWOH7/joZOILwI8"
< Date: Sun, 11 Oct 2020 03:27:37 GMT
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
{"message":"Todo List Server alive!"}



##Loga 

curl -d '{"username":"usuario","password":"password"}' -H 'Content-Type: application/json' http://localhost:8080/login

Resposta:

{"username":"usuario","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJ1c3VhcmlvIiwiaWF0IjoxNjAyMzg2NzMwLCJleHAiOjE2MDIzOTAzMzB9.eNtTVYoDFdNsn7Hdfxbv4ecT__QiDh_7Km0iq7v_mLg"}



##Obtém os dados do servidor

 curl -i -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJ1c3VhcmlvIiwiaWF0IjoxNjAyMzg2NzMwLCJleHAiOjE2MDIzOTAzMzB9.eNtTVYoDFdNsn7Hdfxbv4ecT__QiDh_7Km0iq7v_mLg" -H 'Content-Type: application/json' -H "Accept: application/json"  http://localhost:8080/api/db

