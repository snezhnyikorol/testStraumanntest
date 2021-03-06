if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

let current = 0,
    quietPeriod = 1000,
    sections = document.getElementsByTagName('section'),
    videos = document.getElementsByClassName('video-poster'),
    lastAnimation = 0,
    navigation = document.getElementById('navigation');

for (let i = 0; i < navigation.childElementCount; i++) {
    navigation.children[i].dataset.index = i.toString(10);
    navigation.children[i].onclick = handleDotClick;
}

for (let i = 0; i < videos.length; i++) {
    let id = videos[i].dataset.videoId;
    videos[i].onclick = getVideoHandler(id);
}

function getVideoHandler(videoId) {
    return function (event) {
        event.preventDefault();
        let src = 'https://www.youtube-nocookie.com/embed/' + videoId;
        let frame = document.getElementById('video-frame');
        let modal = document.getElementById('video-modal');
        frame.src = src;
        modal.classList.add('active');
        window.removeEventListener('wheel', handleWheel);
    }
}

document.getElementById('video-substrate').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('video-modal').classList.remove('active');
    document.getElementById('video-frame').src = '';
    window.addEventListener('wheel', handleWheel);
})

document.getElementById('video-close').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('video-modal').classList.remove('active');
    document.getElementById('video-frame').src = '';
    window.addEventListener('wheel', handleWheel);
})

navigation.style.top = 'calc(50% - ' + (navigation.offsetHeight - 15) / 2 + 'px)'

window.addEventListener('wheel', handleWheel)

function handleWheel(event) {
    let timeNow = new Date().getTime();
    if (Math.abs(event.deltaY) > 10 && timeNow - lastAnimation > quietPeriod && current < sections.length) {
        if (event.deltaY > 0) {
            if (current < sections.length - 1) {
                navigation.children[current].classList.remove('active');
                sections[current].classList.remove('active');
                current++;
                document.body.style.top = -sections[current].offsetTop + 'px';
                navigation.children[current].classList.add('active');
                sections[current].classList.add('active');
            }
        } else {
            if (current > 0) {
                navigation.children[current].classList.remove('active');
                sections[current].classList.remove('active');
                current--;
                document.body.style.top = -sections[current].offsetTop + 'px';
                navigation.children[current].classList.add('active');
                sections[current].classList.add('active');
            }
        }
        lastAnimation = timeNow;
    }
}

function handleDotClick(event) {
    event.preventDefault();
    for (let i = 0; i < navigation.childElementCount; i++) {
        navigation.children[i].classList.remove('active');
        sections[i].classList.remove('active');
    }
    let index = event.currentTarget.dataset.index;
    document.body.style.top = -sections[index].offsetTop + 'px';
    event.currentTarget.classList.add('active');
    current = index;
    sections[current].classList.add('active');
}

