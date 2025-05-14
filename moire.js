
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
            this.toggle_image1()
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


    toggle_image1() {
        this.image1_toggled = !this.image1_toggled
        this.draw();
    }

    initialize() {
        this.image1 = new Image();
        this.image2 = new Image();

        this.image1.src = 'test.png'; // background image (left)
        this.image2.src = 'test2.png'; // top image (right and movable)
        this.image1_toggled = true

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
        let image1
        if (this.image1_toggled){
            image1 = this.image1
        } else {
            image1 = this.image2
        }
        this.ctx.drawImage(image1, 0, 0, imgWidth, imgHeight);

        // Save context and draw the movable/rotated top image
        this.ctx.save();

        const centerX = this.canvas.width/2;
        const centerY = this.canvas.height / 2;
        this.ctx.translate(centerX + (this.canvas.width/2 *this.offsetX/10), centerY);

        this.ctx.rotate(this.angle * Math.PI / 180);

        this.ctx.drawImage(this.image1, -imgWidth/2, -imgHeight/2, imgWidth, imgHeight);

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