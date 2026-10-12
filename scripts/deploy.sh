#!/usr/bin/env bash
# Deploy the committed HEAD of both apps to the VM and reload pm2.
#
#   ./scripts/deploy.sh            # deploys v1 and v2
#   ./scripts/deploy.sh v2         # deploys only v2
#
# Builds in a fresh release directory, then swaps it in, so a failed build
# never takes the live site down.
set -euo pipefail

HOST="${DEPLOY_HOST:-ubuntu@82.156.22.130}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/172_21_ubuntu.pem}"
APP_DIR="/opt/verkun-com"
TARGETS="${*:-v1 v2}"
ARCHIVE="$(mktemp -t verkun-XXXX).tar.gz"

cd "$(git rev-parse --show-toplevel)"
if [ -n "$(git status --porcelain)" ]; then
  echo "warning: uncommitted changes are NOT deployed (deploying HEAD $(git rev-parse --short HEAD))"
fi

git archive --format=tar.gz -o "$ARCHIVE" HEAD
scp -i "$KEY" -q "$ARCHIVE" "$HOST:/tmp/verkun-release.tar.gz"
rm -f "$ARCHIVE"

ssh -i "$KEY" "$HOST" "TARGETS='$TARGETS' APP_DIR='$APP_DIR' bash -s" <<'REMOTE'
set -euo pipefail
REL="${APP_DIR}/.release"
rm -rf "$REL" && mkdir -p "$REL"
tar xzf /tmp/verkun-release.tar.gz -C "$REL"

for app in $TARGETS; do
  echo "==> building $app"
  # Reuse the live node_modules when the lockfile hasn't changed.
  if cmp -s "$APP_DIR/$app/package-lock.json" "$REL/$app/package-lock.json" && [ -d "$APP_DIR/$app/node_modules" ]; then
    cp -a "$APP_DIR/$app/node_modules" "$REL/$app/"
  else
    (cd "$REL/$app" && npm ci --no-audit --no-fund)
  fi
  (cd "$REL/$app" && npm run build)
done

for app in $TARGETS; do
  rm -rf "$APP_DIR/$app.prev"
  [ -d "$APP_DIR/$app" ] && mv "$APP_DIR/$app" "$APP_DIR/$app.prev"
  mv "$REL/$app" "$APP_DIR/$app"
done
cp "$REL/ecosystem.config.cjs" "$APP_DIR/ecosystem.config.cjs"
rm -rf "$REL"

cd "$APP_DIR"
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save >/dev/null
pm2 status
REMOTE

echo "deployed: $TARGETS"
