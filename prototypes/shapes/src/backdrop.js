(function() {

  var root = window.Flatland || {};

  var Backdrop = Flatland.Backdrop = function() {

    THREE.Mesh.call(this,
      new THREE.PlaneBufferGeometry(10000, 10000, 10),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        map: new Flatland.Texture(),
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      })
    );

    this.rotation.z = Math.PI / 4;

  };

  Backdrop.prototype = Object.create(THREE.Mesh.prototype);

})();