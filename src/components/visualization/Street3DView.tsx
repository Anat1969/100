import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Street3DViewProps {
  walkwayWidth: number;
  slope: number;
  shadePercentage: number;
}

export function Street3DView({ walkwayWidth, slope, shadePercentage }: Street3DViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const streetGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb3e5fc);
    sceneRef.current = scene;

    // Camera
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sunLight.position.set(2, 3, 2);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Street group (will contain all street elements)
    const streetGroup = new THREE.Group();
    sceneRef.current.add(streetGroup);
    streetGroupRef.current = streetGroup;

    // Function to update street
    const updateStreet = () => {
      // Clear previous street
      while (streetGroup.children.length > 0) {
        streetGroup.remove(streetGroup.children[0]);
      }

      const walkwayM = walkwayWidth / 100; // Convert cm to meters for display
      const slopeRad = (slope / 100) * (Math.PI / 180); // slope percentage to radians

      // Ground plane (street)
      const groundGeometry = new THREE.PlaneGeometry(6, 8);
      const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.receiveShadow = true;
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0;
      streetGroup.add(ground);

      // Walkway
      const walkwayGeometry = new THREE.BoxGeometry(walkwayM, 0.05, 8);
      const walkwayMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const walkway = new THREE.Mesh(walkwayGeometry, walkwayMaterial);
      walkway.castShadow = true;
      walkway.receiveShadow = true;
      walkway.rotation.z = slopeRad;
      walkway.position.set(-1.5, 0.05, 0);
      streetGroup.add(walkway);

      // Building (right side)
      const buildingGeometry = new THREE.BoxGeometry(1, 2, 8);
      const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.castShadow = true;
      building.position.set(2, 1, 0);
      streetGroup.add(building);

      // Trees for shade
      const treeCount = Math.ceil((8 / 2) * (shadePercentage / 100));
      for (let i = 0; i < treeCount; i++) {
        const z = -3 + (i * 8) / Math.max(treeCount - 1, 1);

        // Tree trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.15, 0.2, 2, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.castShadow = true;
        trunk.position.set(-2.5, 1, z);
        streetGroup.add(trunk);

        // Tree canopy (sphere for shade)
        const canopyGeometry = new THREE.SphereGeometry(1.2, 16, 16);
        const canopyMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
        const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
        canopy.castShadow = true;
        canopy.position.set(-2.5, 2.5, z);
        streetGroup.add(canopy);
      }

      // Benches along walkway
      for (let i = 0; i < 3; i++) {
        const z = -2 + i * 2;

        // Bench seat
        const benchGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.4);
        const benchMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7355 });
        const bench = new THREE.Mesh(benchGeometry, benchMaterial);
        bench.castShadow = true;
        bench.position.set(-1.5, 0.35, z);
        streetGroup.add(bench);

        // Bench legs
        for (let leg of [-0.15, 0.15]) {
          const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8);
          const leg_mesh = new THREE.Mesh(legGeometry, benchMaterial);
          leg_mesh.position.set(-1.5 + leg, 0.15, z);
          leg_mesh.castShadow = true;
          streetGroup.add(leg_mesh);
        }
      }
    };

    updateStreet();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [walkwayWidth, slope, shadePercentage]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '500px' }} />;
}
