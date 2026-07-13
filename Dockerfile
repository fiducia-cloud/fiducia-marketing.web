# syntax=docker/dockerfile:1
# Static Astro site image.
FROM node:24-slim@sha256:cb4e8f7c443347358b7875e717c29e27bf9befc8f5a26cf18af3c3dec80e58c5 AS build
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates git

ARG INTERFACES_REF=bbd8b52ce729ec34b0a9bff4dda6d0a448181797
ARG TEST_CONFIG_REF=ed4c788abf3964482ae72a08b82fa3ac1d193f81
WORKDIR /build
# package-lock.json contains sibling file: dependencies. Fetch only the exact
# requested commits and verify that callers supplied full immutable SHAs.
RUN test "${#INTERFACES_REF}" -eq 40 \
    && test -z "$(printf '%s' "$INTERFACES_REF" | tr -d '0-9a-f')" \
    && test "${#TEST_CONFIG_REF}" -eq 40 \
    && test -z "$(printf '%s' "$TEST_CONFIG_REF" | tr -d '0-9a-f')" \
    && git init --quiet fiducia-interfaces \
    && git -C fiducia-interfaces remote add origin https://github.com/fiducia-cloud/fiducia-interfaces.git \
    && git -C fiducia-interfaces fetch --quiet --depth=1 --no-tags origin "$INTERFACES_REF" \
    && git -C fiducia-interfaces checkout --quiet --detach FETCH_HEAD \
    && test "$(git -C fiducia-interfaces rev-parse HEAD)" = "$INTERFACES_REF" \
    && git init --quiet fiducia-test-config \
    && git -C fiducia-test-config remote add origin https://github.com/fiducia-cloud/fiducia-test-config.git \
    && git -C fiducia-test-config fetch --quiet --depth=1 --no-tags origin "$TEST_CONFIG_REF" \
    && git -C fiducia-test-config checkout --quiet --detach FETCH_HEAD \
    && test "$(git -C fiducia-test-config rev-parse HEAD)" = "$TEST_CONFIG_REF"

WORKDIR /build/fiducia-ui.web
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
ARG PUBLIC_BASE=/fiducia
RUN PUBLIC_BASE="$PUBLIC_BASE" npm run build

FROM nginx:1.27-alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=nginx:nginx /build/fiducia-ui.web/dist /srv/www
USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
