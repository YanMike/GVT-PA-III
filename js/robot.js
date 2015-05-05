/**
 * Created by Yannick Bachteler
 * Version 0.1, 12.04.2015: Initial setup
 * Version 1.0, 22.04.2015: bug fix
 */


"use strict";       // use mode strict code

/**
 * Global Veriables
 * for indices buffer (ibo_*) and vertices buffer (vbo_*) of body parts
 * program variable (shaderProgram)
 * attribute variable (posAttrib)
 */
var gl;
var shaderProgram, posAttrib, colAttrib, vbo_body, col_body, vbo_legs, col_legs, ibo_body, ibo_legs, vbo_arms, col_arms, ibo_arms, vbo_head, col_head, ibo_head, vbo_eyes, col_eyes, vbo_mouth, col_mouth;

/**
 *
 */
function startWebGL() {
    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl');

    // Pipeline setup
    gl.clearColor(1,1,1, 1);
    gl.lineWidth(5.0);


    // Backface culling
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    //gl.cullFace(gl.FRONT);

    initShaders();
    initBuffers();
    render();
}

/**
 *  Links shader together to program
 *  Binds vertex buffer to attribute variable
 */
function initShaders() {
    //var fragmentShader = getShader(gl, "shader-fs");
    //var vertexShader = getShader(gl, "shader-vs");

    var fragmentShader = getShader(gl, "shader-fs-colored");
    var vertexShader = getShader(gl, "shader-vs-colored");

    // Link shader together to program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

    // Bind vertex buffer to attribute variable
    posAttrib = gl.getAttribLocation(shaderProgram, "pos");
    gl.enableVertexAttribArray(posAttrib);
    colAttrib = gl.getAttribLocation(shaderProgram, "col");
    gl.enableVertexAttribArray(colAttrib);
}

/**
 *  Compiles vertex and fragment shaders
 * @param gl    -   canvas context
 * @param id    -   ID to identify shader program
 * @returns {*} -   returns compiled shaders
 */
function getShader(gl, id) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while(currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        // Unknown shader type
        return null;
    }

    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

/**
 *  Setup vertex and index buffer objects for body parts
 */
