"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleData {
  baseX: number;
  baseY: number;
  baseZ: number;
  angleX: number;
  angleY: number;
  speedY: number;
  oscSpeedX: number;
  oscRangeX: number;
  oscSpeedZ: number;
  oscRangeZ: number;
}

export default function CinematicLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Camera with deep depth field
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Dynamic Texture Generation (Circular Glow/Bokeh) ---
    const createBokehTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      return new THREE.CanvasTexture(canvas);
    };

    const bokehTexture = createBokehTexture();

    // --- Particle System Generation ---
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const particlesData: ParticleData[] = [];

    // Define colors: Warm oranges, glowing soft white/amber
    const colorOrange = new THREE.Color("hsl(24, 100%, 55%)");
    const colorWhite = new THREE.Color("hsl(35, 100%, 95%)");

    for (let i = 0; i < particleCount; i++) {
      // Wide dispersion
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8; // Depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color mix (70% orange, 30% soft white/amber)
      const isOrange = Math.random() < 0.7;
      const finalColor = isOrange ? colorOrange : colorWhite;
      
      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;

      // Random sizes (dreamy bokeh looks best with varying large/small particles)
      sizes[i] = Math.random() * 0.4 + 0.1;

      particlesData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2,
        speedY: 0.005 + Math.random() * 0.012, // Rising speed
        oscSpeedX: 0.001 + Math.random() * 0.003,
        oscRangeX: 0.2 + Math.random() * 0.5,
        oscSpeedZ: 0.001 + Math.random() * 0.003,
        oscRangeZ: 0.1 + Math.random() * 0.4,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom points material using vertex colors & blending
    const material = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      map: bokehTexture || undefined,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Subtle Ambient Light to give a depth feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // --- Interaction / Mouse Tracking ---
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // 1. Slow rising and waving animation of individual particles
      const positionsArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const data = particlesData[i];

        // Increment phase angles
        data.angleX += data.oscSpeedX * 60 * delta;
        data.angleY += data.speedY * 60 * delta;

        // Rise upwards
        data.baseY += data.speedY * 60 * delta;

        // Wave motion on X and Z axis
        const xOffset = Math.sin(data.angleX) * data.oscRangeX;
        const zOffset = Math.cos(data.angleX) * data.oscRangeZ;

        // Reset if particles float past the top
        if (data.baseY > 6) {
          data.baseY = -6;
          data.baseX = (Math.random() - 0.5) * 16;
        }

        positionsArray[i * 3] = data.baseX + xOffset;
        positionsArray[i * 3 + 1] = data.baseY;
        positionsArray[i * 3 + 2] = data.baseZ + zOffset;
      }

      geometry.attributes.position.needsUpdate = true;

      // 2. Slow general rotation of the particle system
      points.rotation.y = time * 0.015;
      points.rotation.x = time * 0.005;

      // 3. Smooth Camera Parallax LERP
      const targetCamX = mouseRef.current.x * 1.5;
      const targetCamY = mouseRef.current.y * 1.0;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup / Resource Disposal ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Verify and dispose of all WebGL resources properly
      geometry.dispose();
      material.dispose();
      if (bokehTexture) bokehTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none", // Allows interacting with buttons below it
        mixBlendMode: "screen", // Cinematic overlay blending
      }}
    />
  );
}
