

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btnNextIndustries = $('.section-key-industries .direction #next')
const btnPrevIndustries = $('.section-key-industries .direction #prev')

btnNextIndustries.onclick = function() {
    const widthItem = $('.industries .item').offsetWidth;
    $('.industries-block').scrollLeft += widthItem
}


btnPrevIndustries.onclick = function() {
    const widthItem = $('.industries .item').offsetWidth;
    $('.industries-block').scrollLeft -= widthItem
}

var thisPage = 1
var limitPage = 5
var listJobItem = $$('.list-job .job-thumb')

function loadJobItem() {
    let beginJobIndex = limitPage * (thisPage - 1)
    let endJobIndex = limitPage * thisPage - 1

    listJobItem.forEach((item, key) => {
        if (key >= beginJobIndex && key <= endJobIndex) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
    listPage()
}

loadJobItem()

function listPage() {
    let count = Math.ceil(listJobItem.length / limitPage)
    $('.list-page').innerHTML = ''
    
    
    if (thisPage != 1) {
        let prev = document.createElement('li')
        prev.innerText = 'Trước'
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")")
        $('.list-page').appendChild(prev)

    }
    for (let i = 1; i <= count; i++) {
        let newPage = document.createElement('li')
        newPage.innerText = i
        if (i == thisPage) {
            newPage.classList.add('active')
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")")
        $('.list-page').appendChild(newPage)
    }

    if (thisPage != count) {
        let next = document.createElement('li')
        next.innerText = 'Sau'
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")")
        $('.list-page').appendChild(next)

    }
}

function changePage(i) {
    thisPage = i
    loadJobItem()
}


const btnHandBook = $('.btn-loadHandBook')
const handbooks = $$('.handbook-block .handbook')

let handbookIndex = 3

function loadMoreHandBook(mediaRes) {
    if (mediaRes.matches) { // So khớp
        handbookIndex = 2
        btnHandBook.onclick = function() {
            this.innerHTML = '<div class="loader"></div>'
            setTimeout(() => {
                for (var i = handbookIndex; i < handbookIndex + 2; i++) {
                    if (handbooks[i]) {
                        handbooks[i].style.display = 'block'
                        btnHandBook.innerHTML = 'Xem thêm cẩm nang nghề nghiệp'
                    }
                }
                handbookIndex += 2
                if (handbookIndex >= handbooks.length) {
                    btnHandBook.style.display = 'none'
                }
            }, 1000)
        } 
    } else {
        btnHandBook.onclick = function() {
            this.innerHTML = '<div class="loader"></div>'
            setTimeout(() => {
                for (var i = handbookIndex; i < handbookIndex + 3; i++) {
                    if (handbooks[i]) {
                        handbooks[i].style.display = 'block'
                        btnHandBook.innerHTML = 'Xem thêm cẩm nang nghề nghiệp'
                    }
                }
                handbookIndex += 3
                if (handbookIndex >= handbooks.length) {
                    btnHandBook.style.display = 'none'
                }
            }, 1000)
        } 
    }
}
  

const mediaRes = window.matchMedia("(max-width: 991px)")
loadMoreHandBook(mediaRes)
mediaRes.addListener(loadMoreHandBook)
