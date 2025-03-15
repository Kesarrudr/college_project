# Use the official Ubuntu 22.04 LTS (Jammy Jellyfish) as a parent image
FROM ubuntu:22.04
LABEL maintainer="eXo Platform <docker@exoplatform.com>"

# Install OpenJDK 11
RUN apt-get update && \
  apt-get install -y openjdk-11-jdk-headless && \
  rm -rf /var/lib/apt/lists/*

# Install additional dependencies: Node.js, Python, C++ compiler, and Tini
RUN apt-get update && \
  apt-get install -y nodejs npm python3 python3-pip g++ wget gnupg2 && \
  npm install -g n && n stable && \
  apt-get clean && \
  wget -qO /usr/local/bin/tini https://github.com/krallin/tini/releases/download/v0.19.0/tini && \
  chmod +x /usr/local/bin/tini

# Set the working directory in the container
WORKDIR /code

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Rebuild native modules
RUN npm rebuild

# Copy the rest of your application's code to the working directory
COPY . .

# Clean up previous builds
RUN npm run clean && npm install && npm rebuild

# Build your app
RUN npm run build

EXPOSE 3000

# Define the entry point
ENTRYPOINT ["/usr/local/bin/tini", "--"]

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]

