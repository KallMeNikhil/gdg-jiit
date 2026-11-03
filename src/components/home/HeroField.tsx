"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertex = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerForce;
  uniform float uScroll;
  uniform float uAspect;
  uniform float uPx;
  attribute float aLine;
  attribute float aOffset;
  attribute float aWidth;
  attribute float aSide;
  attribute float aLayer;
  varying float vLine;
  varying float vAlpha;
  varying float vX;
  varying float vSide;
  varying float vHeat;
  varying float vLayer;

  float wave(vec3 p) {
    float n = sin(p.x * 1.7 + p.z * 0.9 + p.y * 3.1) * 0.5;
    n += sin(p.x * 3.3 - p.z * 1.3 + p.y * 5.7) * 0.25;
    n += sin(p.x * 0.8 + p.z * 0.6 - p.y * 2.3) * 0.35;
    n += sin(p.x * 6.1 + p.z * 1.9 + p.y * 1.7) * 0.08;
    return n;
  }

  void main() {
    vec3 pos = position;
    float t = uTime * mix(0.2, 0.11, aLayer) + uScroll * mix(1.6, 0.8, aLayer);
    float base = pos.y;
    float edge = smoothstep(0.05, 1.0, abs(pos.x));
    float amp = 0.05 + 0.14 * edge;
    pos.y += wave(vec3(pos.x + aOffset, base, t)) * amp;
    pos.y -= uScroll * (0.3 + aLine * 0.4) * sign(pos.x) * 0.4;

    vec2 d = vec2((pos.x - uPointer.x) * uAspect, pos.y - uPointer.y);
    float dist = length(d);
    float heat = exp(-dist * dist * 7.0) * uPointerForce * mix(1.0, 0.35, aLayer);
    pos.y += sign(d.y + 0.0001) * heat * 0.16;

    float swell = 0.7 + 0.6 * (0.5 + 0.5 * sin(pos.x * 2.6 + aOffset * 6.0 + uTime * 0.5));
    float width = aWidth * mix(1.0, 2.6, aLayer) * swell * (1.0 + heat * 2.2);
    pos.y += aSide * width * uPx;

    vLine = aLine;
    vX = pos.x;
    vSide = aSide;
    vHeat = heat;
    vLayer = aLayer;
    float fadeX = 1.0 - smoothstep(1.05, 1.4, abs(pos.x));
    float centre = mix(0.3, 1.0, smoothstep(0.08, 0.75, abs(pos.x)));
    vAlpha = fadeX * centre * (1.0 - uScroll * 0.85);
    gl_Position = vec4(pos.x, pos.y, 0.0, 1.0);
  }
`;

const fragment = `
  uniform vec3 uBlue;
  uniform vec3 uRed;
  uniform vec3 uYellow;
  uniform vec3 uGreen;
  uniform float uTime;
  varying float vLine;
  varying float vAlpha;
  varying float vX;
  varying float vSide;
  varying float vHeat;
  varying float vLayer;

  vec3 palette(float k) {
    k = fract(k);
    vec3 c = mix(uBlue, uRed, smoothstep(0.0, 0.25, k));
    c = mix(c, uYellow, smoothstep(0.25, 0.5, k));
    c = mix(c, uGreen, smoothstep(0.5, 0.75, k));
    return mix(c, uBlue, smoothstep(0.75, 1.0, k));
  }

  void main() {
    float k = vLine * 4.0 + vX * 0.12;
    vec3 c = palette(k);
    vec3 shifted = palette(k + 0.25 + vX * 0.4 + uTime * 0.05);
    c = mix(c, shifted, clamp(vHeat * 1.4, 0.0, 1.0));
    c += vec3(1.0) * vHeat * 0.25;
    float s2 = vSide * vSide;
    float soft = 0.5 * exp(-s2 * 16.0) + 0.17 * exp(-s2 * 2.2);
    float bright = (0.55 + 0.45 * smoothstep(0.05, 0.9, abs(vX)) + vHeat * 0.8) * mix(1.0, 0.42, vLayer);
    gl_FragColor = vec4(c, vAlpha * bright * soft);
  }
