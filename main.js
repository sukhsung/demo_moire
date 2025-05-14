import {ToneGenerator, PlotGenerator} from './tone.js'
import {MoirePlotter} from './moire.js'




// Audio Control

const tone_1 = new ToneGenerator( 'tonebutton_1')
const tone_2 = new ToneGenerator( 'tonebutton_2')
const plots = new PlotGenerator()

const range_2 = document.getElementById('range_2');
const freq_2  = document.getElementById('freq_2');
range_2.addEventListener("input", (event) =>{
  let freq2 = parseFloat(event.target.value)/10
  freq_2.textContent = freq2;
  tone_2.setFrequency( freq2 )

  plots.setFrequency(freq2 )
})

const show_graph = document.getElementById('show_graph')
const div_graph = document.getElementById('graph')

div_graph.hidden = true
show_graph.addEventListener('click', () => {
  div_graph.hidden = !div_graph.hidden
})

const moire = new MoirePlotter()


// Main Demo Controol
const button_demo = document.getElementById( "button_demo" )

const div_demo_1 = document.getElementById( "demo_1")
const div_demo_2 = document.getElementById( "demo_2")

div_demo_1.hidden = false
div_demo_2.hidden = true

button_demo.addEventListener("click", ()=>{
    div_demo_1.hidden = !div_demo_1.hidden
    div_demo_2.hidden = !div_demo_2.hidden

    if (div_demo_1.hidden) {
        tone_1.stop()
        tone_2.stop()

        moire.draw()
    }
})