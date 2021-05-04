# Who wants to be a millionaire?
Simple, but fancy implementation of one of the most popular games. 

## Instalation
1. Clone the repository
    ```sh
      git clone  git@github.com:natikos/who-wants-to-be-a-millionaire.git <your_dir_name>
    ```
    ...and open it
    ```sh
        cd <your_dir_name>
    ```
2. Run server
    ```sh
        cd server/ && go run main.go 
    ```
    You will see the message that sever is starting on port `8080`
3. Start client app
    There are two ways to proceed: using repo's GitHub page and set `Access-Control-Allow-Origin` header to `https://natikos.github.io` in order to fix CORS errors. Restart your server and now you are able to play!
    Or you can run client locally, go to `client/`:
    1. Install dependencies
        ```sh
            npm install
        ```
    2.  Run React app
        ```sh
            npm start
        ```
    
## Docker
For these steps you need docker on your machine
1. Dockerizing server
    ```sh
        cd server/ && go build
    ```
    Handsome Gopher will create a file with name `server`. Now you are able to build your docker image:
    ```sh
        cd .. && sudo docker image build -t <container-name> .
    ```
    You should see the message about successfull operation. Run your container!
    ```sh
        sudo docker container run -p 8080:8080 <container-name>
    ```
    Your server is available on `http://localhost:8080`

2. Dockerizing client application
Ooops, to be continued... But there is something for your own docker journey on branch `feature/client-docker`