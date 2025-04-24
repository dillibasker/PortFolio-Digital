import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Since we don't have a real GLTF model to load, we'll create a simple 3D avatar
export function AvatarModel({ ...props }) {
  const group = useRef<THREE.Group>(null!);
  
  // Simulate breathing animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f8d5c0" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 1, 16, 16]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.7, 16, 16]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.7, 16, 16]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.2, -0.5, 0]}>
        <capsuleGeometry args={[0.12, 0.8, 16, 16]} />
        <meshStandardMaterial color="#1e1b4b" />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.2, -0.5, 0]}>
        <capsuleGeometry args={[0.12, 0.8, 16, 16]} />
        <meshStandardMaterial color="#1e1b4b" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 1.6, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 1.6, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Laptop */}
      <mesh position={[0, 0.9, 0.3]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.02]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 0.73, 0.17]} rotation={[-Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.4, 0.25, 0.02]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
}