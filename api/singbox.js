export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const config = {
    "log": {
      "level": "warn",
      "timestamp": true
    },
    "dns": {
      "servers": [
        {
          "tag": "dns-local",
          "type": "local"
        },
        {
          "tag": "dns-remote",
          "type": "udp",
          "server": "8.8.8.8"
        }
      ],
      "rules": [
        {
          "domain_suffix": [
            "google.com",
            "gstatic.com",
            "googleapis.com",
            "apple.com",
            "icloud.com",
            "facebook.com",
            "fbcdn.net",
            "garena.com"
          ],
          "server": "dns-local"
        }
      ],
      "final": "dns-remote",
      "strategy": "prefer_ipv4"
    },
    "inbounds": [
      {
        "type": "tun",
        "tag": "tun-in",
        "address": [
          "172.19.0.1/30"
        ],
        "mtu": 1400,
        "auto_route": true,
        "strict_route": false,
        "stack": "gvisor",
        "endpoint_independent_nat": true,
        "route_exclude_address": [
          "127.0.0.0/8",
          "192.168.0.0/16",
          "224.0.0.0/4",
          "255.255.255.255/32"
        ]
      }
    ],
    "outbounds": [
      {
        "type": "direct",
        "tag": "direct"
      },
      {
        "type": "block",
        "tag": "block"
      }
    ],
    "route": {
      "auto_detect_interface": true,
      "default_domain_resolver": "dns-local",
      "rules": [
        {
          "protocol": "dns",
          "action": "hijack-dns"
        },
        /* ปล่อยทางผ่านระบบล็อกอินและตรวจสอบเน็ตของเครื่อง ไม่ให้เน็ตหลุด */
        {
          "domain": [
            "login.common.freefiremobile.com",
            "client.common.freefiremobile.com",
            "version.common.freefiremobile.com",
            "auth.garena.com",
            "accounts.google.com",
            "connectivitycheck.gstatic.com",
            "connectivitycheck.android.com",
            "captive.apple.com"
          ],
          "action": "route",
          "outbound": "direct"
        },
        {
          "domain_suffix": [
            "google.com",
            "gstatic.com",
            "googleusercontent.com",
            "apple.com",
            "facebook.com",
            "fbcdn.net"
          ],
          "action": "route",
          "outbound": "direct"
        },
        /* ดักจับและหน่วงแพ็กเก็ต Free Fire & Free Fire MAX ให้ปิง 999+ */
        {
          "domain": [
            "com.dts.freefireth",
            "com.dts.freefiremax",
            "com.dst.freefireth.singapore",
            "com.dst.freefireth.indonesia",
            "com.dst.freefireth.vn",
            "ff.data.garena.com",
            "ff.data.garena.singapore",
            "id.network.freefiremobile.com",
            "gin.freefiremobile.com",
            "dl.dir.freefiremobile.com",
            "100067.msdk.gopapi.io",
            "100067.connect.goapi.io",
            "ff.dr.grtc.garenanow.com",
            "com.garenanow.grtc.dr.ff"
          ],
          "domain_suffix": [
            "garenanow.com",
            "freefiremobile.com",
            "anticheatexpert.com",
            "appsflyer.com",
            "gopapi.io"
          ],
          "action": "reject",
          "method": "drop"
        },
        /* ป้องกันไอพีภายในบ้าน */
        {
          "ip_is_private": true,
          "action": "route",
          "outbound": "direct"
        }
      ],
      "final": "direct"
    }
  };

  res.status(200).json(config);
}
