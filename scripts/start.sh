#!/usr/bin/env bash
# 仅通过 PM2 启动 xnfd 生产服务（配置见 ../ecosystem.config.cjs）
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
ECOSYSTEM="$ROOT/ecosystem.config.cjs"
PORT=3125

if ! command -v pm2 >/dev/null 2>&1; then
  echo "未找到 pm2。请先安装，例如: pnpm add -g pm2"
  exit 1
fi

if [[ ! -f "$ECOSYSTEM" ]]; then
  echo "缺少配置文件: $ECOSYSTEM"
  exit 1
fi

if [[ ! -d .next ]]; then
  echo "未找到 .next，请先执行: pnpm build"
  exit 1
fi

port_in_use() {
  if command -v fuser >/dev/null 2>&1; then
    fuser -s "$PORT/tcp" 2>/dev/null && return 0
    return 1
  fi
  if command -v ss >/dev/null 2>&1; then
    if ss -ltnH 2>/dev/null | awk -v p="$PORT" '$4 ~ ":" p "$" { exit 0 } END { exit 1 }'; then
      return 0
    fi
    return 1
  fi
  if command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1 && return 0
    return 1
  fi
  return 1
}

pm2_xnfd_online() {
  pm2 describe xnfd >/dev/null 2>&1 || return 1
  pm2 list --no-color 2>/dev/null | grep -E '[[:space:]]xnfd[[:space:]]' | grep -q 'online'
}

if pm2_xnfd_online; then
  echo "xnfd 已在 PM2 中在线运行。查看日志: pm2 logs xnfd ；重启: pm2 restart xnfd"
  exit 0
fi

if port_in_use; then
  echo "端口 $PORT 已被占用，且 PM2 中 xnfd 未处于 online（可能是 pnpm dev 或其它进程）。"
  echo "请先: bash \"$ROOT/scripts/stop.sh\"  或手动释放端口后再执行本脚本。"
  exit 1
fi

if pm2 describe xnfd >/dev/null 2>&1; then
  echo "PM2 中已有应用 xnfd（当前未监听端口），正在 pm2 restart…"
  pm2 restart xnfd --update-env
else
  echo "正在向 PM2 注册并启动 xnfd…"
  pm2 start "$ECOSYSTEM"
fi

sleep 1
if pm2_xnfd_online; then
  echo "已启动（PM2）。端口 $PORT。日志: pm2 logs xnfd ；状态: pm2 show xnfd"
  echo "（开机自启需自行执行一次: pm2 save  与  pm2 startup）"
else
  echo "启动后未进入 online，请查看: pm2 logs xnfd --lines 50"
  exit 1
fi
