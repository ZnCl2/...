
let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
/**
* @returns {any}
*/
export function wasm_memory() {
    var ret = wasm.wasm_memory();
    return takeObject(ret);
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
* Universe for Conways Game of Life
*/
export class Universe {

    static __wrap(ptr) {
        const obj = Object.create(Universe.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_universe_free(ptr);
    }
    /**
    * Creates a new blank universe
    * @param {number} width
    * @param {number} height
    * @returns {Universe}
    */
    static new(width, height) {
        var ret = wasm.universe_new(width, height);
        return Universe.__wrap(ret);
    }
    /**
    * Creates a new random universe with 50% chance for cells to be alive
    * @param {number} width
    * @param {number} height
    * @returns {Universe}
    */
    static new_random(width, height) {
        var ret = wasm.universe_new_random(width, height);
        return Universe.__wrap(ret);
    }
    /**
    * Create a new universe with a single spaceship (LWSS)
    * @param {number} width
    * @param {number} height
    * @returns {Universe}
    */
    static new_with_spaceship(width, height) {
        var ret = wasm.universe_new_with_spaceship(width, height);
        return Universe.__wrap(ret);
    }
    /**
    * Getter for width
    * @returns {number}
    */
    width() {
        var ret = wasm.universe_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * Getter for height
    * @returns {number}
    */
    height() {
        var ret = wasm.universe_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * Getter for cells (returns a pointer to cells)
    * @returns {number}
    */
    cells() {
        var ret = wasm.universe_cells(this.ptr);
        return ret;
    }
    /**
    * Calculate next step for universe
    */
    tick() {
        wasm.universe_tick(this.ptr);
    }
    /**
    * Insert one universe into another
    * @param {Universe} other
    * @param {number} row
    * @param {number} column
    */
    insert(other, row, column) {
        _assertClass(other, Universe);
        wasm.universe_insert(this.ptr, other.ptr, row, column);
    }
    /**
    * Change width and height of the universe
    * @param {number} width
    * @param {number} height
    */
    resize(width, height) {
        wasm.universe_resize(this.ptr, width, height);
    }
    /**
    * Toggle a single cell of the universe
    * @param {number} row
    * @param {number} column
    */
    toggle(row, column) {
        wasm.universe_toggle(this.ptr, row, column);
    }
    /**
    * return the universe as string
    * @returns {string}
    */
    render() {
        try {
            const retptr = wasm.__wbindgen_export_0.value - 16;
            wasm.__wbindgen_export_0.value = retptr;
            wasm.universe_render(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_export_0.value += 16;
            wasm.__wbindgen_free(r0, r1);
        }
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_random_a3b3bcffa2ed629c = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

