import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AnimatedTorusKnot: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Complex rotation
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.z = time * 0.2;

      // Pulsing scale
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);

      // Animate material properties
      materialRef.current.emissiveIntensity = 0.2 + Math.sin(time * 1.5) * 0.1;
      materialRef.current.metalness = 0.5 + Math.sin(time) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#8b5cf6"
        metalness={0.5}
        roughness={0.2}
        emissive="#4c1d95"
        emissiveIntensity={0.2}
      />
      
      {/* Add glowing particles around the torus knot */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i) * 2,
            Math.cos(i) * 2,
            Math.sin(i * 2) * 2
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#4c1d95"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </mesh>
  );
};