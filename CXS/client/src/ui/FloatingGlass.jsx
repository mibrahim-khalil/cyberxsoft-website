import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/*
 * Floating glass shards — a small WebGL scene that echoes the
 * crystalline artwork used across the site. Camera drifts with the
 * pointer and dollies with scroll; everything pauses off-screen.
 */

const PRESETS = {
  hero: [
    { shape: "box", pos: [3.3, -1.55, 1.0], size: 1.45, color: "#6cc4ff", edge: "#a9f5dc", core: true, speed: 0.55, amp: 0.18, spin: [0.12, 0.2, 0.05] },
    { shape: "octa", pos: [0.5, -2.15, 2.2], size: 0.62, color: "#62e8a6", edge: "#d5ffe8", speed: 0.8, amp: 0.22, spin: [0.2, 0.34, 0.1] },
    { shape: "ico", pos: [4.6, 0.7, -1.2], size: 0.62, color: "#79b8ff", edge: "#c3e9ff", speed: 0.65, amp: 0.2, spin: [0.18, -0.24, 0.12] },
    { shape: "ring", pos: [1.0, 2.0, -1.6], size: 0.85, color: "#7fdcf0", edge: "#d7fbff", speed: 0.5, amp: 0.16, spin: [0.3, 0.16, 0] },
    { shape: "box", pos: [4.2, 2.4, 0.8], size: 0.42, color: "#52e08f", edge: "#d5ffe8", speed: 0.9, amp: 0.25, spin: [0.34, 0.4, 0.2] },
  ],
  soft: [
    { shape: "octa", pos: [3.6, 0.7, 0.2], size: 0.9, color: "#62e8a6", edge: "#c8ffe2", core: true, speed: 0.55, amp: 0.2, spin: [0.14, 0.26, 0.06] },
    { shape: "box", pos: [2.3, -1.2, 1.2], size: 0.5, color: "#6cc4ff", edge: "#b7ecff", speed: 0.8, amp: 0.2, spin: [0.2, 0.3, 0.1] },
    { shape: "ring", pos: [4.8, 1.9, -1], size: 0.6, color: "#7fdcf0", edge: "#d7fbff", speed: 0.6, amp: 0.16, spin: [0.28, 0.14, 0] },
    { shape: "bead", pos: [1.7, 1.4, 2], size: 0.24, color: "#a6e8ff", edge: null, speed: 1, amp: 0.26, spin: [0, 0, 0] },
  ],
};

function makeGeometry(shape, size) {
  switch (shape) {
    case "box":
      return new THREE.BoxGeometry(size, size, size);
    case "octa":
      return new THREE.OctahedronGeometry(size * 0.8, 0);
    case "ico":
      return new THREE.IcosahedronGeometry(size * 0.8, 0);
    case "tetra":
      return new THREE.TetrahedronGeometry(size * 0.9, 0);
    case "ring":
      return new THREE.TorusGeometry(size * 0.8, size * 0.07, 24, 96);
    case "bead":
    default:
      return new THREE.SphereGeometry(size, 40, 40);
  }
}

export default function FloatingGlass({ preset = "hero", intensity = 1 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const isSmall = window.innerWidth < 760;
    const defs = PRESETS[preset].slice(0, isSmall ? 4 : undefined);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
    camera.position.set(0, 0, 9);

    // Coloured accent lights give the glass its blue / green tint
    const blueLight = new THREE.PointLight(0x3b9de6, 40, 24, 1.6);
    blueLight.position.set(-2, 3, 5);
    const greenLight = new THREE.PointLight(0x52e08f, 34, 24, 1.6);
    greenLight.position.set(6, -3, 4);
    scene.add(blueLight, greenLight);

    const group = new THREE.Group();
    scene.add(group);

    const disposables = [];
    const items = defs.map((def, index) => {
      const geometry = makeGeometry(def.shape, def.size);
      const material = new THREE.MeshPhysicalMaterial({
        color: def.color,
        metalness: 0.08,
        roughness: 0.07,
        transparent: true,
        opacity: def.shape === "bead" ? 0.4 : 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.9 * intensity,
        ior: 1.5,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...def.pos);
      mesh.rotation.set(index * 0.7, index * 1.1, index * 0.3);
      group.add(mesh);
      disposables.push(geometry, material);

      if (def.edge) {
        const edges = new THREE.EdgesGeometry(geometry, 28);
        const lineMat = new THREE.LineBasicMaterial({
          color: def.edge,
          transparent: true,
          opacity: 0.95,
        });
        const lines = new THREE.LineSegments(edges, lineMat);
        mesh.add(lines);
        disposables.push(edges, lineMat);
      }

      if (def.core) {
        const coreGeo = new THREE.SphereGeometry(def.size * 0.04, 24, 24);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffc66b });
        const core = new THREE.Mesh(coreGeo, coreMat);
        const haloGeo = new THREE.SphereGeometry(def.size * 0.15, 24, 24);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xffc86b,
          transparent: true,
          opacity: 0.14,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        mesh.add(core, halo);
        disposables.push(coreGeo, coreMat, haloGeo, haloMat);
      }

      return {
        mesh,
        base: new THREE.Vector3(...def.pos),
        phase: index * 1.7,
        ...def,
      };
    });

    /* ---------- state ---------- */
    const mouse = { x: 0, y: 0 };
    let scrollP = 0;
    let visible = true;
    let running = true;
    let frame = 0;
    const timer = new THREE.Timer();

    const onPointer = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const layout = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // On tall / narrow screens pull the cluster toward the centre
      if (camera.aspect < 1) {
        group.position.x = -1.7;
        group.position.y = 2.0;
        group.scale.setScalar(0.62);
      } else if (camera.aspect < 1.4) {
        group.position.x = -0.7;
        group.position.y = 0;
        group.scale.setScalar(0.85);
      } else {
        group.position.x = 0;
        group.position.y = 0;
        group.scale.setScalar(1);
      }
      camera.updateProjectionMatrix();
    };
    layout();

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(mount);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const section = mount.closest("[data-scene-root]") || mount.parentElement;

    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible || !running) return;

      timer.update();
      const t = timer.getElapsed();

      const rect = section.getBoundingClientRect();
      scrollP = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height, 1), 0, 1);

      items.forEach((item) => {
        item.mesh.position.y = item.base.y + Math.sin(t * item.speed + item.phase) * item.amp;
        item.mesh.position.x = item.base.x + Math.cos(t * item.speed * 0.6 + item.phase) * item.amp * 0.5;
        item.mesh.rotation.x += item.spin[0] * 0.01;
        item.mesh.rotation.y += item.spin[1] * 0.01;
        item.mesh.rotation.z += item.spin[2] * 0.01;
      });

      // Camera drifts with the pointer and dollies with scroll
      camera.position.x += (mouse.x * 0.75 - camera.position.x) * 0.045;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.045;
      camera.position.z += (9 - scrollP * 3.2 - camera.position.z) * 0.08;
      camera.lookAt(0, 0, 0);

      group.rotation.y += (scrollP * 0.9 - group.rotation.y) * 0.06;
      group.rotation.x += (scrollP * 0.25 - group.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      io.disconnect();
      disposables.forEach((d) => d.dispose());
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [preset, intensity]);

  return <div ref={mountRef} className="glass3d__mount" />;
}
