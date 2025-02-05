# bash script to build the image and the container

- chmod +x scripts/*.sh
- ./scripts/build_push_run_frontend.sh

# bash script to pull and build the container

- chmod +x scripts/*.sh
- ./scripts/pull_and_run_frontend.sh

# script to run the app for development

- npm run dev

# script to run the app for Production

- npm run build



docker buildx build --platform linux/amd64 -t jonatanav255/my-react-app:latest --push .

docker push jonatanav255/my-react-app:latest