function initBuffers() {

    /*  ***  head  *** */
    var vertices_head = new Float32Array([
        7,5,0, 5,5,0, 5,4,0, 7,4,0,                                 // neck - TRIANGLES
        2,5,0, 10,5,0, 9,10,0, 3,10,0                               // head - TRIANGLES
    ]);
    var colors_head = new Float32Array([
        0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1
    ]);
    var indices_head = new Uint16Array([
        1,2,3,0,                                            // neck
        4,5,6,7,4                                           // head
    ]);

    // load vertex data into a buffer
    vbo_head = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_head);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_head, gl.STATIC_DRAW);

    col_head = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, col_head);
    gl.bufferData(gl.ARRAY_BUFFER, colors_head, gl.STATIC_DRAW);

    ibo_head = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_head);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_head,
        gl.STATIC_DRAW);
    ibo_head.numberOfElements = indices_head.length;

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /* ********************************************************************* */

    /* ***  left & right arm  *** */
    var vertices_arms = new Float32Array([                  // left arm - TRIANGLES
        0,-1,0, 1,-1,0, 0,4,0, 1,2,0, 12,4,0, 11,2,0, 12,-1,0, 11,-1,0
    ]);
    var colors_arms = new Float32Array([
     1,0,0,1, 0,1,0,1, 0,0,1,1, 1,0,1,1, 1,0,0,1, 0,1,0,1, 0,0,1,1, 1,0,1,1
    ]);
    var indices_arms = new Uint16Array([
        0,1,2,3,4,5,6,7
    ]);

    vbo_arms = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_arms);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_arms, gl.STATIC_DRAW);

    col_arms = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, col_arms);
    gl.bufferData(gl.ARRAY_BUFFER, colors_arms, gl.STATIC_DRAW);

    ibo_arms = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_arms);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_arms,
        gl.STATIC_DRAW);
    ibo_arms.numberOfElements = indices_arms.length;

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /* ********************************************************************* */

    /*  ***  body  *** */
    var vertices_body = new Float32Array([
        2,2,0, 2,-3,0, 10,-3,0, 10,2,0                              // body - TRIANGLE_FAN
    ]);
    var colors_body = new Float32Array([
        1,0,0,1, 0,1,0,1, 0,0,1,1, 1,0,1,1
    ]);
    var indices_body = new Uint16Array([
        0,1,2,3                                             // body
    ]);
    vbo_body = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_body);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_body, gl.STATIC_DRAW);

    col_body = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, col_body);
    gl.bufferData(gl.ARRAY_BUFFER, colors_body, gl.STATIC_DRAW);

    ibo_body = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_body);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_body,
        gl.STATIC_DRAW);
    ibo_body.numberOfElements = indices_body.length;

    /* ********************************************************************* */

    /* *** legs  *** */
     var vertices_legs = new Float32Array([                  // legs - TRIANGLE_STRIP
        5,-3,0, 3,-3,0, 5,-8,0, 3,-8,0, 6,-9,0, 2,-9,0, 10,-9,0, 7,-8,0, 9,-8,0, 7,-3,0, 9,-3,0
    ]);
    var colors_legs = new Float32Array([
        0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1, 0,0,1,1
    ]);
    var indices_legs = new Uint16Array([
        0,1,2,3,4,5, 5,4,                                   // left leg and degenerated
        4,6,7,8,9,10                                        // right leg
    ]);

    vbo_legs = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_legs);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_legs, gl.STATIC_DRAW);

    col_legs = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, col_legs);
    gl.bufferData(gl.ARRAY_BUFFER, colors_legs, gl.STATIC_DRAW);

    ibo_legs = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_legs);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_legs,
        gl.STATIC_DRAW);
    ibo_legs.numberOfElements = indices_legs.length;

    //gl.bindBuffer(gl.ARRAY_BUFFER, null);
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /* ********************************************************************* */

    /* *** mouth *** */
    var vertices_mouth = new Float32Array([
        3.5,7,0, 4,6,0, 4,6,0, 8,6,0, 8,6,0, 8.5,7,0
    ]);
    var colors_mouth = new Float32Array([
        1,0,0,1, 1,0,0,1, 1,0,0,1, 1,0,0,1, 1,0,0,1, 1,0,0,1
    ]);

    vbo_mouth = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_mouth);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_mouth, gl.STATIC_DRAW);

    col_mouth= gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, col_mouth);
    gl.bufferData(gl.ARRAY_BUFFER, colors_mouth, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /* ********************************************************************* */

    /* *** eyes *** */
    var vertices_eyes = new Float32Array([
        5,8,0, 7,8,0
    ]);

    var colors_eyes = new Float32Array([
       0,0,1,1, 0,0,1,1
    ]);

    vbo_eyes = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_eyes);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_eyes, gl.STATIC_DRAW);

    col_eyes = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, col_eyes);
    gl.bufferData(gl.ARRAY_BUFFER, colors_eyes, gl.STATIC_DRAW);


    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    /* ********************************************************************* */
}

/**
 *  Clear framebuffer
 *  Bind buffers to attribute variable
 *  Render primitives
 */
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* *** head *** */
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_head);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_head);
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, col_head);
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.LINE_STRIP, ibo_head.numberOfElements,
        gl.UNSIGNED_SHORT, 0);

    /* *** left & right arm *** */
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_arms);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_arms);
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, col_arms);
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLE_STRIP, ibo_arms.numberOfElements,
        gl.UNSIGNED_SHORT, 0);

    /* *** legs *** */
     gl.bindBuffer(gl.ARRAY_BUFFER, vbo_legs);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_legs);
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, col_legs);
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLE_STRIP, ibo_legs.numberOfElements,
        gl.UNSIGNED_SHORT, 0);

    /* *** body *** */
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_body);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo_body);
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, col_body);
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLE_FAN, ibo_body.numberOfElements,
        gl.UNSIGNED_SHORT, 0);

    /* *** mouth *** */
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_mouth);
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, col_mouth);
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINES, 0,6);

    /* *** eyes *** */
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_eyes);
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, col_eyes);
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.POINTS, 0,2);
    /**/
}
