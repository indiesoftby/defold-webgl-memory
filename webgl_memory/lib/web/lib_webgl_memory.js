var LibraryWebGLMemory = {
    $WebGLMemory: {
        warnShown: false,

        cstringify: function (obj) {
            var str = JSON.stringify(obj);
            var cstr = allocate(intArrayFromString(str), "i8", ALLOC_NORMAL);
            return cstr;
        },

        addHeapSize: function (obj) {
            obj.memory.wasmheap = Module.HEAP8.length;
            return obj;
        }
    },

    WebGLMemory_GetInfo: function (param, subparam) {
        var ext = Module.ctx.getExtension("GMAN_webgl_memory");
        if (ext) {
            return WebGLMemory.cstringify(WebGLMemory.addHeapSize(ext.getMemoryInfo()));
        } else {
            if (!WebGLMemory.warnShown) {
                WebGLMemory.warnShown = true;
                console.warn(
                    "Unable to get the `GMAN_webgl_memory` extension - webgl-memory.js hasn't been loaded yet?"
                );
            }
            return WebGLMemory.cstringify(WebGLMemory.addHeapSize({
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
