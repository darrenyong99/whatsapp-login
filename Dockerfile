FROM node:18-bullseye

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgbm1 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working dir
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the app
COPY . .

# Use safer user
#RUN groupadd -r bot && useradd -r -g bot bot
#USER bot

# Run the bot
CMD ["node", "index.js"]
