export default function Home() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: "-10rem 0rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1100px",
          width: "100%",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        
        <div style={{ flex: "1", minWidth: "280px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "1.5rem",
              lineHeight: "1.3",
            }}
          >
            Connect instantly. Share effortlessly.
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            Our social media app brings your friends, stories, and
            conversations together in one beautiful and simple space.
            Stay close to what matters most.
          </p>

          <button
            style={{
              backgroundColor: "#06b6d4",
              color: "white",
              border: "none",
              padding: "0.9rem 2.2rem",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(6,182,212,0.3)",
              transition: "0.3s",
            }}
          >
            Get Started
          </button>
        </div>

        
        <div style={{ flex: "1", textAlign: "center", minWidth: "280px" }}>
          <img
            src="/img.png"
            alt="App preview"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              border: "6px solid #e0f7fa",
            }}
          />
        </div>
      </div>
    </main>
  );
}