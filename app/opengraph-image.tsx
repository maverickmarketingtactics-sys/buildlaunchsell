import { ImageResponse } from "next/og";

export const alt = "Real price on call one. Working product in 48 hours.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F4EF",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 7,
              height: 36,
            }}
          >
            <div
              style={{
                width: 12,
                height: 16,
                borderRadius: 6,
                background: "#4F46E5",
              }}
            />
            <div
              style={{
                width: 12,
                height: 25,
                borderRadius: 6,
                background: "#4F46E5",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 12,
                height: 36,
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div style={{ height: "30%", background: "#22D3EE" }} />
              <div style={{ height: "70%", background: "#4F46E5" }} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#0B1220",
              letterSpacing: 0.2,
              fontWeight: 600,
            }}
          >
            BuildLaunchSell
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 600,
            color: "#0B1220",
            maxWidth: 960,
          }}
        >
          Real price on call one. Working product in 48 hours.
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#5C6570" }}>
          $0 proposal · $2,900 refundable · 48-hour working version
        </div>
      </div>
    ),
    size,
  );
}
