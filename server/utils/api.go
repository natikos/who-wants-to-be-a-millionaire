package utils

import (
	"log"
	"net/http"
	"os"
	"time"
)

func Track(writer http.ResponseWriter) (http.ResponseWriter, time.Time) {
	return writer, time.Now()
}

func MeasureRequest(writer http.ResponseWriter, start time.Time) {
	log.Println("Elapsed: ", time.Since(start) * time.Microsecond)
}

func EndpointHandler(handler func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request)  {
	return func(w http.ResponseWriter, r *http.Request) {
		defer MeasureRequest(Track(w))
		hostname, _ := os.Hostname()
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("X-Server-Name", hostname)	
		handler(w, r)
	}
}
