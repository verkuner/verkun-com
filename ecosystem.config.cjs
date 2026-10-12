// pm2 process file for the VM: `pm2 startOrReload ecosystem.config.cjs`
// nginx sends /v1/* to verkun-v1 (:3001) and everything else to verkun-v2 (:3000).
const next = "node_modules/next/dist/bin/next";

module.exports = {
  apps: [
    {
      name: "verkun-v2",
      cwd: `${__dirname}/v2`,
      script: next,
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        // Contact-form mail goes via the local Postfix relay (scripts/setup-mail-relay.sh).
        MAIL_TO: "contact@verkun.com",
        MAIL_FROM: "sender@verkun.com", // the Feishu mailbox Postfix signs in as
      },
    },
    {
      name: "verkun-v1",
      cwd: `${__dirname}/v1`,
      script: next,
      args: "start -p 3001",
      env: { NODE_ENV: "production" },
    },
  ],
};
