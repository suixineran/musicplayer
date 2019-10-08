//设置时间格式  1-65行

const n_char = function(n) {
    let result = ""
    for (let i = 0; i < n; i++) {
        result += `0`
    }
    return result
}

const zfill = function(n, width) {
    let b2 = String(n)
    let c = width - b2.length
    let d = n_char(c)
    let c1 = d + b2
    return c1
}

const zfill_s = function(n) {
    let a = zfill(n, 4)
    if ( n < 60) {
        let b = a.slice(2)
        let a3 = `00:` + `${b}`
        return a3
    }
}

const jinwei60 = function(n) {
    let a = n / 60
    if (n % 60 != 0) {
        let b = Math.ceil(a)
        let b1 = (b - 1)
        return b1
    } else if (n % 60 === 0) {
        let b1 = a
        return b1
    }
}

const zfill_m = function(n) {

    let b1 = jinwei60(n)
    let b11 = zfill(b1, 2)
    let b3 = n -  b1 * 60
    let b4 = zfill_s(b3)
    let b5 = b4.slice(2)
    let b6 = `${b11}` + `${b5}`
    return b6

}

const zfill_a = function(n){
    if (n < 60){
        let a = zfill_s(n)
        // log(`ceshi1`, a)
        return a
    }
    if (n >= 60){
        let a = zfill_m(n)
        // log(`ceshi222222`, a)
        return a
    }

}

//时间 歌名 进度条 显示
const showSongInformation = function(audio) {
	setInterval(function() {
		let currentLabel = e('#id-span-current')
		let durationLabel = e('#id-span-duration')
		let current = parseInt(audio.currentTime, 10)
		let duration = parseInt(audio.duration, 10)
		let songName = e('#id-songname')
		let src = audio.src.split('/').slice(-1)[0]
		let path = decodeURI(src)
		let name = path.split('.').slice(0)[0]
		let c = zfill_a(current)
		let d = zfill_a(duration)

        //时间 歌名显示
		currentLabel.innerHTML = c
		durationLabel.innerHTML = d
        songName.innerHTML = name

        //进度条显示
        let n = current / duration
        let n1 = 100 - Number(n*100).toFixed(0)
        let controls = e('#id-hr')
        controls.style.transform = 'translateX(-' + n1 + '%)'
	}, 1000)
}



//绑定播放暂停按钮
const bindEventPlay = function(audio) {
	let a0 = function() {
		log('播放')
		audio.play()
		audio.playbackRate = 1
		showSongInformation(audio)
	}
	let a1 = function() {
		log('暂停')
		audio.pause()
	}
	let a = true
	let button = e('.play')
	button.addEventListener('click', ()=>{
		a = !a
		if (a) {
			a0()
		} else {
			a1()
		}
	})
}

const bindEventCanplay = function(audio) {
	audio.addEventListener('canplay', function() {
		audio.play()
		audio.playbackRate = 1
		showSongInformation(audio)

	})
}


//得到 song数组
const allSongs = function() {
	let musics = es('.music')
	let songs = []
	for (let i = 0; i < musics.length; i++) {
		let m = musics[i]
		let path = m.dataset.path
		songs.push(path)
	}
	// log('allsong的返回值', songs)
	return songs
}

//上一首歌
const lastSong = function(audio) {
	let songs = allSongs()
	let src = audio.src.split('/').slice(-1)[0]
	let path = 'mp3/' + decodeURI(src)
	let index = songs.indexOf(path)
	index = (index - 1 + songs.length) % songs.length
	log('lastSongSongindex', index)
	return songs[index]
}
//下一首歌
const nextSong = function(audio) {
	let songs = allSongs()
	let src = audio.src.split('/').slice(-1)[0]
	let path = 'mp3/' + decodeURI(src)
	let index = songs.indexOf(path)
	index = (index + 1) % songs.length
	log('nextSongindex', index)
	return songs[index]
}


//随机循环模式
const choice = function(array) {
	let a = Math.random()
	a = a * array.length
	let index = Math.floor(a)
	log('randomSongindex', index)
	return array[index]
}
const randomSong = function() {
	let songs = allSongs()
	let s = choice(songs)
	return s
}


//绑定 列表播放
const bindEventChange = function(audio) {
	bindAll('.music', 'click', function(event) {
		let self = event.target
		let path = self.dataset.path
		audio.src = path
	})
}

// 绑定上一首按钮
const bindEventlastsong = function(audio) {
	let container = e('#id-button-last')
	container.addEventListener('click', function(event) {
		let song = lastSong(audio)
		audio.src = song
	})
}
// 绑定下一首按钮
const bindEventnextsong = function(audio) {
	let container = e('#id-button-next')
	container.addEventListener('click', function(event) {
		let song = nextSong(audio)
		audio.src = song
	})
}



const bindEventEnd = function(audio, callback) {
    audio.addEventListener('ended', callback)
}


//

let xunhuanmoshi = null

const bindEventloop = function(audio) {
	let controls = e('.bottom')
	log('绑定按钮')
	xunhuanmoshi  &&  (controls.removeEventListener("click",  xunhuanmoshi))
	xunhuanmoshi = function(event) {
		 // log('looploop')
		 let target = event.target

		 if (target.classList.contains('nextSong')) {
			 log('nextSong')
			 bindEventEnd(audio, ()=>{
				 let song = nextSong(audio)
				 audio.src = song
			 })
		 } else if (target.classList.contains('randomSong')) {
			 log('randomSong')
			 bindEventEnd(audio, ()=>{
				 let song = randomSong(audio)
				 audio.src = song
			 })
		 }
	 }
	controls.addEventListener("click",  xunhuanmoshi)

}
//



//绑定顺序播放模式按钮
//
// const nextnext = function(event) {
// 	log('顺序播放')
// 	bindEventEnd(audio, ()=>{
// 		let song = nextSong(audio)
// 		audio.src = song
// 	})
// }
//
// const bindEventloop1 = function(audio) {
//     let loop = e('.nextSong')
//     loop.addEventListener('click', nextnext )
//
// }
//
//
// //绑定随机播放模式按钮
// const random = function(event) {
// 	log('随机播放')
// 	bindEventEnd(audio, ()=>{
// 		let song = randomSong(audio)
// 		audio.src = song
// 	})
// }
//
//
// const bindEventrandom = function(audio) {
//     let random = e('.randomSong')
//     random.addEventListener('click', random)
// }


const bindEvents = function() {
	let audio = e('#id-audio-player')
	bindEventPlay(audio)
	bindEventCanplay(audio)
	bindEventlastsong(audio)
	bindEventnextsong(audio)
	bindEventChange(audio)
	bindEventloop(audio)
}

const __main = function() {
	bindEvents()
}

__main()