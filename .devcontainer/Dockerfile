FROM node:22

# Install basic development tools
RUN apt-get update && apt-get install -y less man-db git

ARG USERNAME=node

RUN echo 'export PATH=./node_modules/.bin:$PATH' >> /home/${USERNAME}/.bashrc

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
