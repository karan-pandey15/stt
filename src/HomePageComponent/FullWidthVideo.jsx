"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FullWidthVideo = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: "power3.out" }
    );
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 1, ease: "back.out(1.7)" }
    );
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        delay: 1.4,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.6)",
        }}
        src="/video/beautyVideo1.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Overlay content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
            marginBottom: "1rem",
          }}
        >
          StylishHim
        </h1>

        <p
          ref={descRef}
          style={{
            fontSize: "1.4rem",
            color: "#ddd",
            textShadow: "1px 1px 8px rgba(0,0,0,0.6)",
            maxWidth: "600px",
            marginBottom: "2rem",
          }}
        >
          Elevate your grooming routine with premium beauty products designed
          exclusively for men.
        </p>

        <button
          ref={buttonRef}
          style={{
            backgroundColor: "#fff",
            color: "#111",
            border: "none",
            padding: "0.8rem 2rem",
            borderRadius: "30px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Shop Now
        </button>

        {/* Feature Highlights */}
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "Natural Ingredients 🌿",
            "Dermatologist Approved 💧",
            "Cruelty-Free 🐰",
            "Made in India 🇮🇳",
          ].map((feature, i) => (
            <span
              key={i}
              ref={(el) => (featuresRef.current[i] = el)}
              style={{
                fontSize: "1rem",
                color: "#eee",
                background: "rgba(255,255,255,0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
              }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullWidthVideo;
