export default function handler(req, res) {
  const userKey = (req.query.key || 'SUNNY').replace(/\.bpf$/i, '').trim();

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `inline; filename="${userKey}.bpf"`);
  res.setHeader('Access-Control-Allow-Origin', '*');

  const config = {
    "log": {
      "level": "warn",
      "timestamp": true
    },
    "dns": {
      "servers": [
        {
          "type": "local",
          "tag": "local"
        }
      ],
      "rules": [
        {
          "domain": [
            "login.common.freefiremobile.com",
            "client.common.freefiremobile.com",
            "version.common.freefiremobile.com",
            "auth.garena.com",
            "accounts.google.com",
            "accounts.youtube.com",
            "oauth2.googleapis.com",
            "oauthaccountmanager.googleapis.com",
            "facebook.com",
            "graph.facebook.com",
            "100067.connect.garena.com",
            "100067.msdk.garena.com",
            "firebaseinstallations.googleapis.com",
            "firebaselogging-pa.googleapis.com",
            "api.twitter.com",
            "api-v3.baontq.xyz"
          ],
          "server": "dns-local"
        },
        {
          "domain_suffix": [
            "googleapis.com",
            "gstatic.com",
            "googleusercontent.com",
            "fbcdn.net"
          ],
          "action": "route",
          "server": "local"
        },
        {
          "domain_suffix": [
            "freefiremobile.com",
            "freefireth.com",
            "ff.garena.com"
          ],
          "action": "reject",
          "method": "default",
          "no_drop": true
        }
      ],
      "final": "local",
      "strategy": "ipv4_only"
    },
    "inbounds": [
      {
        "type": "tun",
        "tag": "tun-in",
        "address": [
          "172.19.0.1/30",
          "fdfe:dcba:9876::1/126"
        ],
        "auto_route": true,
        "stack": "gvisor",
        "endpoint_independent_nat": true,
        "mtu": 1500,
        "dns_mode": "hijack",
        "route_exclude_address": [
          "10.0.0.0/8",
          "100.64.0.0/10",
          "169.254.0.0/16",
          "172.16.0.0/12",
          "192.0.0.0/24",
          "192.0.2.0/24",
          "192.88.99.0/24",
          "192.168.0.0/16",
          "198.18.0.0/15",
          "198.51.100.0/24",
          "203.0.113.0/24",
          "224.0.0.0/4",
          "239.255.255.250/32",
          "255.255.255.255/32"
        ]
      }
    ],
    "outbounds": [
      {
        "type": "direct",
        "tag": "direct"
      }
    ],
    "route": {
      "auto_detect_interface": true,
      "rules": [
        {
          "protocol": "dns",
          "action": "hijack-dns"
        },
        {
          "action": "sniff",
          "sniffer": [
            "http",
            "tls",
            "quic"
          ],
          "timeout": "1s"
        },
        {
          "domain": [
            "login.common.freefiremobile.com",
            "client.common.freefiremobile.com",
            "version.common.freefiremobile.com",
            "auth.garena.com",
            "accounts.google.com",
            "accounts.youtube.com",
            "oauth2.googleapis.com",
            "oauthaccountmanager.googleapis.com"
          ],
          "action": "route",
          "outbound": "direct"
        },
        {
          "domain_suffix": [
            "googleapis.com",
            "gstatic.com",
            "googleusercontent.com"
          ],
          "action": "route",
          "outbound": "direct"
        },
        {
          "domain_suffix": [
            "account.garena.co.id", "account.garena.com", "account.garena.ph", "account.garena.vn",
            "accounts.google.com", "ad-x.co.uk", "adcolony.com", "adjust.com", "admob.com",
            "ads.adcolony.com", "ads.chartboost.com", "ads.facebook.com", "ads.google.com",
            "ads.inmobi.com", "ads.ironsrc.com", "ads.mopub.com", "ads.tapjoy.com", "ads.unity3d.com",
            "ads.vungle.com", "adserver.unityads.unity3d.com", "adservice.google.co.id",
            "adservice.google.co.in", "adservice.google.com", "af.gin.freefiremobile.com",
            "amplitude.com", "an.facebook.com", "analytic.freefiremobile.com", "analytics.adjust.com",
            "analytics.facebook.com", "analytics.garena.co", "analytics.garena.co.id",
            "analytics.garena.com", "analytics.garena.in", "analytics.garena.my", "analytics.garena.ph",
            "analytics.garena.sg", "analytics.garena.th", "analytics.garena.tw", "analytics.garena.vn",
            "analytics.google.com", "analytics.unity3d.com", "anticheat.freefiremobile.com",
            "anticheat.garena.co", "anticheat.garena.co.id", "anticheat.garena.com", "anticheat.garena.in",
            "anticheat.garena.my", "anticheat.garena.ph", "anticheat.garena.sg", "anticheat.garena.th",
            "anticheat.garena.tw", "anticheat.garena.vn", "api.amplitude.com", "api.applovin.com",
            "api.appsflyer.com", "api.chartboost.com", "api.ff.garena.com", "api.freefiremobile.com",
            "api.garena.co.id", "api.garena.com", "api.garena.ph", "api.garena.vn", "api.ironsrc.com",
            "api.mixpanel.com", "api.segment.io", "api.tapjoy.com", "api.vungle.com", "api2.appsflyer.com",
            "api2.branch.io", "app-measurement.com", "app.adjust.com", "app.appsflyer.com", "app.link",
            "applovin.com", "apps.appsflyer.com", "appsflyer.com", "ar.gin.freefiremobile.com",
            "assets.freefiremobile.com", "assets.garena.com", "attribution.adjust.com",
            "attribution.appsflyer.com", "auction.unityads.unity3d.com", "audio.freefiremobile.com",
            "aus.gin.freefiremobile.com", "auth.freefiremobile.com", "auth.garena.co.id",
            "auth.garena.com", "auth.garena.my", "auth.garena.ph", "auth.garena.sg", "auth.garena.th",
            "auth.garena.tw", "auth.garena.vn", "b-graph.facebook.com", "ban.freefiremobile.com",
            "ban.garena.co.id", "ban.garena.com", "ban.garena.ph", "ban.garena.vn", "bd.gin.freefiremobile.com",
            "blacklist.freefiremobile.com", "blacklist.garena.com", "blacklist.garena.vn", "bnc.lt",
            "br.gin.freefiremobile.com", "branch.io", "bugly.garena.com", "bugly.qq.com", "bugsnag.com",
            "bundle.freefiremobile.com", "business.facebook.com", "cdn.freefiremobile.com", "cdn.garena.co.id",
            "cdn.garena.com", "cdn.garena.my", "cdn.garena.ph", "cdn.garena.sg", "cdn.garena.th",
            "cdn.garena.tw", "cdn.garena.vn", "cdn.segment.com", "chartboost.com", "chat.freefiremobile.com",
            "chat.garena.com", "cheatandroidios.co", "cheatandroidios.garena.co", "cheatfreefire.com",
            "cl.gin.freefiremobile.com", "client.freefiremobile.com", "cn.gin.freefiremobile.com",
            "co.gin.freefiremobile.com", "com.appcloner.cloner", "com.cloneapp.multi",
            "com.cloneapp.parallelspace", "com.cloneapps.multiaccounts", "com.doubleapp.clone",
            "com.dts.freefiremax", "com.dts.freefiremax.clone", "com.dts.freefireth", "com.dts.freefireth.clone",
            "com.dual.space", "com.dualspace.app", "com.excelliance.multiaccount", "com.lbe.parallel",
            "com.multiaccounts.cloneapps", "com.multiple.accounts", "com.parallel.space",
            "com.parallel.space.lite", "config.unityads.unity3d.com", "connect.facebook.net",
            "contact.garena.co.id", "contact.garena.com", "contact.garena.ph", "contact.garena.vn",
            "conversions.appsflyer.com", "crash.garena.co.id", "crash.garena.com", "crash.garena.in",
            "crash.garena.ph", "crash.garena.vn", "crashlytics.com", "cs.garena.co.id", "cs.garena.com",
            "cs.garena.in", "cs.garena.ph", "cs.garena.vn", "detect.freefiremobile.com", "detect.garena.com",
            "dl.dir.freefiremobile.com", "dl.freefiremobile.com", "dl.garena.co.id", "dl.garena.com",
            "dl.garena.ph", "dl.garena.vn", "doubleclick.net", "download.garena.co.id", "download.garena.com",
            "download.garena.ph", "download.garena.vn", "e.crashlytics.com", "eg.gin.freefiremobile.com",
            "enforce.freefiremobile.com", "enforce.garena.com", "esport.freefiremobile.com", "esport.garena.com",
            "eu.gin.freefiremobile.com", "event.freefiremobile.com", "events.adjust.com", "events.applovin.com",
            "events.appsflyer.com", "events.vungle.com", "ff.garena.co", "ff.garena.co.id", "ff.garena.com",
            "ff.garena.com.br", "ff.garena.in", "ff.garena.mx", "ff.garena.my", "ff.garena.ph", "ff.garena.ru",
            "ff.garena.sg", "ff.garena.th", "ff.garena.tw", "ff.garena.vn", "ff.member.garena.co.id",
            "ff.member.garena.com", "ff.member.garena.ph", "ff.member.garena.vn", "ffaimbot.com",
            "ffautohs.com", "ffcdn.garena.co.id", "ffcdn.garena.com", "ffcdn.garena.in", "ffcdn.garena.vn",
            "ffcheat.com", "ffclient.garena.co.id", "ffclient.garena.com", "ffclient.garena.in",
            "ffclient.garena.vn", "ffesp.com", "ffhack.com", "ffinjector.com", "ffmax.freefireind.in",
            "ffmax.freefiremobile.com", "ffmax.garena.co.id", "ffmax.garena.com", "ffmax.garena.my",
            "ffmax.garena.ph", "ffmax.garena.sg", "ffmax.garena.th", "ffmax.garena.tw", "ffmax.garena.vn",
            "ffmod.com", "ffprod.garena.co.id", "ffprod.garena.com", "ffprod.garena.in", "ffprod.garena.vn",
            "ffquid.garena.co.id", "ffquid.garena.com", "ffquid.garena.ph", "ffquid.garena.vn",
            "firebase-settings.crashlytics.com", "firebasecrashlytics.googleapis.com",
            "firebaseinstallations.googleapis.com", "firebaselogging.googleapis.com",
            "firebaseremoteconfig.googleapis.com", "freefirecheat.com", "freefirehack.com",
            "freefiremax.garena.co.id", "freefiremax.garena.com", "freefiremax.garena.ph",
            "freefiremax.garena.vn", "freefiremobile-a.akamaihd.net", "freefiremobile.com",
            "freefiremobile.download.akamai.com", "freefiremod.com", "friend.freefiremobile.com",
            "friend.garena.com", "ft.contact.garena.co.id", "ft.contact.garena.com", "ft.contact.garena.ph",
            "ft.contact.garena.vn", "game.freefiremobile.com", "gamesecurity.asia.freefiremobile.com",
            "gamesecurity.au.freefiremobile.com", "gamesecurity.bd.freefiremobile.com",
            "gamesecurity.br.freefiremobile.com", "gamesecurity.eg.freefiremobile.com",
            "gamesecurity.eu.freefiremobile.com", "gamesecurity.garena.co", "gamesecurity.garena.co.id",
            "gamesecurity.garena.com", "gamesecurity.garena.in", "gamesecurity.garena.my",
            "gamesecurity.garena.ph", "gamesecurity.garena.sg", "gamesecurity.garena.th",
            "gamesecurity.garena.tw", "gamesecurity.garena.vn", "gamesecurity.id.freefiremobile.com",
            "gamesecurity.in.freefiremobile.com", "gamesecurity.latam.freefiremobile.com",
            "gamesecurity.mena.freefiremobile.com", "gamesecurity.my.freefiremobile.com",
            "gamesecurity.ph.freefiremobile.com", "gamesecurity.pk.freefiremobile.com",
            "gamesecurity.ru.freefiremobile.com", "gamesecurity.sa.freefiremobile.com",
            "gamesecurity.sg.freefiremobile.com", "gamesecurity.th.freefiremobile.com",
            "gamesecurity.tr.freefiremobile.com", "gamesecurity.us.freefiremobile.com",
            "gamesecurity.vn.freefiremobile.com", "garena.co", "garena.co.id", "garena.com",
            "garena.com.br", "garena.in", "garena.live", "garena.mx", "garena.my", "garena.ph",
            "garena.ru", "garena.sg", "garena.th", "garena.tw", "garena.vn", "garenahack.com",
            "garenamod.com", "gin.freefireind.in", "gin.freefiremobile.com", "google-analytics.com",
            "googleads.g.doubleclick.net", "googleadservices.com", "googlesyndication.com",
            "googletagmanager.com", "googletagservices.com", "graph-fallback.facebook.com",
            "graph.facebook.com", "graph.instagram.com", "health.freefiremobile.com", "help.garena.co.id",
            "help.garena.com", "help.garena.ph", "help.garena.vn", "hk.gin.freefiremobile.com",
            "hotro.ff.garena.vn", "hotro.garena.co.id", "hotro.garena.com", "hotro.garena.vn",
            "id.gin.freefiremobile.com", "img.freefiremobile.com", "img.garena.com", "in.gin.freefiremobile.com",
            "inmobi.com", "ironsrc.com", "jp.gin.freefiremobile.com", "kr.gin.freefiremobile.com",
            "latam.gin.freefiremobile.com", "launches.appsflyer.com", "leaderboard.freefiremobile.com",
            "leaderboard.garena.com", "live.freefiremobile.com", "live.garena.com", "log.freefiremobile.com",
            "log.garena.co.id", "log.garena.com", "log.garena.in", "log.garena.ph", "log.garena.vn",
            "login.freefiremobile.com", "login.garena.co.id", "login.garena.com", "login.garena.my",
            "login.garena.ph", "login.garena.sg", "login.garena.th", "login.garena.tw", "login.garena.vn",
            "m.freefiremobile.com", "m.garena.co.id", "m.garena.com", "m.garena.vn", "match.freefiremobile.com",
            "me.gin.freefiremobile.com", "member.garena.co.id", "member.garena.com", "member.garena.ph",
            "member.garena.vn", "mena.gin.freefiremobile.com", "metric.garena.co.id", "metric.garena.com",
            "metric.garena.ph", "metric.garena.vn", "metrics.freefiremobile.com", "metrics.garena.com",
            "mixpanel.com", "mo.gin.freefiremobile.com", "mobile-collector.newrelic.com",
            "mobile-crash.newrelic.com", "monitor.freefiremobile.com", "monitor.garena.com", "mopub.com",
            "mx.gin.freefiremobile.com", "my.gin.freefiremobile.com", "na.gin.freefiremobile.com",
            "newrelic.com", "notify.bugsnag.com", "notify.freefiremobile.com", "notify.garena.com",
            "nz.gin.freefiremobile.com", "o.sentry.io", "oauth.garena.co.id", "oauth.garena.com",
            "oauth.garena.my", "oauth.garena.ph", "oauth.garena.sg", "oauth.garena.th", "oauth.garena.tw",
            "oauth.garena.vn", "oauth2.googleapis.com", "obs.freefiremobile.com", "pagead2.googlesyndication.com",
            "patch.freefiremobile.com", "patch.garena.co.id", "patch.garena.com", "patch.garena.ph",
            "patch.garena.vn", "pay.freefiremobile.com", "pay.garena.co.id", "pay.garena.com",
            "pay.garena.my", "pay.garena.ph", "pay.garena.sg", "pay.garena.th", "pay.garena.tw",
            "pay.garena.vn", "payment.garena.co.id", "payment.garena.com", "payment.garena.ph",
            "payment.garena.vn", "pe.gin.freefiremobile.com", "ph.gin.freefiremobile.com",
            "pk.gin.freefiremobile.com", "profile.freefiremobile.com", "profile.garena.com",
            "punish.freefiremobile.com", "punish.garena.com", "push.freefiremobile.com", "push.garena.com",
            "rank.freefiremobile.com", "rank.garena.com", "register.appsflyer.com", "report.freefiremobile.com",
            "report.garena.co.id", "report.garena.com", "report.garena.ph", "report.garena.vn",
            "reports.crashlytics.com", "resolver.freefiremobile.com", "resolver.garena.co.id",
            "resolver.garena.com", "resolver.garena.in", "resolver.garena.vn", "resource.freefiremobile.com",
            "resource.garena.com", "room.freefiremobile.com", "rt.applovin.com", "ru.gin.freefiremobile.com",
            "sa.gin.freefiremobile.com", "sac.gin.freefiremobile.com", "scan.freefiremobile.com",
            "scan.garena.com", "security.freefiremobile.com", "security.garena.co.id", "security.garena.com",
            "security.garena.in", "security.garena.ph", "security.garena.vn", "segment.io", "sentry.io",
            "session.adjust.com", "sessions.bugsnag.com", "settings.crashlytics.com", "sg.gin.freefiremobile.com",
            "shop.freefiremobile.com", "shop.garena.co.id", "shop.garena.com", "shop.garena.ph",
            "shop.garena.vn", "spectate.freefiremobile.com", "ssl.google-analytics.com", "sso.garena.co.id",
            "sso.garena.com", "sso.garena.my", "sso.garena.ph", "sso.garena.sg", "sso.garena.th",
            "sso.garena.tw", "sso.garena.vn", "stat.freefiremobile.com", "stat.garena.com",
            "static.freefiremobile.com", "static.garena.co.id", "static.garena.com", "static.garena.ph",
            "static.garena.vn", "status.freefiremobile.com", "store.garena.co.id", "store.garena.com",
            "store.garena.ph", "store.garena.vn", "stream.freefiremobile.com", "stream.garena.com",
            "support.garena.co.id", "support.garena.com", "support.garena.in", "support.garena.ph",
            "support.garena.vn", "suspend.freefiremobile.com", "suspend.garena.com", "t.appsflyer.com",
            "tapjoy.com", "telemetry.garena.co", "telemetry.garena.co.id", "telemetry.garena.com",
            "telemetry.garena.in", "telemetry.garena.my", "telemetry.garena.ph", "telemetry.garena.sg",
            "telemetry.garena.th", "telemetry.garena.tw", "telemetry.garena.vn", "th.gin.freefiremobile.com",
            "topup.garena.co.id", "topup.garena.com", "topup.garena.ph", "topup.garena.vn",
            "tournament.freefiremobile.com", "tournament.garena.com", "tpc.googlesyndication.com",
            "tr.gin.freefiremobile.com", "track.freefiremobile.com", "track.garena.co", "track.garena.co.id",
            "track.garena.com", "track.garena.in", "track.garena.my", "track.garena.ph", "track.garena.sg",
            "track.garena.th", "track.garena.tw", "track.garena.vn", "tw.gin.freefiremobile.com",
            "unityads.unity3d.com", "update.freefiremobile.com", "update.garena.co.id", "update.garena.com",
            "update.garena.ph", "update.garena.vn", "us.gin.freefiremobile.com", "video.freefiremobile.com",
            "vn.gin.freefiremobile.com", "voice.freefiremobile.com", "voice.garena.com", "vungle.com",
            "ws.tapjoyads.com", "www.ff.garena.com", "www.freefiremobile.com", "www.garena.co.id",
            "www.garena.com", "www.garena.my", "www.garena.ph", "www.garena.sg", "www.garena.th",
            "www.garena.tw", "www.garena.vn", "www.google-analytics.com"
          ],
          "action": "reject",
          "method": "default",
          "no_drop": true
        },
        {
          "domain": [
            "client.ind.freefiremobile.com",
            "client.advance.freefiremobile.com",
            "ff.rtc.grtc.garenanow.com",
            "ff.sdk.grtc.garenanow.com",
            "ff.dr.grtc.garenanow.com",
            "dl.cdn.freefiremobile.com",
            "dl.dir.freefiremobile.com",
            "dl.aw.freefiremobile.com",
            "dl.castle.freefiremobile.com",
            "dl.ctl.freefiremobile.com",
            "dl.ctlin.freefiremobile.com",
            "dl.cvs.freefiremobile.com",
            "dl.gmc.freefiremobile.com",
            "dl.gcp.freefiremobile.com",
            "dl.hw.freefiremobile.com",
            "dl.ks.freefiremobile.com",
            "cdn.garenanow.com",
            "dl.garenanow.com",
            "cdn.gxx.garenanow.com",
            "dl.hdltw.garenanow.com",
            "gin.freefiremobile.com",
            "common.freefiremobile.com"
          ],
          "action": "reject",
          "method": "default",
          "no_drop": true
        },
        {
          "ip_is_private": true,
          "action": "route",
          "outbound": "direct"
        }
      ],
      "final": "direct"
    },
    "experimental": {
      "cache_file": {
        "enabled": true
      }
    }
  };

  res.status(200).json(config);
}
