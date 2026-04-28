import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.25;
      meshRef.current.rotation.z = t * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.15;
      wireRef.current.rotation.y = t * 0.25;
      wireRef.current.rotation.z = t * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = t * 0.15;
      glowRef.current.rotation.y = t * 0.25;
      glowRef.current.rotation.z = t * 0.1;
      const scale = 1.15 + Math.sin(t * 2) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  const geo = useMemo(() => new THREE.IcosahedronGeometry(2, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Inner solid */}
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Wireframe edges */}
      <lineSegments ref={wireRef} geometry={edges}>
        <lineBasicMaterial
          color={hovered ? "#ff4444" : "#dc2626"}
          linewidth={1}
          transparent
          opacity={0.9}
        />
      </lineSegments>

      {/* Glow shell */}
      <mesh ref={glowRef} geometry={geo}>
        <meshBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#dc2626"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitingRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z = tilt;
      ringRef.current.rotation.y = t * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color="#dc2626" transparent opacity={0.3} />
    </mesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#dc2626" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff0000" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#dc2626"
        />

        <RotatingIcosahedron />
        <FloatingParticles />
        <OrbitingRing radius={3.2} speed={0.3} tilt={0.5} />
        <OrbitingRing radius={3.8} speed={-0.2} tilt={-0.3} />
        <OrbitingRing radius={4.2} speed={0.15} tilt={1.2} />

        <CameraRig />
      </Canvas>
    </div>
  );
}
