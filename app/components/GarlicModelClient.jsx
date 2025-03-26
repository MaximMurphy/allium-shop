// Client-only 3D component
// Only imported dynamically on the client side to prevent server errors

import {useRef, useState, useEffect} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, useGLTF} from '@react-three/drei';

// GLTF model loader component
function GarlicModel(props) {
  const groupRef = useRef();
  const rotationRef = useRef({
    time: 0,
    // Slower cycle (back and forth)
    cycleDuration: 8,
    // Starting rotation to avoid visible jumps
    rotationY: 0,
    rotationX: 0,
    // Add Z rotation for additional twisting
    rotationZ: 0,
  });

  // Use consistent path for the GLB file
  const modelPath = '/3d-model.glb';
  const {scene} = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Update the time counter with smaller increments to ensure smoothness
      rotationRef.current.time += delta;

      // Use modulo operation to keep the time within the cycle duration
      // but don't reset suddenly - just keep the remainder
      const cycleTime =
        rotationRef.current.time % rotationRef.current.cycleDuration;

      // Calculate progress through the animation cycle - using sine for smooth oscillation
      const progress =
        (cycleTime / rotationRef.current.cycleDuration) * Math.PI * 2;

      // Calculate side-to-side wobble (horizontal rotation around Y axis)
      // Increased wobble amount for more intensity
      const horizontalWobbleAmount = 0.5; // Increased from 0.35 for more twist
      rotationRef.current.rotationY =
        Math.sin(progress) * horizontalWobbleAmount;

      // Calculate up-and-down wobble (vertical rotation around X axis)
      // Modified to allow tilting both forward and backward
      const verticalWobbleAmount = 0.2; // Increased from 0.12 for more intensity
      // Offset the sine wave to make it tilt both forward and backward
      // Instead of oscillating around 0, it will oscillate around -0.05
      rotationRef.current.rotationX =
        Math.sin(progress * 0.9) * verticalWobbleAmount - 0.05;

      // Add Z-axis rotation (twisting) for more dynamic movement
      const twistAmount = 0.15;
      // Using a different frequency for more natural combined movement
      rotationRef.current.rotationZ = Math.sin(progress * 1.2) * twistAmount;

      // Apply the calculated rotations
      groupRef.current.rotation.y = rotationRef.current.rotationY;
      groupRef.current.rotation.x = rotationRef.current.rotationX;
      groupRef.current.rotation.z = rotationRef.current.rotationZ;
    }
  });

  return (
    <group {...props} ref={groupRef} scale={0.55}>
      {/* Use the scene directly without cloning, which can cause issues */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <primitive object={scene} />
    </group>
  );
}

// Preload the model with the same consistent path
useGLTF.preload('/3d-model.glb');

// Client-side 3D canvas component
function GarlicCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{position: [30, 0, 30], fov: 45}}
      style={{background: 'transparent'}}
    >
      {/* Enhanced lighting setup */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} />
      <directionalLight position={[0, 10, 0]} intensity={1.2} />
      <directionalLight position={[0, -10, 0]} intensity={0.8} />

      <GarlicModel position={[0, 0, 0]} />

      <OrbitControls makeDefault minDistance={100} maxDistance={100} />
    </Canvas>
  );
}

// Export the client-side component with client-side detection
export default function GarlicModelClient() {
  const [isClient, setIsClient] = useState(false);

  // Only run on client side after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-full w-full bg-transparent rounded-lg">
      {isClient ? (
        <GarlicCanvas />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-allium-cream text-2xl">Loading 3D Model...</div>
        </div>
      )}
    </div>
  );
}
