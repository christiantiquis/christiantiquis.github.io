# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.16.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /usr/src/app


################################################################################
# Create a stage for installing production dependecies.
FROM base AS deps

# Copy package.json and package-lock.json to the image.
COPY package.json package-lock.json ./

# Install only production dependencies.
RUN npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps AS build

# Download additional development dependencies before building, AS some projects require
# FROM deps AS build

# Copy package.json and package-lock.json to the image (again, to ensure cache correctness).
COPY package.json package-lock.json ./

# Install all dependencies including devDependencies.
RUN npm ci

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN npm run build
# where the necessary files are copied from the build stage.
FROM base AS final

# Use production node environment by default.
ENV NODE_ENV=production

# Run the application AS a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next


# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD [ "npm", "run", "start" ]
