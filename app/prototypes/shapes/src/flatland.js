var Flatland = window.Flatland || {};

Flatland.Shader = {

  uniforms: {

    'offset':   { type: 'f', value: 0.1 },
    'darkness': { type: 'f', value: 0.1 }

  },

  vertex: [

    'varying vec2 vUv;',

    'void main() {',

      'vUv = uv;',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'

  ].join('\n'),

  fragment: [

    'uniform float offset;',
    'uniform float darkness;',

    'varying vec2 vUv;',

    'void main() {',

      'vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );',

      'float amp = 1.0;',
      'amp = pow( 1.0 - mix( amp, 1.0 - darkness, dot( uv, uv ) ), 1.0 );',
      'amp += 0.33;',

      'gl_FragColor = vec4( amp, amp, amp, 1.0 );',

    '}'

  ].join('\n')

};