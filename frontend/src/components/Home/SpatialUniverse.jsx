import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass } from 'lucide-react';

export default function SpatialUniverse() {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 45;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Group for nodes
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Node data representing task items
    const nodesData = [
      { id: 1, name: 'Aether Core', val: 3.5, color: '#EF2F29', x: -12, y: 8, z: 2 },
      { id: 2, name: 'Quantum Testing', val: 2.8, color: '#ff6b4a', x: 12, y: -6, z: -4 },
      { id: 3, name: 'Obsidian Database', val: 4.0, color: '#ffa940', x: 2, y: -10, z: 8 },
      { id: 4, name: 'Nexus Engine', val: 3.0, color: '#b21b16', x: -8, y: -4, z: -10 },
      { id: 5, name: 'Lumina Interface', val: 2.5, color: '#c93b1d', x: 8, y: 10, z: 6 },
    ];

    const spheres = [];
    const geometriesToDispose = [];
    const materialsToDispose = [];

    // Create spheres for nodes
    nodesData.forEach((data) => {
      // Geometry
      const geometry = new THREE.SphereGeometry(data.val * 0.7, 32, 32);
      geometriesToDispose.push(geometry);
      
      // Wireframe Material to give premium tech holographic aesthetic
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      materialsToDispose.push(material);

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(data.x, data.y, data.z);
      sphere.userData = { id: data.id, name: data.name };
      
      networkGroup.add(sphere);
      spheres.push(sphere);

      // Create an inner solid glowing core
      const coreGeom = new THREE.SphereGeometry(data.val * 0.25, 16, 16);
      geometriesToDispose.push(coreGeom);

      const coreMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color),
        transparent: true,
        opacity: 0.9,
      });
      materialsToDispose.push(coreMat);

      const core = new THREE.Mesh(coreGeom, coreMat);
      sphere.add(core);
    });

    // Create connection lines between nodes representing task dependencies
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xef2f29,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const linePoints = [];
    // Connect each node with its subsequent nodes to form a dependency mesh
    for (let i = 0; i < nodesData.length; i++) {
      for (let j = i + 1; j < nodesData.length; j++) {
        linePoints.push(new THREE.Vector3(nodesData[i].x, nodesData[i].y, nodesData[i].z));
        linePoints.push(new THREE.Vector3(nodesData[j].x, nodesData[j].y, nodesData[j].z));
      }
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(lines);

    // Dust particles floating in ambient space
    const particlesCount = 80;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      dustPositions[i] = (Math.random() - 0.5) * 60;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.4,
      color: 0xffa940,
      transparent: true,
      opacity: 0.5,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    networkGroup.add(dust);

    // Interaction vars
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      // Mouse coordinates relative to container center
      mouseX = ((event.clientX - rect.left) / width - 0.5) * 4;
      mouseY = ((event.clientY - rect.top) / height - 0.5) * 4;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(containerRef.current);

    // Animation loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow orbital rotate
      networkGroup.rotation.y = elapsedTime * 0.08;
      
      // Node independent breathing rotation
      spheres.forEach((sphere, index) => {
        sphere.rotation.x = elapsedTime * 0.2 + index;
        sphere.rotation.y = elapsedTime * 0.1;
      });

      // Mouse responsive camera drag lag
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 10;
      camera.position.y = -targetY * 10;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Node hovering effect simulated via setInterval to avoid full raycasting lag
    const interval = setInterval(() => {
      const randomNode = nodesData[Math.floor(Math.random() * nodesData.length)];
      setActiveNode(randomNode);
    }, 4000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
      resizeObserver.disconnect();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometriesToDispose.forEach(g => g.dispose());
      materialsToDispose.forEach(m => m.dispose());
      lineGeometry.dispose();
      lineMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="showcase" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-surface-lowest/40 border-y border-white/5 reveal reveal-scale-in">
      
      {/* ThreeJS Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Interface overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between pointer-events-none gap-12">
        
        {/* Left Side: Glowing Glassmorphic Showcase Control Panel */}
        <div className="max-w-xl glass-card p-8 md:p-10 rounded-[2.5rem] border-white/15 backdrop-blur-3xl pointer-events-auto flex flex-col gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit text-primary font-mono text-[10px] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            3D Spatial Universe
          </div>

          <h2 className="font-display font-extrabold text-3.5xl md:text-4.5xl text-white tracking-tight leading-tight">
            Experience the Future of Productivity
          </h2>

          <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
            Harness the power of AI-driven spatial computing. Our neural interface visualizes complex project structures in multi-dimensional space, turning data lists into navigable action paths.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-gradient-to-r from-primary to-secondary text-[#050505] px-7 py-3.5 rounded-xl font-sans font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/10">
              Explore Spatial Mode
            </button>
            <button className="text-white border border-white/10 hover:border-white/25 hover:bg-white/5 px-7 py-3.5 rounded-xl font-sans font-bold text-sm transition-all duration-300">
              Learn More
            </button>
          </div>

        </div>

        {/* Right Side: Active Node Hologram Panel */}
        {activeNode && (
          <div className="glass-card p-6 rounded-2.5xl border-white/25 backdrop-blur-3xl pointer-events-auto w-64 shadow-[0_15px_30px_rgba(0,0,0,0.4)] animate-pulse relative z-10 self-end lg:self-center transition-all duration-1000">
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-tertiary" />
            <span className="text-[9px] text-on-surface-variant font-mono uppercase tracking-widest block mb-1">Hologram Focus</span>
            <div className="font-display font-extrabold text-lg text-white mb-3" style={{ color: activeNode.color }}>
              {activeNode.name}
            </div>
            
            <div className="space-y-2 font-sans text-xs">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-on-surface-variant">Cluster node:</span>
                <span className="text-white font-mono">{activeNode.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-on-surface-variant">Priority:</span>
                <span className="text-white font-bold" style={{ color: activeNode.color }}>CRITICAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Sync velocity:</span>
                <span className="text-white font-mono">98.4 GB/s</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
