FROM node:20-slim

# Install Python, pip, ffmpeg (yt-dlp needs these), and yt-dlp itself.
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 python3-pip ffmpeg curl ca-certificates && \
    pip3 install -U yt-dlp --break-system-packages && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

ENV PORT=10000
EXPOSE 10000

CMD ["node", "index.js"]
