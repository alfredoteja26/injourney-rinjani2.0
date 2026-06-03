# Multi-stage build for the Rinjani integrated frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy package manifests first to leverage Docker cache
COPY package.json package-lock.json ./
COPY apps/rinjani/package.json apps/rinjani/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
COPY packages/shared-ui/package.json packages/shared-ui/package.json
COPY packages/shell/package.json packages/shell/package.json

RUN npm ci

# Copy the full project content after dependencies are installed
COPY . .

# Build the integrated app workspace
RUN npm run build

# Production image: nginx serves the built static site
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/rinjani/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
