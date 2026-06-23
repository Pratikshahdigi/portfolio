"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface FunnelStage {
  name: string;
  metric: string;
  desc: string;
  color: string;
}

export default function MarketingFunnel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages: FunnelStage[] = [
    { name: "Awareness", metric: "SEO Organic Growth", desc: "+50% Search Traffic Spikes", color: "hsl(200, 100%, 55%)" },
    { name: "Interest", metric: "Paid Campaigns (PPC)", desc: "5L+ Monthly Ad Spend Managed", color: "hsl(265, 100%, 65%)" },
    { name: "Decision", metric: "Lead Funnels & CRO", desc: "-25% Lower Customer Cost (CPL)", color: "hsl(325, 100%, 60%)" },
    { name: "Action & ROI", metric: "High-Ticket Conversions", desc: "3.5x average ROI booking spikes", color: "hsl(24, 100%, 55%)" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // --- Scene setup ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Materials and Group ---
    const funnelGroup = new THREE.Group();
    scene.add(funnelGroup);

    // Funnel Rings (Cylinder Wireframes)
    const stageColors = [
      new THREE.Color("hsl(200, 100%, 50%)"), // Cyan
      new THREE.Color("hsl(265, 100%, 60%)"), // Purple
      new THREE.Color("hsl(325, 100%, 55%)"), // Pink
      new THREE.Color("hsl(24, 100%, 55%)"),  // Orange
    ];

    const cylinders: THREE.Mesh[] = [];

    // Stage dimensions (topRadius, bottomRadius, height, Y-position)
    const stageSpecs = [
      { top: 1.8, bottom: 1.4, h: 0.5, y: 1.5 },
      { top: 1.3, bottom: 0.9, h: 0.5, y: 0.5 },
      { top: 0.8, bottom: 0.5, h: 0.5, y: -0.5 },
      { top: 0.4, bottom: 0.15, h: 0.5, y: -1.5 },
    ];

    stageSpecs.forEach((spec, index) => {
      const geometry = new THREE.CylinderGeometry(spec.top, spec.bottom, spec.h, 24, 1, true);
      const material = new THREE.MeshBasicMaterial({
        color: stageColors[index],
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = spec.y;
      funnelGroup.add(mesh);
      cylinders.push(mesh);
    });

    // --- Particle Stream (The Clicks / Leads) ---
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    interface ParticleState {
      y: number;
      speed: number;
      angle: number;
      rotSpeed: number;
    }

    const particles: ParticleState[] = [];

    for (let i = 0; i < particleCount; i++) {
      const y = Math.random() * 3.6 - 1.8; // Random Y position within the funnel height
      const speed = 0.01 + Math.random() * 0.02;
      const angle = Math.random() * Math.PI * 2;
      const rotSpeed = 0.02 + Math.random() * 0.04;

      particles.push({ y, speed, angle, rotSpeed });

      // Determine radius based on current Y coordinate
      // Y ranges from +1.8 to -1.8
      const t = (1.8 - y) / 3.6; // normalized Y 0 to 1
      const currentRadius = 1.9 * (1 - t) + 0.18 * t;

      particlePositions[i * 3] = currentRadius * Math.sin(angle);
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = currentRadius * Math.cos(angle);

      // Assign color based on height/stage
      let colorIndex = 0;
      if (y > 1.0) colorIndex = 0;
      else if (y > 0.0) colorIndex = 1;
      else if (y > -1.0) colorIndex = 2;
      else colorIndex = 3;

      const c = stageColors[colorIndex];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Glow points bokeh canvas texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: particleTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeom, particleMat);
    funnelGroup.add(particlePoints);

    // --- Interactive Mouse Handlers ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      mouseRef.current.x = x * 0.5;
      mouseRef.current.y = y * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let frameId: number;
    let timer = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      timer += 0.01;

      // 1. Slow general rotation
      funnelGroup.rotation.y = timer * 0.35;

      // 2. Interactive parallax tilt
      funnelGroup.rotation.x += (mouseRef.current.y - funnelGroup.rotation.x) * 0.08;
      funnelGroup.rotation.z += (-mouseRef.current.x - funnelGroup.rotation.z) * 0.08;

      // 3. Funnel mesh scale pulse (staggered highlights)
      cylinders.forEach((cyl, idx) => {
        const pulse = 1.0 + Math.sin(timer * 2.5 - idx * 0.8) * 0.03;
        cyl.scale.set(pulse, 1, pulse);
        // Stage color intensifier pulse
        const mat = cyl.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.3 + Math.sin(timer * 2.5 - idx * 0.8) * 0.15;
      });

      // 4. Animate leads flowing downwards
      const posAttr = particleGeom.attributes.position.array as Float32Array;
      const colorAttr = particleGeom.attributes.color.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move down
        p.y -= p.speed;
        p.angle += p.rotSpeed;

        // Reset to top if below threshold
        if (p.y < -1.8) {
          p.y = 1.8;
          p.angle = Math.random() * Math.PI * 2;
        }

        // Calculate radius contraction
        const t = (1.8 - p.y) / 3.6;
        const currentRadius = 1.9 * (1 - t) + 0.18 * t;

        posAttr[i * 3] = currentRadius * Math.sin(p.angle);
        posAttr[i * 3 + 1] = p.y;
        posAttr[i * 3 + 2] = currentRadius * Math.cos(p.angle);

        // Update colors based on current height
        let colorIdx = 0;
        if (p.y > 1.0) colorIdx = 0;
        else if (p.y > 0.0) colorIdx = 1;
        else if (p.y > -1.0) colorIdx = 2;
        else colorIdx = 3;

        const c = stageColors[colorIdx];
        colorAttr[i * 3] = c.r;
        colorAttr[i * 3 + 1] = c.g;
        colorAttr[i * 3 + 2] = c.b;
      }

      particleGeom.attributes.position.needsUpdate = true;
      particleGeom.attributes.color.needsUpdate = true;

      // 5. Update stage highlight state in React
      const rotationAngle = (funnelGroup.rotation.y % (Math.PI * 2));
      const activeIdx = Math.floor((timer * 0.25) % stages.length);
      setActiveStage(activeIdx);

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize handler ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Clean up WebGL resources
      cylinders.forEach((cyl) => {
        cyl.geometry.dispose();
        (cyl.material as THREE.Material).dispose();
      });
      particleGeom.dispose();
      particleMat.dispose();
      particleTex.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", width: "100%", alignItems: "center" }}>
      {/* 3D WebGL Canvas container */}
      <div 
        ref={containerRef} 
        style={{ 
          position: "relative", 
          width: "100%", 
          height: "450px", 
          background: "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)", 
          borderRadius: "20px", 
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.02)",
          overflow: "hidden" 
        }} 
      />

      {/* Interactive HUD Overlay for stages */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {stages.map((stage, i) => {
          const isActive = activeStage === i;
          return (
            <div
              key={stage.name}
              style={{
                background: isActive ? "rgba(255, 255, 255, 0.03)" : "transparent",
                border: "1px solid",
                borderColor: isActive ? stage.color : "rgba(255, 255, 255, 0.04)",
                padding: "1.2rem",
                borderRadius: "12px",
                transition: "all 0.4s ease",
                boxShadow: isActive ? `0 0 20px ${stage.color}15` : "none",
                transform: isActive ? "translateX(10px) scale(1.02)" : "translateX(0) scale(1)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                <h4 style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: 700, 
                  color: isActive ? stage.color : "var(--fg-color)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em" 
                }}>
                  {stage.name}
                </h4>
                <span style={{ 
                  fontSize: "0.8rem", 
                  fontWeight: 600, 
                  backgroundColor: isActive ? stage.color : "rgba(255,255,255,0.05)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "20px",
                  color: isActive ? "#000" : "var(--text-subtle)"
                }}>
                  Stage {i + 1}
                </span>
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--fg-color)", marginBottom: "0.2rem" }}>
                {stage.metric}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 300 }}>
                {stage.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
