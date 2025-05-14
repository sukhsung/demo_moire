
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

class ToneGenerator {
  constructor( name, button_name ){
    this.name = name
    this.frequency = 440
    this.isPlaying = false
    this.gainNode= audioCtx.createGain();

    this.button = document.getElementById( button_name )
    this.button.addEventListener('click', () => {
      this.onclick()
    });

  }

  initialize() {
    this.oscillator = audioCtx.createOscillator();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(this.frequency, audioCtx.currentTime);

    this.gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);
  }

  onclick(){
    if (!this.isPlaying) {
      this.start();
    } else {
      this.stop();
    }
    this.updateButton()
  }

  start(){
    this.initialize()
    this.oscillator.start();
    this.isPlaying = true
    this.button.classList.add("active")
  }

  stop() {
    if (this.isPlaying) {
      this.oscillator.stop();
      this.isPlaying = false
      this.oscillator.disconnect();
      this.button.classList.remove("active")
    }
  }

  setFrequency( frequency ){
    this.frequency = frequency
    if (this.isPlaying){
      this.oscillator.frequency.setValueAtTime(this.frequency, audioCtx.currentTime)
    }
    this.updateButton()
  }

  updateButton(){
    let msg = ""
    if (this.isPlaying){
      msg = "Stop " + this.name
    } else {
      msg = "Start " + this.name
    }
    msg += `<br>${this.frequency.toFixed(1)} Hz`


    this.button.innerHTML = msg
    
  }
}

class PlotGenerator {
  constructor() {
    // Plotting
    this.canvas = document.getElementById("canvas_sine")

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    // Only resize if the canvas size differs from its display size
    if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }


    this.freq_1 = 440
    this.freq_2 = 443

    this.data = {}
    this.num_pt = 512

    this.options = {
      scales: {
        x: {
          display:true,
        },
        y: {
          display:false,
        }
      }
    }

    this.chart = new Chart(this.canvas, {
        type: "scatter",
        data: this.data,
        options: this.options
    });

    this.initialize()
  }

  initialize() {
    let dx = 0.0002
    this.xs = []

    let data_1 = []
    let data_2 = []
    let data_3 = []
    for (let i=0; i<this.num_pt; i++) {
      let x = dx*i
      let y1 = Math.sin(2*Math.PI*this.freq_1 * x)
      let y2 = Math.sin(2*Math.PI*this.freq_2 *x )

      this.xs.push( x )
      data_1.push( {x: x, y: y1 })
      data_2.push( {x: x, y: y2    -3})
      data_3.push( {x: x, y: y1+y2 -7})
    }

    this.datas = [data_1, data_2, data_3]
    let labels = ['Tone 1', 'Tone 2', 'Tone 1 + Tone 2']
    for (let i=0; i<3; i++){
      let dataset = {
          showLine: true,
          label: labels[i],
          data: this.datas[i],
          fill: false,
          borderWidth: 1,
          pointStyle: false,
          animation: false,
      }
      this.chart.data.datasets.push(dataset)
    }

    this.chart.options.scales.x.max = dx*(this.num_pt-1)

    this.chart.update()
  }

  setFrequency( freq2 ){
    this.freq_2 = freq2
    this.update()
  }

  update() {
    for (let i=0; i<this.num_pt; i++) {
      let y2 = Math.sin(2*Math.PI*this.freq_2 * this.xs[i] )

      this.datas[1][i].y = y2 -3
      this.datas[2][i].y = this.datas[0][i].y + y2 -7
    }

    this.chart.update()
  }
}


export {ToneGenerator, PlotGenerator}