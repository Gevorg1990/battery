// const zone1 = document.querySelector('.zone1');
// const zone2 = document.querySelector('.zone2');
// const ufo = document.getElementById('ufo');

// zone1.ondragover = allowDrop;
// zone2.ondragover = allowDrop;
// function allowDrop(event) {
//    event.preventDefault()
// }


// ufo.ondragstart = drag;

// function drag(event) {
//   event.dataTransfer.setData('id',event.target.id);
   
// }

// zone1.ondrop = drop;
// zone2.ondrop = drop;

// function drop(event) {
//    let itemId = event.dataTransfer.getData('id')
  
//    event.target.append(document.getElementById(itemId))
// }

// let img = document.querySelector('img');

// if (img.complete) {
//    console.log('%c ok', 'color:green');
   
// }

// document.body.onwheel= function (event) {
//    console.log(event.layerY);
//    if (event.layerY > 900) {
//       document.querySelector('.k').classList.add('k1')
//       document.querySelector('.k').style.display="block"
//    } else {
//       document.querySelector('.k').classList.remove('k1')
//       // document.querySelector('.k').style.display="none"
//    }
   
// }

const img = [
   '11.jpg',
   '22.jpg',
   '33.jpg',
   '44.jpg',
   '55.jpeg',
   '66.jpeg'
];

let count = img.length;

function shuffle(array) {
   array.sort(()=>Math.random()-0.5)
}

function rendInt(min, max) {
   let rend = min + Math.random() * (max + 1 - min);
   return Math.floor(rend)
}



function init() {
   const cover = document.querySelector('.cover');
   shuffle(img)
   for (let i = 0; i < img.length; i++) {
      let card = document.createElement('div');
      card.classList.add('card');
      card.style.background = `url('./images/${img[i]}')`;
      card.style.backgroundSize = 'cover';
      card.style.transform=`rotate(${rendInt(-20,20)}deg) translate(${rendInt(-40,40)}px, ${rendInt(-40,40)}px)`
      cover.append(card);
   }
}

init();

document.querySelector('.cover').addEventListener('click', function (event) {
   
   if (event.target.classList.contains('card')) {
      event.target.classList.add('go');
      count--
   }
   if (count == 0) {
      // init();
      // count = img.length;
      location.reload()
   }
})



// Afto--------------------

let t1, t2;
let start = false;
const engane = new Audio('./audio/z.mp3');
const audio = new Audio('./audio/m.mp3');
engane.loop = true;
engane.volume = 1;

document.querySelector('.start').addEventListener('click', function () {
   if (start === false) {
      start = true;

      engane.play()

      document.querySelector('.img-pedal').addEventListener('click', pushTreadle);
      document.querySelector('.progres').style.width = 70 + 'px';
    this.classList.add('shadow')
    
   } else {
      start = false;

      engane.pause()

      document.querySelector('.img-pedal').removeEventListener('click', pushTreadle);
      document.querySelector('.progres').style.width = 0 + 'px';
      t1=clearTimeout(t1)
      t1 = clearTimeout(t2)
      audio.pause();
      audio.currentTime = 0;
      this.classList.remove('shadow')
   }
})

function pushTreadle() {
   t1=clearTimeout(t1)
   t1=clearTimeout(t2)
   this.classList.add('push');
   document.querySelector('.progres').style.width = 170 + 'px';
   audio.play()
   stopTreadle()
}

function stopTreadle() {
   t1 = setTimeout(() => {
      document.querySelector('.img-pedal').classList.remove('push');
      document.querySelector('.progres').style.width = 70 + 'px';
   },2000)

   t2 = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
   } , 3000)
}

// text-------------------------------

const txt = [
   'Mercedes-Benz\n',
   'CLS 63 AMG',

];

function typeText() {
   let line = 0;
   let count = 0;
   let out = '';
   let htmlOut=document.querySelector('.out')

   function typeLine() {
      let interval = setTimeout(() => {
         out += txt[line][count];
         htmlOut.innerHTML = out+'&#128396';
         count++;
        
         
         if (count >= txt[line].length) {
            count = 0;
            line++;
            if (line == txt.length) {
               clearTimeout(interval)
               htmlOut.innerHTML = out;
               return true
            }
      }
      typeLine()
      }, getRandomInt(getRandomInt(250*2.5)));
      
   }
   typeLine()
}

function getRandomInt(max) {
   return Math.floor(Math.random()*Math.floor(max))
}

typeText()

// ------------------------------ Battery

navigator.getBattery().then(function (battery) {
   function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
      // updateChargingInfo();
      // updateDischargingInfo()
   }
   updateAllBatteryInfo()
   battery.addEventListener('chargingchange', function () {
      updateChargeInfo()
   });

   function updateChargeInfo() {
      console.log(battery.charging);
      if (battery.charging) {
         document.body.style.background = 'black';
         // document.querySelector('.status').innerHTML = "zaryajaeca";
         document.querySelector('.battery-level').classList.add('battery-animation')
      } else {
         // document.querySelector('.status').innerHTML = "pazryajaeca";
         document.querySelector('.battery-level').classList.remove('battery-animation');
         document.body.style.background = '';
      }
      
   }
   battery.addEventListener('levelchange', updateLevelInfo);
   function updateLevelInfo() {
      console.log(battery.level);
      if (battery.level <= 0.7) {
         alert('menshe 60%')
      }
      document.querySelector('.battery-level-digit').innerHTML = Math.floor(battery.level * 100) + '%';
      document.querySelector('.battery-level').style.width=battery.level*100 + '%'
   }

   // battery.addEventListener('chargintimechange', updateChargingInfo);

   // function updateChargingInfo() {
   //    // console.log('char ' + battery.chargingTime);
      
   //    let time = battery.chargingTime;
   //       document.querySelector('.charging-time').innerHTML =battery.chargingTime ;
     
   //    console.log('charging ' + battery.chargingTime);
      
      
   // }
   // battery.addEventListener('dischargintimechange', updateDischargingInfo);

   // function updateDischargingInfo() {
   //    console.log('dis '+ battery.dischargingTime);
   //    let time = battery.dischargingTime;
   //       document.querySelector('.charging-time').innerHTML =battery.dischargingTime;
     
   //    // let minutes = new Date(time)
   //    // let time1 = +minutes.getMinutes()
   //    // time  = parseInt((6000 % 1000) / 100);
   //    // console.log('timeCharging '+time);
   // }
})



