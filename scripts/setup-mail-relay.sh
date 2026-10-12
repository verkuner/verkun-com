#!/usr/bin/env bash
# One-time setup on the VM: Postfix as a local-only relay that sends through
# Feishu Mail (smtp.feishu.cn:465) as contact@verkun.com.
#
#   sudo bash setup-mail-relay.sh
#
# The mailbox password is NOT set here — run `sudo verkun-mail-password`
# afterwards and type the Feishu app-specific password when prompted.
set -euo pipefail

MAILBOX="${MAILBOX:-contact@verkun.com}"
RELAY="[smtp.feishu.cn]:465"

echo "postfix postfix/main_mailer_type select Satellite system" | debconf-set-selections
echo "postfix postfix/mailname string verkun.com" | debconf-set-selections
echo "postfix postfix/relayhost string $RELAY" | debconf-set-selections
DEBIAN_FRONTEND=noninteractive apt-get install -y -qq postfix libsasl2-modules mailutils >/dev/null

postconf -e \
  "myhostname = vm.verkun.com" \
  "myorigin = verkun.com" \
  "mydestination = vm.verkun.com, localhost.localdomain, localhost" \
  "inet_interfaces = loopback-only" \
  "inet_protocols = ipv4" \
  "mynetworks = 127.0.0.0/8" \
  "relayhost = $RELAY" \
  "smtp_tls_wrappermode = yes" \
  "smtp_tls_security_level = encrypt" \
  "smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt" \
  "smtp_sasl_auth_enable = yes" \
  "smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd" \
  "smtp_sasl_security_options = noanonymous" \
  "smtp_sasl_tls_security_options = noanonymous" \
  "sender_canonical_maps = regexp:/etc/postfix/sender_canonical"

# Feishu only accepts mail whose sender is the authenticated mailbox.
echo "/.+/ $MAILBOX" > /etc/postfix/sender_canonical

# Password helper: prompts without echo, stores root-only, sends a test mail.
cat > /usr/local/sbin/verkun-mail-password <<EOF
#!/usr/bin/env bash
set -euo pipefail
read -rsp "Feishu app password for $MAILBOX: " PW; echo
umask 077
printf '%s %s:%s\n' '$RELAY' '$MAILBOX' "\$PW" > /etc/postfix/sasl_passwd
postmap /etc/postfix/sasl_passwd
chmod 600 /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db
systemctl reload postfix
printf 'Subject: VERKUN mail relay test\nFrom: $MAILBOX\nTo: $MAILBOX\n\nPostfix on the VM can send through Feishu Mail.\n' | sendmail -f $MAILBOX $MAILBOX
echo "Saved. Test mail queued to $MAILBOX — check: sudo tail -n 20 /var/log/mail.log"
EOF
chmod 700 /usr/local/sbin/verkun-mail-password

touch /etc/postfix/sasl_passwd && chmod 600 /etc/postfix/sasl_passwd && postmap /etc/postfix/sasl_passwd
systemctl enable --now postfix >/dev/null 2>&1
systemctl restart postfix
echo "Postfix relay ready ($RELAY as $MAILBOX). Next: sudo verkun-mail-password"
