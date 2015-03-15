(function() {

  var root = window.Flatland || {};

  var Texture = root.Texture = function() {

    var resolution = 8;

    var two = this.two = new Two({
      type: Two.Types.canvas,
      width: 128,
      height: 128
    });

    var group = two.makeGroup();
    var depth = two.width;
    var padding = 1;
    var buffer = 0.075;

    for (var i = 0, length = resolution; i < length; i++) {

      var pct = i / (length - 1);
      var x = pct * depth;

      if (i <= 0) {
        x += buffer;
      }
      if (i >= length - 1) {
        x -= buffer;
      }

      for (var j = 0; j < length; j++) {

        pct = j / (length - 1);
        var y = pct * depth;

        if (j <= 0) {
          y += buffer;
        }
        if (j >= length - 1) {
          y -= buffer;
        }

        var c = two.makeLine(x, 0, x, y);
        var d = two.makeLine(0, y, x, y);

        c.stroke = d.stroke = 'white';
        // c.linewidth = d.linewidth = 0.5;

        group.add(c, d);

      }

    }

    two.update();

    THREE.Texture.call(this, two.renderer.domElement);

    this.wrapS = this.wrapT = THREE.RepeatWrapping;
    this.repeat.set(32, 32);

    this.needsUpdate = true;

  };

  Texture.prototype = Object.create(THREE.Texture.prototype);

  function map(v, o1, o2, d1, d2) {
    return ((v - o1) / (o2 - o1)) * (d2 - d1) + d1;
  }

})();