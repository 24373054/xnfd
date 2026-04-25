#!/usr/bin/env bash
# 仅通过 PM2 停止 xnfd；若仍有进程占用端口（如 pnpm dev），再尝试按端口清理
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT=3125
LEGACY_PID="$ROOT/.xnfd-server.pid"

port_busy() {
  if command -v fuser >/dev/null 2>&1; then
    fuser -s "$PORT/tcp" 2>/dev/null && return 0
    return 1
  fi
  if command -v ss >/dev/null 2>&1; then
    ss -ltnH 2>/dev/null | awk -v p="$PORT" '$4 ~ ":" p "$" { exit 0 } END { exit 1 }' && return 0
    return 1
  fi
  if command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1 && return 0
    return 1
  fi
  return 1
}

if ! command -v pm2 >/dev/null 2>&1; then
  echo "未找到 pm2。"
  exit 1
fi

if pm2 describe xnfd >/dev/null 2>&1; then
  echo "正在执行: pm2 stop xnfd"
  pm2 stop xnfd
  sleep 1
else
  echo "PM2 中未注册应用「xnfd」（可能从未执行过 service:start）。"
fi

# 旧版 start.sh 留下的 PID 文件，仅作清理
rm -f "$LEGACY_PID"

if port_busy; then
  echo "端口 $PORT 仍被监听（例如 pnpm dev），正在尝试结束占用进程…"
  if command -v fuser >/dev/null 2>&1; then
    fuser -k "$PORT/tcp" >/dev/null 2>&1 || true
  elif command -v lsof >/dev/null 2>&1; then
    pids="$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"
    if [[ -n "${pids:-}" ]]; then
      kill $pids 2>/dev/null || true
    fi
  fi
  sleep 0.5
fi

if port_busy; then
  echo "注意: 端口 $PORT 仍可能被占用。请: ss -ltnp | grep $PORT"
else
  echo "端口 $PORT 已空闲。"
fi

echo ""
echo "完成。启动请用: bash \"$ROOT/scripts/start.sh\"  或  pnpm service:start"
