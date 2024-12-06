export default function TestSVG() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>SVG Test</h1>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        }}
      >
        {[
          "/themes/vscodePurple/mac/command.svg",
          "/themes/vscodePurple/mac/copy.svg",
          "/themes/vscodePurple/mac/paste.svg",
        ].map((src) => (
          <div
            key={src}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <img
              src={src}
              alt={src.split("/").pop()}
              style={{ width: "100%", aspectRatio: "1" }}
              onError={(e) => {
                console.error(`Failed to load: ${src}`);
                e.target.style.backgroundColor = "#ffebee";
              }}
              onLoad={() => console.log(`Loaded: ${src}`)}
            />
            <div
              style={{
                fontSize: "12px",
                marginTop: "5px",
                wordBreak: "break-all",
              }}
            >
              {src}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
