# WebGL memory tracker for Defold

A quick and easy way to find out the GPU and CPU memory usage of your Defold game on HTML5 platform.

So, this is an adaptation into a native extension of the great [WebGL-Memory](https://github.com/greggman/webgl-memory) script for the Defold engine. You add the extension to your project, then you can ask how much WebGL memory and resources you're using. It's important to keep in mind that WebGL-Memory tries to approximate the data, so the statistics may not be accurate.

As a bonus, this extension adds the size of the heap used by the game. 

## Quick Start

Add this project as a [Defold library dependency](http://www.defold.com/manuals/libraries/). Open your `game.project` file and in the dependencies field under project add:

https://github.com/indiesoftby/defold-webgl-memory/archive/main.zip

Request for the data:

```lua
if webgl_memory then
    local info = webgl_memory.get_info()
    print("GPU memory used in total: " .. math.floor(info.memory.total / 1024 / 1024) .. " MB")
    print("CPU heap size: " .. math.floor(info.memory.wasmheap / 1024 / 1024) .. " MB")
end
```

## Advanced Usage

When you call `webgl_memory.get_info()`, the result is:

```lua
{
  memory = {
    buffer = <bytes used by buffers>,
    texture = <bytes used by textures>,
    renderbuffer = <bytes used by renderbuffers>,
    drawingbuffer = <bytes used by the canvas>,
    total = <bytes used in total>,
    wasmheap = <bytes used by the Defold engine>, -- is injected by the extension and equals to `Module.HEAP8.length`.
  },
  resources = {
    buffer = <count of buffers>,
    renderbuffer = <count of renderbuffers>,
    program = <count of programs>,
    query = <count of query objects, WebGL2 only>,
    sampler = <count of samplers, WebGL2 only>,
    shader = <count of shaders>,
    sync = <count of sync objects, WebGL2 only>,
    texture = <count of textures>,
    transformFeedback = <count of transformfeedbacks, WebGL2 only>,
    vertexArray = <count of vertexArrays, only if used or WebGL2>,
  }
}
```

## Credits

This project is licensed under the terms of the CC0 1.0 Universal license. It's developed and supported by [@aglitchman](https://github.com/aglitchman). 

It includes includes a release version of WebGL-Memory, license MIT.
