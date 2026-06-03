import { useEffect, useRef } from 'react';

export default function ThreeBackground({ theme }) {
  const mountRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (!mountRef.current) return;

      const isLight = theme === 'light';
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // Scene + Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 6;

      // Geometry types
      const geoTypes = [
        new THREE.IcosahedronGeometry(0.35, 0),
        new THREE.OctahedronGeometry(0.35, 0),
        new THREE.TetrahedronGeometry(0.4, 0),
        new THREE.IcosahedronGeometry(0.25, 1),
        new THREE.OctahedronGeometry(0.2, 0),
      ];

      const colors = [
        0x22d3ee, // cyan
        0xa78bfa, // purple
        0xf472b6, // pink
        0x60a5fa, // blue
        0x34d399, // green
      ];

      const meshes = [];

      for (let i = 0; i < 14; i++) {
        const geo = geoTypes[i % geoTypes.length];
        const color = colors[i % colors.length];

        const mat = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: isLight ? 0.08 : 0.14,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5 - 2,
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        );
        mesh.userData = {
          rx: (Math.random() - 0.5) * 0.008,
          ry: (Math.random() - 0.5) * 0.008,
          rz: (Math.random() - 0.5) * 0.004,
          floatAmp: Math.random() * 0.004 + 0.001,
          floatOffset: Math.random() * Math.PI * 2,
          baseY: mesh.position.y,
        };

        scene.add(mesh);
        meshes.push(mesh);
      }

      // Particle system
      const particleCount = 80;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: 0.03,
        transparent: true,
        opacity: isLight ? 0.2 : 0.4,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Mouse tracking
      let mouse = { x: 0, y: 0 };
      let targetCam = { x: 0, y: 0 };

      const onMouse = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5);
        mouse.y = -(e.clientY / window.innerHeight - 0.5);
      };
      window.addEventListener('mousemove', onMouse, { passive: true });

      // Resize
      const onResize = () => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener('resize', onResize);

      // Animation loop
      let frameId;
      let time = 0;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        time += 0.01;

        // Smooth camera parallax
        targetCam.x += (mouse.x * 0.5 - targetCam.x) * 0.04;
        targetCam.y += (mouse.y * 0.3 - targetCam.y) * 0.04;
        camera.position.x = targetCam.x;
        camera.position.y = targetCam.y;
        camera.lookAt(scene.position);

        // Animate meshes
        meshes.forEach((mesh, i) => {
          mesh.rotation.x += mesh.userData.rx;
          mesh.rotation.y += mesh.userData.ry;
          mesh.rotation.z += mesh.userData.rz;
          mesh.position.y =
            mesh.userData.baseY +
            Math.sin(time + mesh.userData.floatOffset) * mesh.userData.floatAmp * 30;
        });

        // Rotate particles slowly
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;

        renderer.render(scene, camera);
      };

      animate();

      stateRef.current = { renderer, frameId, meshes };

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        if (mountRef.current && renderer.domElement) {
          try { mountRef.current.removeChild(renderer.domElement); } catch (e) {}
        }
        renderer.dispose();
        geoTypes.forEach(g => g.dispose());
        particleGeo.dispose();
        particleMat.dispose();
      };
    });

    return () => cleanup();
  }, [theme]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}