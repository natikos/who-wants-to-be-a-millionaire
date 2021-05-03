FROM golang:1.16-alpine AS build

WORKDIR /src

COPY go.mod /src/
COPY server/ /src/server/

RUN cd server/ && CGO_ENABLED=0 go build -o /bin/server

FROM scratch
COPY --from=build /bin/server /bin/server
ENTRYPOINT ["/bin/server"]