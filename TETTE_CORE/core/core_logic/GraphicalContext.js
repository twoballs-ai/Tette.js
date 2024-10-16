export class GraphicalContext {
    constructor(canvasId = 'canvas', type = '2d') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas with id ${canvasId} not found!`);
        }
        
        this.context = this.initializeContext(type);
    }

    initializeContext(type) {
        // Определение типа контекста рендеринга
        if (type === '2d') {
            return this.canvas.getContext('2d');
        } else if (type === 'webgl') {
            return this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        } else if (type === 'webgpu') {
            if (navigator.gpu) {
                return this.canvas.getContext('gpupresent');
            } else {
                throw new Error("WebGPU not supported on this browser.");
            }
        } else {
            throw new Error("Unsupported context type: " + type);
        }
    }

    getContext() {
        return this.context;
    }

    getCanvas() {
        return this.canvas;
    }
}
