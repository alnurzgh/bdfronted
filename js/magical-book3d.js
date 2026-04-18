// ============================================
// MAGICAL LIBRARY - CINEMATIC 3D BOOK ANIMATION
// ============================================
// Three.js + GLSL Shaders + GSAP Timeline
// Curved pages with cloth simulation, golden light, particles

class MagicalBook3D {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('Canvas not found:', canvasId);
      return;
    }

    // State
    this.isAnimating = false;
    this.clock = new THREE.Clock();

    // Initialize
    this.initScene();
    this.setupLights();
    this.createLibraryEnvironment();
    this.createMagicalBook();
    this.createParticleSystem();
    this.setupCamera();
    
    // Start render loop
    this.animate();
    
    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  // ============================================
  // SCENE INITIALIZATION
  // ============================================

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x1a0e05, 10, 50);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
  }

  setupCamera() {
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;
    
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 3, 8);
    this.camera.lookAt(0, 0, 0);
  }

  // ============================================
  // LIGHTING SETUP
  // ============================================

  setupLights() {
    // Warm ambient light (library atmosphere)
    this.ambientLight = new THREE.AmbientLight(0xd4880a, 0.15);
    this.scene.add(this.ambientLight);

    // Fairy lights (warm glow)
    this.fairyLights = [];
    for (let i = 0; i < 5; i++) {
      const light = new THREE.PointLight(0xffb347, 0.3, 15);
      light.position.set(
        (Math.random() - 0.5) * 20,
        5 + Math.random() * 2,
        -5 + Math.random() * 2
      );
      this.fairyLights.push(light);
      this.scene.add(light);
    }

    // Golden point light inside book (starts at 0)
    this.goldenLight = new THREE.PointLight(0xffb347, 0, 8);
    this.goldenLight.position.set(0, 0.2, 0);
    this.goldenLight.castShadow = true;
    this.goldenLight.shadow.mapSize.width = 2048;
    this.goldenLight.shadow.mapSize.height = 2048;
    this.scene.add(this.goldenLight);

    // Rim light (dramatic effect)
    const rimLight = new THREE.DirectionalLight(0xd4880a, 0.4);
    rimLight.position.set(-5, 3, -3);
    this.scene.add(rimLight);
  }

  // ============================================
  // LIBRARY ENVIRONMENT
  // ============================================

  createLibraryEnvironment() {
    // Wooden table
    const tableGeometry = new THREE.CylinderGeometry(4, 4, 0.15, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1810,
      roughness: 0.7,
      metalness: 0.1
    });
    this.table = new THREE.Mesh(tableGeometry, tableMaterial);
    this.table.position.y = -0.5;
    this.table.receiveShadow = true;
    this.scene.add(this.table);

    // Bookshelves (simple geometry in background)
    const shelfMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a0e05,
      roughness: 0.9
    });
    
    for (let i = 0; i < 3; i++) {
      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(15, 8, 1),
        shelfMaterial
      );
      shelf.position.set(0, 2, -8 - i * 2);
      shelf.receiveShadow = true;
      this.scene.add(shelf);
    }
  }

  // ============================================
  // MAGICAL BOOK WITH CURVED PAGES
  // ============================================

  createMagicalBook() {
    this.bookGroup = new THREE.Group();

    // GLSL Shader for parchment pages
    this.parchmentShader = {
      uniforms: {
        time: { value: 0 },
        lightIntensity: { value: 0 },
        goldenGlow: { value: new THREE.Color(0xffb347) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Subtle wave effect for cloth simulation
          vec3 pos = position;
          pos.z += sin(pos.x * 2.0 + time) * 0.02;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float lightIntensity;
        uniform vec3 goldenGlow;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Parchment base color
          vec3 parchment = vec3(0.96, 0.90, 0.78);
          
          // Torn edges effect
          float edge = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
          edge *= smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
          
          // Texture variation
          float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
          parchment *= 0.95 + noise * 0.1;
          
          // Golden glow from light
          vec3 glow = goldenGlow * lightIntensity * 0.5;
          
          // Combine
          vec3 finalColor = parchment + glow;
          
          gl_FragColor = vec4(finalColor, edge);
        }
      `
    };

    // Cover material (leather)
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1810,
      roughness: 0.85,
      metalness: 0.15,
      normalScale: new THREE.Vector2(0.5, 0.5)
    });

    // Create book covers
    const coverGeometry = new THREE.BoxGeometry(3.5, 5, 0.1);
    
    // Front cover (will rotate)
    this.frontCoverGroup = new THREE.Group();
    this.frontCoverGroup.position.set(-1.75, 0, 0);
    
    this.frontCover = new THREE.Mesh(coverGeometry, coverMaterial);
    this.frontCover.position.x = 1.75;
    this.frontCover.position.z = 0.3;
    this.frontCover.castShadow = true;
    this.frontCover.receiveShadow = true;
    
    this.frontCoverGroup.add(this.frontCover);
    this.bookGroup.add(this.frontCoverGroup);

    // Back cover (static)
    this.backCover = new THREE.Mesh(coverGeometry, coverMaterial);
    this.backCover.position.set(0, 0, -0.3);
    this.backCover.castShadow = true;
    this.backCover.receiveShadow = true;
    this.bookGroup.add(this.backCover);

    // Spine
    const spineGeometry = new THREE.BoxGeometry(0.2, 5, 0.6);
    this.spine = new THREE.Mesh(spineGeometry, coverMaterial);
    this.spine.position.set(-1.75, 0, 0);
    this.spine.castShadow = true;
    this.bookGroup.add(this.spine);

    // Create curved pages with shader material
    this.pages = [];
    const pageCount = 60;
    
    for (let i = 0; i < pageCount; i++) {
      const pageGroup = new THREE.Group();
      pageGroup.position.set(-1.75, 0, 0.25 - (i * 0.01));
      
      // Curved page geometry (subdivided for bending)
      const pageGeometry = new THREE.PlaneGeometry(3.4, 4.8, 20, 20);
      
      const pageMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(this.parchmentShader.uniforms),
        vertexShader: this.parchmentShader.vertexShader,
        fragmentShader: this.parchmentShader.fragmentShader,
        side: THREE.DoubleSide,
        transparent: true
      });
      
      const pageMesh = new THREE.Mesh(pageGeometry, pageMaterial);
      pageMesh.position.x = 1.7;
      pageMesh.rotation.y = Math.PI / 2;
      pageMesh.castShadow = true;
      pageMesh.receiveShadow = true;
      
      pageGroup.add(pageMesh);
      pageGroup.userData.material = pageMaterial;
      pageGroup.userData.delay = i * 0.02;
      
      this.pages.push(pageGroup);
      this.bookGroup.add(pageGroup);
    }

    // Position book on table
    this.bookGroup.position.y = -0.35;
    this.bookGroup.rotation.x = -Math.PI / 2;
    
    this.scene.add(this.bookGroup);
  }

  // ============================================
  // PARTICLE SYSTEM (DUST & LIGHT SPARKS)
  // ============================================

  createParticleSystem() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 6 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: 0.01 + Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.01
      });
      
      sizes[i] = Math.random() * 0.15 + 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0xffb347,
      size: 0.1,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(geometry, material);
    this.particleVelocities = velocities;
    this.scene.add(this.particles);
  }

  // ============================================
  // GSAP ANIMATION TIMELINE
  // ============================================

  playOpeningAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false;
      }
    });

    // Animate golden light intensity
    tl.to(this.goldenLight, {
      intensity: 8,
      duration: 2,
      ease: "power2.inOut"
    }, 0);

    // Animate ambient light
    tl.to(this.ambientLight, {
      intensity: 0.4,
      duration: 2.5,
      ease: "power2.out"
    }, 0);

    // Animate fairy lights
    this.fairyLights.forEach((light, i) => {
      tl.to(light, {
        intensity: 0.8,
        duration: 1.5,
        ease: "power2.out"
      }, i * 0.1);
    });

    // Open front cover
    tl.to(this.frontCoverGroup.rotation, {
      y: -Math.PI * 0.55,
      duration: 2.5,
      ease: "power2.inOut"
    }, 0.3);

    // Open pages with stagger
    this.pages.forEach((pageGroup, i) => {
      const delay = 0.5 + pageGroup.userData.delay;
      
      tl.to(pageGroup.rotation, {
        y: -Math.PI * 0.5 * (0.8 + Math.random() * 0.4),
        duration: 1.8,
        ease: "power2.out"
      }, delay);

      // Animate page shader
      tl.to(pageGroup.userData.material.uniforms.lightIntensity, {
        value: 1,
        duration: 1.5,
        ease: "power2.out"
      }, delay + 0.5);
    });

    // Animate particles
    tl.to(this.particles.material, {
      opacity: 0.6,
      duration: 1.5,
      ease: "power2.out"
    }, 1);

    // Camera movement
    tl.to(this.camera.position, {
      y: 2.5,
      z: 7,
      duration: 3,
      ease: "power2.inOut"
    }, 0);

    return tl;
  }

  // ============================================
  // ANIMATION LOOP
  // ============================================

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    // Update shader time
    this.pages.forEach(pageGroup => {
      pageGroup.userData.material.uniforms.time.value = elapsed;
    });

    // Animate particles
    if (this.particles.material.opacity > 0) {
      const positions = this.particles.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += this.particleVelocities[i].x;
        positions[i * 3 + 1] += this.particleVelocities[i].y;
        positions[i * 3 + 2] += this.particleVelocities[i].z;

        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = -1;
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
      }
      
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // Pulse golden light
    if (this.goldenLight.intensity > 0) {
      this.goldenLight.intensity = 8 + Math.sin(elapsed * 2) * 0.5;
    }

    this.renderer.render(this.scene, this.camera);
  }

  // ============================================
  // WINDOW RESIZE
  // ============================================

  onWindowResize() {
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Export
window.MagicalBook3D = MagicalBook3D;