`;

function softwareRenderer() {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl");
    if (!gl) return true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|software|basic render/i.test(name);
  } catch {
    return true;
  }
}

export function HeroField({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const degrade = () => {
      const id = requestAnimationFrame(() => setFallback(true));
      return () => cancelAnimationFrame(id);
    };
    if (softwareRenderer()) return degrade();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return degrade();
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const small = window.innerWidth < 768;
    const lines = small ? 46 : 92;
    const points = small ? 90 : 160;
    const positions: number[] = [];
    const lineAttr: number[] = [];
    const offsets: number[] = [];
    const widths: number[] = [];
    const sides: number[] = [];
    const layers: number[] = [];
    const indices: number[] = [];
    let vertexCount = 0;
    for (let l = 0; l < lines; l++) {
      const y = -0.95 + (l / (lines - 1)) * 1.9;
      const offset = Math.random() * 2;
      const r = Math.random();
      const layer = l % 3 === 0 ? 1 : 0;
      const width = r < 0.2 ? 18 + Math.random() * 16 : r < 0.6 ? 9 + Math.random() * 7 : 4 + Math.random() * 4;
      const start = vertexCount;
      for (let p = 0; p < points; p++) {
        const x = -1.4 + (p / (points - 1)) * 2.8;
        for (const side of [-1, 1]) {
          positions.push(x, y, 0);
          lineAttr.push(l / lines);
          offsets.push(offset);
          widths.push(width);
          sides.push(side);
          layers.push(layer);
          vertexCount += 1;
        }
        if (p < points - 1) {
          const a = start + p * 2;
          indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("aLine", new THREE.Float32BufferAttribute(lineAttr, 1));
    geometry.setAttribute("aOffset", new THREE.Float32BufferAttribute(offsets, 1));
    geometry.setAttribute("aWidth", new THREE.Float32BufferAttribute(widths, 1));
    geometry.setAttribute("aSide", new THREE.Float32BufferAttribute(sides, 1));
    geometry.setAttribute("aLayer", new THREE.Float32BufferAttribute(layers, 1));
    geometry.setIndex(indices);

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(10, 10) },
      uPointerForce: { value: 0 },
      uScroll: { value: 0 },
      uAspect: { value: 1 },
      uPx: { value: 0.002 },
      uBlue: { value: new THREE.Color("#4285f4") },
      uRed: { value: new THREE.Color("#ea4335") },
      uYellow: { value: new THREE.Color("#fbbc04") },
      uGreen: { value: new THREE.Color("#34a853") },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const sparkCount = small ? 60 : 140;
    const sparkPos: number[] = [];
    const sparkSeed: number[] = [];
    for (let i = 0; i < sparkCount; i++) {
      sparkPos.push(Math.random() * 2.6 - 1.3, Math.random() * 2.2 - 1.1, 0);
      sparkSeed.push(Math.random());
    }
    const sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute("position", new THREE.Float32BufferAttribute(sparkPos, 3));
    sparkGeometry.setAttribute("aSeed", new THREE.Float32BufferAttribute(sparkSeed, 1));
    const sparkMaterial = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uPointer;
        uniform float uAspect;
        attribute float aSeed;
        varying float vSeed;
        varying float vTwinkle;
        void main() {
          vec3 p = position;
          p.y = mod(p.y + 1.1 + uTime * (0.012 + aSeed * 0.02) + uScroll * 0.4, 2.2) - 1.1;
          p.x += sin(uTime * 0.3 + aSeed * 40.0) * 0.02;
          vec2 d = vec2((p.x - uPointer.x) * uAspect, p.y - uPointer.y);
          float near = exp(-dot(d, d) * 6.0);
          vTwinkle = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(uTime * (1.2 + aSeed * 2.5) + aSeed * 30.0), 3.0) + near;
          vSeed = aSeed;
          float centre = smoothstep(0.1, 0.6, abs(p.x));
          gl_PointSize = (2.0 + aSeed * 4.5) * (1.0 + near * 1.5) * mix(0.5, 1.0, centre);
          gl_Position = vec4(p.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uBlue;
        uniform vec3 uRed;
        uniform vec3 uYellow;
        uniform vec3 uGreen;
        uniform float uScroll;
        varying float vSeed;
        varying float vTwinkle;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          float a = smoothstep(0.5, 0.0, d);
          float idx = floor(vSeed * 4.0);
          vec3 col = idx < 1.0 ? uBlue : idx < 2.0 ? uRed : idx < 3.0 ? uYellow : uGreen;
          col = mix(col, vec3(1.0), smoothstep(0.18, 0.0, d) * 0.7);
          gl_FragColor = vec4(col, a * vTwinkle * 0.8 * (1.0 - uScroll * 0.9));
        }
      `,
    });
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
    scene.add(sparks);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      uniforms.uAspect.value = width / Math.max(height, 1);
      uniforms.uPx.value = 1 / Math.max(height, 1);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const coarse = !window.matchMedia("(pointer: fine)").matches;
    const target = new THREE.Vector2(10, 10);
    let force = 0;
    const aim = (x: number, y: number) => {
      const r = host.getBoundingClientRect();
      target.set(((x - r.left) / r.width) * 2 - 1, -(((y - r.top) / r.height) * 2 - 1));
      force = 1;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      aim(e.clientX, e.clientY);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const fresh = force === 0;
      aim(t.clientX, t.clientY);
      if (fresh) uniforms.uPointer.value.copy(target);
    };
    const onLeave = () => {
      force = 0;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!e.touches.length) force = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let slow = 0;
    let frames = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden || document.documentElement.dataset.intro === "play") return;
      frames += 1;
      if (frames < 120 && dt > 0.045) slow += 1;
      if (frames === 120 && slow > 70) {
        cancelAnimationFrame(raf);
        setFallback(true);
        return;
      }
      elapsed += dt;
      uniforms.uTime.value = elapsed;
      uniforms.uPointer.value.lerp(target, coarse ? 0.12 : 0.08);
      uniforms.uPointerForce.value += (force - uniforms.uPointerForce.value) * 0.05;
      const rect = host.getBoundingClientRect();
      uniforms.uScroll.value = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      renderer.render(scene, camera);
    };

    if (reduced) {
      uniforms.uTime.value = 4;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onLost = (e: Event) => {
      e.preventDefault();
      setFallback(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      geometry.dispose();
      sparkGeometry.dispose();
      sparkMaterial.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {fallback ? (
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_40%,rgba(66,133,244,0.28),transparent_70%),radial-gradient(40%_40%_at_90%_70%,rgba(234,67,53,0.18),transparent_70%)]" />
      ) : (
        <div ref={hostRef} className="absolute inset-0" />
      )}
    </div>
  );
}
