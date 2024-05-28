class Triangle{
    constructor(){
        this.type = 'triangle';
        this.position = [0.0,0.0,0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
    }
    render() {
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;
        
        // Pass the position of a point to a_Position variable
        // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        
        // Pass the size of a point to a u_FragColor variable
        gl.uniform1f(u_Size, size);
        
        // Draw
        //   gl.drawArrays(gl.POINTS, 0, 1);
        var d = this.size/200.0; // delta
        drawTriangle([xy[0],xy[1],xy[0]+ d,xy[1],xy[0],xy[1]+d])
    }
}


function drawTriangle(vertices) {
    // var vertices = new Float32Array([
    //   0, 0.5,   -0.5, -0.5,   0.5, -0.5
    // ]);
    var n = 3; // The number of vertices
  
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.DYNAMIC_DRAW);
  
    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
    // var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // if (a_Position < 0) {
    //   console.log('Failed to get the storage location of a_Position');
    //   return -1;
    // }



    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    gl.drawArrays(gl.TRIANGLES, 0, n);
  
    // return n;
  }



function drawTriangle3D(vertices) {
    // var vertices = new Float32Array([
    //   0, 0.5,   -0.5, -0.5,   0.5, -0.5
    // ]);
    var n = vertices.length / 3; // The number of vertices
  
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.DYNAMIC_DRAW);
  
    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
    // var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // if (a_Position < 0) {
    //   console.log('Failed to get the storage location of a_Position');
    //   return -1;
    // }



    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    gl.drawArrays(gl.TRIANGLES, 0, n);
  
    // return n;
  }

  // function drawTriangle3DUV(vertices,uv) {
  //   var n = vertices.length / 3;
  //   var vertexBuffer = gl.createBuffer();
  //   if (!vertexBuffer) {
  //     console.log('Failed to create the buffer object');
  //     return -1;
  //   }
  //   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.DYNAMIC_DRAW);
  //   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  //   gl.enableVertexAttribArray(a_Position);
    
  //   // bind buffer object to target 
  //   var uvBuffer = gl.createBuffer();
  //   if (!uvBuffer) {
  //     console.log('Failed to create the buffer object');
  //     return -1;
  //   }
  //   gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv),gl.DYNAMIC_DRAW);
  //   gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    
  //   gl.enableVertexAttribArray(a_UV);
  //   gl.drawArrays(gl.TRIANGLES, 0, n);
  //   gl.disableVertexAttribArray(a_UV);

  // }

  function drawTriangle3DUV(vertices, uv) {
    var n = vertices.length / 3; // number of vertices (each vertex has 3 components: x, y, z)

    // Create and bind the vertex buffer
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // Create and bind the UV buffer
    var uvBuffer = gl.createBuffer();
    if (!uvBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_UV);

    // Draw the triangles
    gl.drawArrays(gl.TRIANGLES, 0, n);

    // Cleanup
    gl.disableVertexAttribArray(a_Position);
    gl.disableVertexAttribArray(a_UV);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

drawTriangle3DUVNormal = function(vertices, uv, normals) {
  var n = vertices.length / 3; // number of vertices (each vertex has 3 components: x, y, z)
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
  }

  // bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // write data into buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  
  // assign buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // create a buffer object for UV
  var uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
  }

  // bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  // write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

  // assign the buffer object to a_UV variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  // enable the assignment to a_UV variable
  gl.enableVertexAttribArray(a_UV);

  // write buffer object for normals
  var normalBuffer = gl.createBuffer();
  if (!normalBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
  }

  // bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  // write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.DYNAMIC_DRAW);

  // assign the buffer object to a_Normal variable
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);

  // enable the assignment to a_Normal variable
  gl.enableVertexAttribArray(a_Normal);

  gl.drawArrays(gl.TRIANGLES, 0, n);

  g_vertexBuffer = null;


}