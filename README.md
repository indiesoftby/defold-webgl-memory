# WebGL memory tracker for Defold

A quick and easy way to find out the GPU and CPU memory usage of your Defold game on HTML5 platform.

So, this is an adaptation into a native extension of the excellent [WebGL-Memory](https://github.com/greggman/webgl-memory) library for the Defold engine. You add the extension to your project, then you can ask how much WebGL memory and resources you're using. It's important to keep in mind that WebGL-Memory tries to approximate the data, so the statistics may not be accurate.

As an extra bonus, this extension retrieves the size of the heap used by the game. 

> [!IMPORTANT]
> Use the extension only during game development. Exclude it in the release version of the game! It wraps WebGL calls and therefore **slows down your game**.

Check out the [online demo](https://indiesoftby.github.io/defold-webgl-memory/) to see how it works.

## Quick Start

Add this project as a [Defold library dependency](http://www.defold.com/manuals/libraries/). Open your `game.project` file and in the dependencies field under project add:

https://github.com/indiesoftby/defold-webgl-memory/archive/main.zip

Request the data:

```lua
if webgl_memory then
    local info = webgl_memory.get_info()
    print("GPU memory used in total: " .. math.floor(info.memory.total / 1024 / 1024) .. " MB")
    print("CPU heap size: " .. math.floor(info.memory.wasmheap / 1024 / 1024) .. " MB")
end
```

## Usage

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

### How to use this data

In HTML5 your main task is to minimise the memory consumption of the game. Firstly, modern mobile browsers [have OOM protection](https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/android/oom_intervention/near_oom_reduction_message_delegate.cc;l=23?q=IDS_NEAR_OOM_REDUCTION_MESSAGE&ss=chromium) and the browser can simply stop running your game and free up resources for other tasks if memory usage is too high. Secondly, allocating a large amount of memory for your game requires freeing up device resources, and this can lead to lags and slow startup of your HTML5 game.

- **Minimise the required heap size.** Set the `game.project` heap size to 32 megabytes (minimum). Run the HTML5 build of your game and check the value of `webgl_memory.get_info().memory.wasmheap`. If it is greater than 32 megabytes, increase this parameter and run the game again.
- **Use texture compression**: 16bpp or UASTC if their output image quality is OK to you. They will significantly reduce the size of the consumed video memory and speed up the performance of your game.
- **Use paged atlases** instead of 4k/8k atlases. They can reduce required heap size. Uncompressed RGBA 4k atlas requires 64 megabytes just to transfer it to the video adapter memory.

## Credits

This project is licensed under the terms of the CC0 1.0 Universal license. It's developed and supported by [@aglitchman](https://github.com/aglitchman). 

It includes includes a release version of WebGL-Memory, license MIT.
