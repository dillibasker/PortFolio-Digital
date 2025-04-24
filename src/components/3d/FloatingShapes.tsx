import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingShapes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Create more interesting shapes with varied geometries
  const shapes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    position: [
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 10 - 15,
    ],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
    scale: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.05 + 0.01,
    rotationSpeed: Math.random() * 0.02 + 0.005,
    type: Math.floor(Math.random() * 5), // More shape varieties
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
    pulseSpeed: Math.random() * 2 + 1,
  }));

  // Enhanced animation with more dynamic movements
  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const shape = shapes[i];
      const time = state.clock.getElapsedTime();

      // Complex movement pattern
      child.position.y += Math.sin(time * shape.speed) * 0.01;
      child.position.x += Math.cos(time * shape.speed * 0.5) * 0.005;
      
      // Rotation with varying speeds
      child.rotation.x += shape.rotationSpeed;
      child.rotation.y += shape.rotationSpeed * 0.8;
      child.rotation.z += shape.rotationSpeed * 0.5;

      // Scale pulsing
      child.scale.setScalar(
        shape.scale * (1 + Math.sin(time * shape.pulseSpeed) * 0.1)
      );

      // Update material properties
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        material.opacity = 0.6 + Math.sin(time * shape.pulseSpeed) * 0.2;
        material.emissiveIntensity = 0.2 + Math.sin(time * shape.pulseSpeed) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <mesh
          key={shape.id}
          position={shape.position as [number, number, number]}
          rotation={shape.rotation as [number, number, number]}
          scale={shape.scale}
        >
          {/* Different geometry types */}
          {shape.type === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : shape.type === 1 ? (
            <sphereGeometry args={[0.8, 32, 32]} />
          ) : shape.type === 2 ? (
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
          ) : shape.type === 3 ? (
            <octahedronGeometry args={[0.8]} />
          ) : (
            <icosahedronGeometry args={[0.8]} />
          )}
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={0.6}
            metalness={0.5}
            roughness={0.2}
            emissive={shape.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingShapes;