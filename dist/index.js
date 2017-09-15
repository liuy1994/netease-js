//tab组件
$('ol#tabs').on('click', 'li', function (e) {
    let $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    $('#tabs-content').children().eq(index).addClass('active').siblings().removeClass('active')
})

//删除单条搜索记录
$('.search-history').on('click', '.icon-delete', function (e) {
    $(e.currentTarget).parent().remove()
})

//点击清空搜索
$('#icon-empty').on('click', function (e) {
    $('#search')[0].value = ''
    noinput()
})

//点击热门搜索
$('#search-hot').on('click', 'li', function (e) {
    $('#search')[0].value = e.currentTarget.innerText
    input()
})

//搜索框输入
var timer = null
$('#search').on('input', function (e) {    
    if(timer){
        window.clearTimeout(timer)        
    }else{
    }
    timer = setTimeout(function(){
        var value = $(e.currentTarget).val().trim()
        input()
        if (value === '') {
            noinput()
        }
        setTimeout(function(){
            if($('#search-result')[0].innerHTML === ''){
                var h6 = `<h6>没有结果<h6>`
                $('#search-result').append(h6)
            }else{
            }
        },200)
    },300)        
})

//点击搜索历史
$('#search-history li').on('click','div',function(e){
    $('#search')[0].value = e.currentTarget.innerText
    input()
})


// input没有内容
function noinput() {
    $($('#note')[0]).removeClass('hiden')
    $($('.search-hot')[0]).removeClass('hiden')
    $($('#history-item')[0]).removeClass('hiden')
    $($('#search-content')[0]).addClass('hiden')
    $($('#icon-empty')[0]).addClass('hiden')
    $($('#search-result')[0]).addClass('hiden')
}

// input有内容
function input() {
    $($('#note')[0]).addClass('hiden')
    $($('.search-hot')[0]).addClass('hiden')
    $($('#history-item')[0]).addClass('hiden')
    $($('#search-content')[0]).removeClass('hiden')
    $($('#icon-empty')[0]).removeClass('hiden')
    $($('#search-result')[0]).removeClass('hiden')
    var value = $($('#search')[0]).val().trim()
    $($('#search-content')[0]).empty()
    var p = `
    <p>搜索“${value}”</p>
    <h5>搜索结果</h5>
    `
    $($('#search-content')[0]).append(p)    
    search(value)
}





//搜索歌手
function search(value) {
    $($('#search-result')[0]).empty()
    if (value === '') {
    } else {
        var query1 = new AV.Query('Song')
        query1.contains('author', value)
        var query2 = new AV.Query('Song')
        query2.contains('name', value)
        var query = AV.Query.or(query1,query2)
        query.find().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var song = result[i].attributes
                var a = `
                <a href="./playing.html" data-id="${result[i].id}">
                <div class="a">
                    <div class="name">
                        <p>${song.name}</p>
                    </div>
                    <div class="author sq">${song.author} - ${song.album}</div>
                    <div class="icon-play"></div>
                </div>
            </a>
                `
                $('#search-result').append(a)        
            }
        })
    }
}











//查找ID
var a = $('.list a')
var i=0
for(i=0;i<a.length;i++){
    var regex = /([A-Z].*|[\u4e00-\u9fa5].*)/
    var matches = a[i].innerText.match(regex)[0]
    var name = matches.split('(')[0].trim()
    addId(name)
}


//把id添加到关键字
function addId(name){  
    var j = i  
    var query = new AV.Query('Song')
    query.contains('name', name)
    query.find().then(function (results) { 
        var result = results[0]
        var id = result.id
        a[j].setAttribute('href','./playing.html?' + id)
    })
}