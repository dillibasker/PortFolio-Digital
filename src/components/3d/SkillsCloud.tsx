import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SkillsCloud: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate a spherical pattern of positions
  const skillPositions = useMemo(() => {
    const skills = [
      'React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 
      'TypeScript', 'GraphQL', 'MongoDB', 'Next.js', 'Three.js',
      'Express', 'Tailwind', 'Git', 'Webpack', 'Firebase'
    ];
    
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 6;

      return {
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ] as [number, number, number],
        speed: Math.random() * 0.01 + 0.005,
        rotationSpeed: Math.random() * 0.02 + 0.01,
        pulseSpeed: Math.random() * 2 + 1,
        color: `hsl(${(i * 20) % 360}, 70%, 70%)`
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate entire group
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;

      // Individual cube animations
      groupRef.current.children.forEach((child, i) => {
        const data = skillPositions[i];
        child.rotation.x += data.rotationSpeed;
        child.rotation.y += data.rotationSpeed * 0.8;
        
        // Pulse effect
        const scale = 1 + Math.sin(time * data.pulseSpeed) * 0.1;
        child.scale.setScalar(scale);

        // Update material properties
        const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (material) {
          material.emissiveIntensity = 0.2 + Math.sin(time * data.pulseSpeed) * 0.1;
          material.opacity = 0.7 + Math.sin(time * data.pulseSpeed) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {skillPositions.map((data, i) => (
        <mesh key={i} position={data.position}>
          {i % 3 === 0 ? (
            <octahedronGeometry args={[1]} />
          ) : i % 3 === 1 ? (
            <boxGeometry args={[1.2, 1.2, 1.2]} />
          ) : (
            <icosahedronGeometry args={[0.8]} />
          )}
          <meshStandardMaterial
            color={data.color}
            metalness={0.5}
            roughness={0.2}
            transparent
            opacity={0.8}
            emissive={data.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default SkillsCloud;