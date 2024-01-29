var LibraryWebGLMemory = {
    $WebGLMemory: {
        warnShown: false,

        cstringify: function (obj) {
            var str = JSON.stringify(obj);
            var cstr = allocate(intArrayFromString(str), "i8", ALLOC_NORMAL);
            return cstr;
        },

        addExtraInfo: function (obj) {
            obj.memory.wasmheap = Module.HEAP8.length;
            var gl = Module.ctx;
            obj.context = {
                vendor: gl.getParameter(gl.VENDOR),
                renderer: gl.getParameter(gl.RENDERER)
            };
            var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (debugInfo) {
                obj.context.unmasked_vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                obj.context.unmasked_renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            }
            return obj;
        }
    },

    WebGLMemory_GetInfo: function () {
        var ext = Module.ctx.getExtension("GMAN_webgl_memory");
        if (ext) {
            return WebGLMemory.cstringify(WebGLMemory.addExtraInfo(ext.getMemoryInfo()));
        } else {
            if (!WebGLMemory.warnShown) {
                WebGLMemory.warnShown = true;
                console.warn(
                    "Unable to get the `GMAN_webgl_memory` extension - webgl-memory.js hasn't been loaded yet?"
                );
            }
            return WebGLMemory.cstringify(WebGLMemory.addExtraInfo({
                memory: {
                    buffer: 0,
                    texture: 0,
                    renderbuffer: 0,
                    drawingbuffer: 0,
                    total: 0,
                },
                resources: {
                    buffer: 0,
                    renderbuffer: 0,
                    program: 0,
                    query: 0,
                    sampler: 0,
                    shader: 0,
                    sync: 0,
                    texture: 0,
                    transformFeedback: 0,
                    vertexArray: 0,
                },
            }));
        }
    },
};

autoAddDeps(LibraryWebGLMemory, "$WebGLMemory");
mergeInto(LibraryManager.library, LibraryWebGLMemory);
