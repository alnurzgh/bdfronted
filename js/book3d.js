// ============================================
// 3D BOOK ANIMATION WITH THREE.JS
// ============================================
// Realistic 3D book that opens to 180° with white light and particles

class Book3D {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('Canvas not found:', canvasId);
      return;
    }

    // State
    this.isAnimating = false;
    this.particlesActive = false;

    // Initialize Three.js
    this.initScene();
    this.setupLights();
    this.createBook();
    this.createParticles();
    this.setupCamera();
    
    // Start render loop
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  initScene() {
    // Scene
    this.scene = new THREE.Scene();

    // Renderer
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
  }

  setupCamera() {
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;
    
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    // Camera at 45° angle (isometric view)
    this.camera.position.set(0, 8, 10);
    this.camera.lookAt(0, 0, 0);
  }

  // ============================================
  // LIGHTING
  // ============================================

  setupLights() {
    // Ambient light (general illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Directional light (main light source)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(directionalLight);

    // Point light (white glow effect - starts at 0)
    this.whiteLight = new THREE.PointLight(0xffffff, 0, 10);
    this.whiteLight.position.set(0, 0, 0);
    this.scene.add(this.whiteLight);
  }

  // ============================================
  // 3D BOOK CREATION
  // ============================================

  createBook() {
    this.bookGroup = new THREE.Group();

    // Materials
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1810,
      roughness: 0.8,
      metalness: 0.1
    });

    const spineMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a0f08,
      roughness: 0.9,
      metalness: 0.05
    });

    const pageMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      roughness: 0.7,
      metalness: 0
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8dcc8,
      roughness: 0.8,
      metalness: 0
    });

    // === LEFT COVER GROUP (opens to the left) ===
    this.leftCoverGroup = new THREE.Group();
    this.leftCoverGroup.position.set(-2.15, 0, 0);  // Pivot at spine
    
    // Front Cover
    const coverGeometry = new THREE.BoxGeometry(4, 6, 0.1);
    this.frontCover = new THREE.Mesh(coverGeometry, coverMaterial);
    this.frontCover.position.x = 2;  // Shift right from pivot
    this.frontCover.position.z = 0.5;  // OUTSIDE pages (was 0.15)
    this.frontCover.castShadow = true;
    this.frontCover.receiveShadow = true;
    
    // Spine (part of left cover)
    const spineGeometry = new THREE.BoxGeometry(0.3, 6, 0.1);
    this.spine = new THREE.Mesh(spineGeometry, spineMaterial);
    this.spine.position.x = 0;  // At pivot
    this.spine.castShadow = true;
    this.spine.receiveShadow = true;
    
    this.leftCoverGroup.add(this.frontCover);
    this.leftCoverGroup.add(this.spine);
    this.bookGroup.add(this.leftCoverGroup);

    // === BACK COVER (doesn't move) ===
    this.backCover = new THREE.Mesh(coverGeometry, coverMaterial);
    this.backCover.position.set(0, 0, -0.5);  // OUTSIDE pages (was -0.15)
    this.backCover.castShadow = true;
    this.backCover.receiveShadow = true;
    this.bookGroup.add(this.backCover);

    // === PAGES (split: 40 left + 40 right) ===
    this.leftPages = [];  // Pages that open with the cover (left)
    this.rightPages = [];  // Pages that open to the right
    const pageGeometry = new THREE.BoxGeometry(3.9, 5.9, 0.02);
    
    // LEFT PAGES (40 pages) - open with the cover to the LEFT
    for (let i = 0; i < 40; i++) {
      // Create group for page (pivot at spine)
      const pageGroup = new THREE.Group();
      pageGroup.position.set(-2.15, 0, 0.4 - (i * 0.01));  // Stack from top
      
      // Create page mesh
      const pageMesh = new THREE.Mesh(pageGeometry, pageMaterial);
      pageMesh.position.x = 2;  // Shift right from pivot (same as cover)
      pageMesh.castShadow = true;
      pageMesh.receiveShadow = true;
      
      pageGroup.add(pageMesh);
      this.leftPages.push(pageGroup);
      this.bookGroup.add(pageGroup);
    }
    
    // RIGHT PAGES (40 pages) - open to the RIGHT
    for (let i = 0; i < 40; i++) {
      // Create group for page (pivot at spine)
      const pageGroup = new THREE.Group();
      pageGroup.position.set(-2, 0, -0.01 - (i * 0.01));  // Stack from middle
      
      // Create page mesh
      const pageMesh = new THREE.Mesh(pageGeometry, pageMaterial);
      pageMesh.position.x = 1.95;  // Shift right from pivot
      pageMesh.castShadow = true;
      pageMesh.receiveShadow = true;
      
      pageGroup.add(pageMesh);
      this.rightPages.push(pageGroup);
      this.bookGroup.add(pageGroup);
    }

    // === PAGE EDGES ===
    const edgeGeometry = new THREE.BoxGeometry(3.9, 0.05, 0.3);
    this.pageEdges = new THREE.Mesh(edgeGeometry, edgeMaterial);
    this.pageEdges.position.set(2, 0, 0);
    this.pageEdges.castShadow = true;
    this.bookGroup.add(this.pageEdges);

    // Book lies horizontally (isometric view)
    this.bookGroup.rotation.x = -Math.PI / 2;

    // Set initial closed position
    this.setClosedPosition();

    this.scene.add(this.bookGroup);
  }

  setClosedPosition() {
    // Left cover group (closed)
    this.leftCoverGroup.rotation.y = 0;
    
    // Left pages (closed)
    this.leftPages.forEach((pageGroup) => {
      pageGroup.rotation.y = 0;
    });
    
    // Right pages (closed)
    this.rightPages.forEach((pageGroup) => {
      pageGroup.rotation.y = 0;
    });
    
    // Page edges
    this.pageEdges.rotation.y = 0;
  }

  // ============================================
  // BOOK OPENING ANIMATION
  // ============================================

  async openBook() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    return new Promise(resolve => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (cubic-bezier)
        const eased = this.easeInOutCubic(progress);

        // 1. Left cover opens to the LEFT (0° → -90°)
        const coverAngle = eased * (Math.PI / 2); // 90° in radians
        this.leftCoverGroup.rotation.y = -coverAngle;  // NEGATIVE angle (opens left)
        
        // 2. Left pages (40 pages) open to the LEFT
        this.leftPages.forEach((pageGroup, i) => {
          const pageDelay = i * 0.015;
          const pageProgress = Math.max(0, Math.min((progress - pageDelay) / (1 - pageDelay), 1));
          const pageEased = this.easeInOutCubic(pageProgress);
          const pageAngle = pageEased * (Math.PI / 2); // 90°
          
          pageGroup.rotation.y = -pageAngle;  // Opens left
        });

        // 3. Right pages (40 pages) open to the LEFT
        this.rightPages.forEach((pageGroup, i) => {
          const pageDelay = (40 + i) * 0.015;  // Start after left pages
          const pageProgress = Math.max(0, Math.min((progress - pageDelay) / (1 - pageDelay), 1));
          const pageEased = this.easeInOutCubic(pageProgress);
          const pageAngle = pageEased * (Math.PI / 2); // 90°

          pageGroup.rotation.y = -pageAngle;  // Opens left
        });

        // 4. Camera movement (slight zoom and pan)
        this.camera.position.x = 0 - eased * 1;      // Pan left
        this.camera.position.y = 8 - eased * 0.5;    // Lower slightly
        this.camera.position.z = 10 - eased * 1;     // Zoom in
        this.camera.lookAt(0, 0, 0);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.isAnimating = false;
          resolve();
        }
      };

      animate();
    });
  }

  easeInOutCubic(t) {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // ============================================
  // WHITE LIGHT EFFECT
  // ============================================

  activateWhiteLight() {
    const startTime = Date.now();
    const duration = 1500;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Gradually increase intensity
      this.whiteLight.intensity = progress * 2;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Start pulsing
        this.pulseWhiteLight();
      }
    };

    animate();
  }

  pulseWhiteLight() {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const cycle = (elapsed % 3000) / 3000; // 3 second cycle

      // Pulse between 1.5 and 2.5 intensity
      this.whiteLight.intensity = 1.5 + Math.sin(cycle * Math.PI * 2) * 0.5;

      requestAnimationFrame(animate);
    };

    animate();
  }

  // ============================================
  // 3D PARTICLES SYSTEM
  // ============================================

  createParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    this.particleVelocities = [];

    // Generate particles around the book
    for (let i = 0; i < particleCount; i++) {
      // Initial position (around book)
      positions[i * 3] = (Math.random() - 0.5) * 6;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2; // z

      // Velocity (upward movement)
      this.particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: 0.02 + Math.random() * 0.03,  // Upward
        z: (Math.random() - 0.5) * 0.02
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material (glowing white dots)
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  activateParticles() {
    this.particlesActive = true;

    // Fade in particles
    const startTime = Date.now();
    const duration = 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.particles.material.opacity = progress * 0.8; // Max 0.8

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  animateParticles() {
    if (!this.particles || !this.particlesActive) return;

    const positions = this.particles.geometry.attributes.position.array;

    for (let i = 0; i < positions.length / 3; i++) {
      // Update position
      positions[i * 3] += this.particleVelocities[i].x;
      positions[i * 3 + 1] += this.particleVelocities[i].y;
      positions[i * 3 + 2] += this.particleVelocities[i].z;

      // If particle flew too high - return to bottom
      if (positions[i * 3 + 1] > 5) {
        positions[i * 3 + 1] = -4;
        positions[i * 3] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
  }

  // ============================================
  // RENDER LOOP
  // ============================================

  animate() {
    requestAnimationFrame(() => this.animate());

    // Animate particles if active
    if (this.particlesActive) {
      this.animateParticles();
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

// Export for use in login.js
window.Book3D = Book3D;
