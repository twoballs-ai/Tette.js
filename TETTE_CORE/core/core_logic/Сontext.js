export class Context {
    constructor(canvasId = 'canvas', type = '2d') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id ${canvasId} not found!`);
            return;
        }
        
        // Handle different context types
        if (type === '2d') {
            this.context = this.canvas.getContext('2d');
        } else if (type === 'webgl') {
            this.context = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        } else if (type === 'webgpu') {
            // WebGPU is still experimental, so checking if it is available
            if (navigator.gpu) {
                this.context = this.canvas.getContext('gpupresent');
            } else {
                console.error("WebGPU not supported on this browser");
            }
        } else {
            console.error("Unsupported context type: " + type);
        }
    }

    getContext() {
        return this.context;
    }

    getCanvas() {
        return this.canvas;
    }
}
