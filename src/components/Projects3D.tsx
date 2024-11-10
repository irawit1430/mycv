import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ProjectCard({ position, image, index }: { position: [number, number, number], image: string, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5 + index) * 0.1;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() + index) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 1.5, 0.1]} />
      <meshStandardMaterial color="#4f46e5" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

const projects = [
  {
    position: [-4, 0, 0],
    image: '/project1.jpg'
  },
  {
    position: [0, 0, 0],
    image: '/project2.jpg'
  },
  {
    position: [4, 0, 0],
    image: '/project3.jpg'
  }
];

export default function Projects3D() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <color attach="background" args={['#111827']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            position={project.position as [number, number, number]}
            image={project.image}
            index={index}
          />
        ))}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}