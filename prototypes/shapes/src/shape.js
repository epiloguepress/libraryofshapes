(function() {

  var Flatland = window.Flatland || {};

  var Shape = Flatland.Shape = function(amount, width, height) {

    var width = width || 25;
    var height = height || 25;

    var length = amount;
    var shape = new THREE.Shape(_.map(_.range(length), function(i) {
      var pct = i / length;
      var theta = Math.PI * 2 * pct;
      var x = width * Math.cos(theta);
      var y = height * Math.sin(theta);
      return new THREE.Vector2(x, y);
    }));

    var geometry = new THREE.ExtrudeGeometry(shape, {
      amount: 0.5,
      bevelEnabled: false
    });

    // var material = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    //   transparent: true,
    //   opacity: 0.7,
    //   blending: THREE.AdditiveBlending
    // });

    var material = new THREE.ShaderMaterial({
      vertexShader: Flatland.Shader.vertex,
      fragmentShader: Flatland.Shader.fragment,
      uniforms: Flatland.Shader.uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    THREE.Mesh.call(this, geometry, material);

    this.position.tween = new TWEEN.Tween(this.position)
      .easing(TWEEN.Easing.Circular.Out);

    this.rotation.tween = new TWEEN.Tween(this.rotation)
      .easing(TWEEN.Easing.Circular.Out);

  };

  Shape.prototype = Object.create(THREE.Mesh.prototype);

})();