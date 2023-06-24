const sectors = [
  { color: '#f82', label: '1', text:'Umarme eine Person'},
  { color: '#0bf', label: '2', text:'Mache einer Person ein Kompliment' },
  { color: '#fb0', label: '3', text:'RICKROLL' },
  { color: '#0fb', label: '4', text:'Mache mit 3 verschiedenen Personen ein SELFIE'  },
  { color: '#b0f', label: '5', text:'Mache einen Fortnite Tanz'  },
  { color: '#f0b', label: '6', text:'Tausche ein Kleidungsstück mit einer Person / Begleitung'  },
  { color: '#bf0', label: '7', text:'Sing den nächsten Song, den du kennst, laut mit'  },
  { color: '#bff', label: '8', text:'Highfive 10 verschiedene Personen'  }

]

const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const ans = document.querySelector('#answer')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length

const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians

const getIndex = () => Math.floor(tot - ((ang - 1.5707) / TAU) * tot) % tot

function drawSector(sector, i) {
  const ang = arc * i
  ctx.save()
  // COLOR
  ctx.beginPath()
  ctx.fillStyle = sector.color
  ctx.moveTo(rad, rad)
  ctx.arc(rad, rad, rad, ang, ang + arc)
  ctx.lineTo(rad, rad)
  ctx.fill()
  // TEXT
  ctx.translate(rad, rad)
  ctx.rotate(ang + arc / 2)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#fff'
  ctx.lineWidth=10;
  ctx.strokeStyle = "black"
  ctx.font = 'bold 30px sans-serif'
  ctx.strokeText(sector.label, rad-10, 10)
  ctx.fillText(sector.label, rad - 10, 10)
  //
  ctx.restore()
}

function rotate() {
  const sector = sectors[getIndex()]

  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
  spinEl.textContent = !angVel ? 'PRESS' : ""
  spinEl.style.background = sector.color
}

async function frame() {
  if (!angVel) return
  angVel *= friction // Decrement velocity by friction
  if (angVel < 0.002){
    angVel = 0 // Bring to stop
    ans.textContent = sectors[getIndex()].text
    if(sectors[getIndex()].label == 3){
      await Sleep(1000);
      window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0"
    }
  } 
  ang += angVel // Update angle
  ang %= TAU // Normalize angle
  rotate()
}

function engine() {
  frame()
  requestAnimationFrame(engine)
}

function init() {
  sectors.forEach(drawSector)
  rotate() // Initial rotation
  engine() // Start engine
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.75)
  })
}
function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
 }

init()
