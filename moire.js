
class MoirePlotter {
    constructor() {
        this.canvas = document.getElementById('canvas_moire');
        this.ctx = this.canvas.getContext('2d');

        this.translationSlider = document.getElementById('translationSlider');
        this.rotationSlider = document.getElementById('rotationSlider');
        this.angleDisplay = document.getElementById('angleDisplay');
        this.button_toggle = document.getElementById('toggle_image')

        this.translationSlider.addEventListener('input', () => {
            this.onchange_translation()
        });

        this.rotationSlider.addEventListener('input', () => {
            this.onchange_rotation()
        });

        this.button_toggle.onclick = () => {
            this.toggle_image2()
        }
        this.initialize()

    }

    onchange_translation() {
        this.offsetX = parseFloat(translationSlider.value)/100;
        this.draw();
    }

    onchange_rotation(){
        this.angle = parseFloat(rotationSlider.value);
        this.angleDisplay.textContent = this.angle;
        this.draw();
    }


    toggle_image2() {
        this.image2_toggled = !this.image2_toggled
        this.draw();
    }

    initialize() {
        this.image1 = new Image();
        this.image2 = new Image();

        this.image1.src = 'test.png'; // background image (left)
        this.image2.src = 'test2.png'; // top image (right and movable)
        this.image2_toggled = false

        // this.image1.onload = this.tryDraw;
        // this.image2.onload = this.tryDraw;

        this.imgSize = 256; // Assuming square images
        this.y = (this.canvas.height - this.imgSize) / 2;

        this.offsetX = parseFloat(translationSlider.value)/100;
        this.angle = parseFloat(rotationSlider.value);

    }

    draw() {
        this.resizeCanvasToDisplaySize()

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const imgWidth = this.canvas.width/2;
        const imgHeight = this.canvas.height;

        // draw first image (background)
        this.ctx.drawImage(this.image1, 0, 0, imgWidth, imgHeight);

        // Save context and draw the movable/rotated top image
        this.ctx.save();

        const centerX = this.canvas.width;
        const centerY = this.canvas.height / 2;
        this.ctx.translate(centerX*this.offsetX/2, centerY);

        this.ctx.rotate(this.angle * Math.PI / 180);

        let image2
        if (this.image2_toggled){
            image2 = this.image2
        } else {
            image2 = this.image1
        }
        this.ctx.drawImage(image2, 0, -imgHeight/2, imgWidth, imgHeight);

        this.ctx.restore();
    }

    tryDraw() {
        console.log('here')
        // this.draw()
        // if (this.image1.complete && this.image2.complete) this.draw();
    }

    resizeCanvasToDisplaySize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        // Only resize if the canvas size differs from its display size
        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
        }


}



export {MoirePlotter}