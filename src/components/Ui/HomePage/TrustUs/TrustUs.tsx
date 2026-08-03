import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";

const TrustUs = () => {
  return (
    <div className="bg-surface-1 py-16">
         <div className="">
          <div className="w-40 h-[3px] mx-auto relative">
            {/* Enhanced Top Glow Layer */}
            <div
              className="absolute -top-5 left-0 right-0 h-10 blur-2xl opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, #630e36, #9d1556, #be1a68, #d71d76, #e54390, #d71d76, #be1a68, #9d1556, #630e36)",
                borderRadius: "999px",
                animation: "glowWave 3s ease-in-out infinite",
              }}
            ></div>

            {/* Main Border with Enhanced Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #630e36, #9d1556, #be1a68, #d71d76, #e54390)",
                boxShadow: `
          0 0 20px 4px rgba(190, 26, 104, 0.7),
          0 -6px 25px rgba(215, 29, 118, 0.9),
          inset 0 0 8px rgba(255, 255, 255, 0.4)
        `,
              }}
            >
              {/* Pulsing Core with Wave Effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  animation: "pulseWave 2.5s ease-in-out infinite",
                  filter: "blur(0.5px)",
                }}
              ></div>
            </div>

            {/* Left 3 Dots - Moved Further Left */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center space-x-3">
              {[0, 0.15, 0.3].map((delay, i) => (
                <div
                  key={`left-${i}`}
                  className="w-[6px] h-[6px] rounded-full relative"
                  style={{
                    animation: `dotFloat 2s ease-in-out infinite ${delay}s`,
                  }}
                >
                  {/* Dot Core */}
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  {/* Dot Glow */}
                  <div
                    className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-70 animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  ></div>
                  {/* Outer Glow Ring */}
                  <div
                    className="absolute -inset-1 border border-white/30 rounded-full animate-ping"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Right 3 Dots - Moved Further Right */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center space-x-3">
              {[0.1, 0.25, 0.4].map((delay, i) => (
                <div
                  key={`right-${i}`}
                  className="w-[6px] h-[6px] rounded-full relative"
                  style={{
                    animation: `dotFloat 2s ease-in-out infinite ${delay}s`,
                  }}
                >
                  {/* Dot Core */}
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  {/* Dot Glow */}
                  <div
                    className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-70 animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  ></div>
                  {/* Outer Glow Ring */}
                  <div
                    className="absolute -inset-1 border border-white/30 rounded-full animate-ping"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Additional Sparkle Effects */}
            <div className="absolute inset-0 overflow-visible">
              {/* Random sparkles along the line */}
              {[0.2, 0.5, 0.8].map((position, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="absolute w-[2px] h-[2px] bg-white rounded-full blur-[1px] animate-ping"
                  style={{
                    left: `${position * 100}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${i * 0.3}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      <div className=" relative min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: 'url("/images/d11.avif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/50"></div>

          {/* Optional Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        {/* Content */}
        <ZoomIn className="relative z-10 text-center px-6 py-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            <span className="bg-linear-to-r from-red-300 via-red-500 to-red-600 bg-clip-text text-transparent">
              You scrolled so far.
            </span>
            <br />
            <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              You want this. Trust us.
            </span>
          </h1>

          {/* Optional Glowing Underline */}
          {/* <div className="mt-8 mx-auto w-48 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div> */}
        </ZoomIn>


      </div>

      
        <div className="">
          <div className="w-40 h-[3px] mx-auto relative">
            {/* Enhanced Top Glow Layer */}
            <div
              className="absolute -top-5 left-0 right-0 h-10 blur-2xl opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, #630e36, #9d1556, #be1a68, #d71d76, #e54390, #d71d76, #be1a68, #9d1556, #630e36)",
                borderRadius: "999px",
                animation: "glowWave 3s ease-in-out infinite",
              }}
            ></div>

            {/* Main Border with Enhanced Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #630e36, #9d1556, #be1a68, #d71d76, #e54390)",
                boxShadow: `
          0 0 20px 4px rgba(190, 26, 104, 0.7),
          0 -6px 25px rgba(215, 29, 118, 0.9),
          inset 0 0 8px rgba(255, 255, 255, 0.4)
        `,
              }}
            >
              {/* Pulsing Core with Wave Effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  animation: "pulseWave 2.5s ease-in-out infinite",
                  filter: "blur(0.5px)",
                }}
              ></div>
            </div>

            {/* Left 3 Dots - Moved Further Left */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center space-x-3">
              {[0, 0.15, 0.3].map((delay, i) => (
                <div
                  key={`left-${i}`}
                  className="w-[6px] h-[6px] rounded-full relative"
                  style={{
                    animation: `dotFloat 2s ease-in-out infinite ${delay}s`,
                  }}
                >
                  {/* Dot Core */}
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  {/* Dot Glow */}
                  <div
                    className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-70 animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  ></div>
                  {/* Outer Glow Ring */}
                  <div
                    className="absolute -inset-1 border border-white/30 rounded-full animate-ping"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Right 3 Dots - Moved Further Right */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center space-x-3">
              {[0.1, 0.25, 0.4].map((delay, i) => (
                <div
                  key={`right-${i}`}
                  className="w-[6px] h-[6px] rounded-full relative"
                  style={{
                    animation: `dotFloat 2s ease-in-out infinite ${delay}s`,
                  }}
                >
                  {/* Dot Core */}
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  {/* Dot Glow */}
                  <div
                    className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-70 animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  ></div>
                  {/* Outer Glow Ring */}
                  <div
                    className="absolute -inset-1 border border-white/30 rounded-full animate-ping"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Additional Sparkle Effects */}
            <div className="absolute inset-0 overflow-visible">
              {/* Random sparkles along the line */}
              {[0.2, 0.5, 0.8].map((position, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="absolute w-[2px] h-[2px] bg-white rounded-full blur-[1px] animate-ping"
                  style={{
                    left: `${position * 100}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${i * 0.3}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default TrustUs;
