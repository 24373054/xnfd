/**
 * PM2 唯一托管生产环境（与 package.json 中端口一致）
 * 启停请用: pnpm service:start | pnpm service:stop
 */
const path = require("path");

const root = __dirname;
const port = 3125;

module.exports = {
  apps: [
    {
      name: "xnfd",
      cwd: root,
      script: path.join(root, "node_modules", "next", "dist", "bin", "next"),
      args: `start -p ${port}`,
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 30,
      min_uptime: "10s",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
