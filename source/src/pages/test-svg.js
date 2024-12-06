export default function TestSVG() {
  const testSticker = {
    color: "rgba(156, 39, 176, 0.9)",
    text: "Test",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SVG Test</h1>
      <div style={{ display: "grid", gap: "20px" }}>
        <div>
          <h2>Inline SVG</h2>
          <div style={{ width: "100px", height: "100px" }}>
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="8" fill={testSticker.color} />
              <text
                x="32"
                y="36"
                fontFamily="Arial"
                fontSize="12"
                fill="white"
                textAnchor="middle"
              >
                {testSticker.text}
              </text>
            </svg>
          </div>
        </div>

        <div>
          <h2>Current Approach</h2>
          <div
            style={{ width: "100px", height: "100px", position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: "2px",
                left: "2px",
                width: "calc(100% - 4px)",
                height: "calc(100% - 4px)",
                backgroundColor: testSticker.color,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
              }}
            >
              {testSticker.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
