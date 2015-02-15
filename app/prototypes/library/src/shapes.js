(function() {

  var v = new THREE.Vector3();
  var drag = 0.125;

  var Shapes = Library.Shapes = {

    _dimension: 0,

    Names: [
      'Triangle',
      'Rectangle',
      'Pentagon',
      'Hexagon',
      'Heptagon',
      'Octagon'
    ],

    Material: new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    }),

    parent: new THREE.Object3D(),

    update: function() {

      var children = Shapes.parent.children;

      for (var i = 0; i < children.length; i++) {
        var shape = children[i];
        shape.position.add(
          v
            .copy(shape.position.destination)
            .sub(shape.position)
            .multiplyScalar(drag)
        );
      }

    }

  };

  Shapes.length = Shapes.Names.length;

  for (var i = 3; i < 9; i++) {
    var geometry = new THREE.ShapeGeometry(new THREE.Shape(generatePolygon(i)));
    var mesh = Shapes[Shapes.Names[i - 3]] = new THREE.Mesh(geometry, Shapes.Material);
    Shapes.parent.add(mesh);
    mesh.position.destination = new THREE.Vector3();
  }

  Shapes.Triangle.rotation.z = - Math.PI / 2;
  Shapes.Rectangle.rotation.z = - Math.PI / 4;
  Shapes.Pentagon.rotation.z = - Math.PI / 10;
  Shapes.Heptagon.rotation.z = Math.PI / 14;

  Object.defineProperty(Shapes, 'dimension', {
    get: function() {
      return Shapes._dimension;
    },
    set: function(v) {
      Shapes._dimension = v;
      for (var i = 0; i < Shapes.parent.children.length; i++) {
        Shapes.parent.children[i].scale.set(v, v, v);
      }
    }
  });

  function generatePolygon(sides) {

    var result = [];

    for (var i = 0; i < sides; i++) {
      var pct = i / sides;
      var theta = - Math.PI * 2 * pct;
      var x = Math.cos(theta) / 2;
      var y = Math.sin(theta) / 2;
      result.push(new THREE.Vector2(x, y));
    }

    return result;

  }

})();