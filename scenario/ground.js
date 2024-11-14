function createGround(scene, { speed = 0.5 }) {
  // Create a green field (plane)
  const geometry = new THREE.PlaneGeometry(150, 75);  // Narrower planes to create a vertical line effect
  const grassTexture = new THREE.TextureLoader().load('assets/grass-texture.avif');
  const grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });
  
  const field = new THREE.Mesh(geometry, grassMaterial);
  field.rotation.x = -Math.PI / 2; // Rotate to make it horizontal

  const grid_size = 2;
  const gapWidth = 50;  // Adjusting the width of the gap in the center

  const fields = [];

  // Parede da esquerda (altura reduzida para 50)
  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 10),  // Altura reduzida de 200 para 50
    new THREE.MeshBasicMaterial({ color: 0x3E1C00, side: THREE.DoubleSide })
  );
  leftWall.position.set(-75, 2, 0); // Ajuste a posição Y para 25 para que fique no chão
  leftWall.rotation.y = Math.PI / 2;  
  scene.add(leftWall);

  // Parede da direita (altura reduzida para 50)
  const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 10),  // Altura reduzida de 200 para 50
    new THREE.MeshBasicMaterial({ color: 0x3E1C00, side: THREE.DoubleSide })
  );
  rightWall.position.set(75, 2, 0); // Ajuste a posição Y para 25 para que fique no chão
  rightWall.rotation.y = Math.PI / 2; 
  scene.add(rightWall);
  
  // Create the grid of fields with a vertical gap in the middle
  for (let i = -grid_size; i <= grid_size; i++) {
      for (let j = -grid_size; j <= grid_size; j++) {
          // Skip the fields along the vertical line (z-axis) to create a small gap in the middle
          if (i === 0 && Math.abs(j) <= gapWidth) {
              continue;  // Skip the middle vertical line (gapWidth determines its size)
          }

          const fieldClone = field.clone();
          fieldClone.position.set(i * 150, 5, j * 75);  // Adjust positions
          scene.add(fieldClone);
          fields.push(fieldClone);
      }
  }

  // Animation function to move the fields
  function animateField() {
      requestAnimationFrame(animateField);

      fields.forEach(fieldClone => {
          fieldClone.position.z += speed;
          if (fieldClone.position.z > (grid_size) * 75) {
              fieldClone.position.z -= (2 * grid_size + 1) * 75;
          }
      });
  }

  animateField();
}