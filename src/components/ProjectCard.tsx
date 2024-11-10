import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  position: [number, number, number];
}

export default function ProjectCard({ title, description, image, position }: ProjectCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(image, (texture) => {
    texture.needsUpdate = true;
  });

  if (!texture) {
    return null;
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Text
        position={[0, -1, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.1}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {description}
      </Text>
    </group>
  );
}