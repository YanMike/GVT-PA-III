function startWebGL() {
    // Get the WebGL context.
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');

    // Pipeline setup.
    gl.clearColor(1, 1, 1, 1);
    // Backface culling.
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK); // or gl.FRONT

    // Compile vertex shader.
    var vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' +
        'color = col;' +
        'gl_Position = vec4(pos*0.1-0.5, 2);' +
        '}';
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile fragment shader.
    fsSouce = 'precision mediump float;' +
    'varying vec4 color;' +
    'void main() {' +
    'gl_FragColor = color;' +
    '}';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Link shader together into a program.
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Vertex data.
    // Positions.
    var vertices = new Float32Array([
        5,-3,0, 3,-3,0, 5,-8,0, 3,-8,0, 6,-9,0, 2,-9,0, 10,-9,0, 7,-8,0, 9,-8,0, 7,-3,0, 9,-3,0
    ]);
    // Colors as rgba.
    var colors = new Float32Array([
        0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1
    ]);
    // Index data.
    var indices = new Uint16Array([0, 1, 2, 3, 4, 5, 5, 4,                                   // left leg and degenerated
        4, 6, 7, 8, 9, 10]);


    //            // Positions.
    //            var vertices = new Float32Array([
    //                0,0,0, 1,0,0, 1,1,0, 0,1,0, 0,0,0, 1,1,0
    //            ]);
    //            // Colors as rgba.
    //            var colors = new Float32Array([1,0,0,1, 0,1,0,1,
    //                0,0,1,1, 1,0,1,1, 0,1,1,1, 1,1,0,1 ]);
    //            // Index data.
    //            var indices = new Uint16Array([ 0,1,2, 3,4,5 ]);

    // Setup position vertex buffer object.
    var vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    // Setup color vertex buffer object.
    var vboCol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);
    //            gl.disableVertexAttribArray(colAttrib);

    // Setup index buffer object.
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices,
        gl.STATIC_DRAW);
    ibo.numerOfEmements = indices.length;

    // Clear framebuffer and render primitives.
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLE_STRIP, ibo.numerOfEmements,
        gl.UNSIGNED_SHORT, 0);



    // Vertex data.
    // Positions.
    var vertices_legs = new Float32Array([
        6,-2,0, 4,-2,0, 6,-7,0, 4,-7,0, 7,-8,0, 3,-8,0, 11,-8,0, 8,-7,0, 10,-7,0, 8,-2,0, 10,-2,0
    ]);
    // Colors as rgba.
    var colors_legs = new Float32Array([
        0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1
    ]);
    // Index data.
    var indices_legs = new Uint16Array([0, 1, 2, 3, 4, 5, 5, 4,                                   // left leg and degenerated
        4, 6, 7, 8, 9, 10]);


    //            // Positions.
    //            var vertices = new Float32Array([
    //                0,0,0, 1,0,0, 1,1,0, 0,1,0, 0,0,0, 1,1,0
    //            ]);
    //            // Colors as rgba.
    //            var colors = new Float32Array([1,0,0,1, 0,1,0,1,
    //                0,0,1,1, 1,0,1,1, 0,1,1,1, 1,1,0,1 ]);
    //            // Index data.
    //            var indices = new Uint16Array([ 0,1,2, 3,4,5 ]);

    // Setup position vertex buffer object.
    var vboPos_legs = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos_legs);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_legs, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    // Setup color vertex buffer object.
    var vboCol_legs = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCol_legs);
    gl.bufferData(gl.ARRAY_BUFFER, colors_legs, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    // Setup index buffer object.
    var ibo_legs = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_legs);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_legs,
        gl.STATIC_DRAW);
    ibo_legs.numerOfEmements = indices_legs.length;

    // Clear framebuffer and render primitives.
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLE_STRIP, ibo_legs.numerOfEmements,
        gl.UNSIGNED_SHORT, 0);
}
