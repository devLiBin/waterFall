// function getData() {
//     $.ajax({
//         type: 'GET',
//         url: 'http://localhost/waterFall/js/getPics.php',
//         success: function (data) {
//             console.log(JSON.parse(data))
//         }
//     })
// }
// getData()



(function () {
    var oLi = $('li')
    // var num = 1
    var flag = false
    getData()

    function getData() {
        if (!flag) {
            flag = true
            $.ajax({
                type: 'GET',
                // url: 'http://localhost/waterFall/js/data.txt',
                url: 'http://localhost/waterFall/js/getPics.php?',
                success: addDom,
                beforeSend: function (data) {
                    // console.log(data.readyState)
                    if (data.readyState == 0) {
                        $('.loading').fadeIn(300)
                    }
                },
                complete: function (data) {
                    // console.log(data.status)
                    if (data.status == 200) {
                        $('.loading').fadeOut(300)
                    }
                }
            })
            // num++
        }
    }

    function addDom(data) {
        var dataList = JSON.parse(data)
        // console.log(dataList)
        if (dataList.length > 1) {
            dataList.forEach(function (ele, index) {
                // preview  title
                var oDiv = $('<div class="item"></div>')
                var oBox = $('<div class="imgBox"></div>')
                var oP = $('<p></p>')
                var img = new Image()
                img.src = ele.preview
                oP.text(ele.title)
                img.onload = function () {
                    oBox.append(img)
                    oDiv.append(oBox).append(oP)
                    var index = getMinLi(oLi)
                    $(oLi[index]).append(oDiv)
                }
            })
            flag = false
        }
    }

    function getMinLi(dom) {
        var minHeight = parseInt($(dom[0]).css('height'))
        var index = 0;
        for (var i = 1; i < dom.length; i++) {
            var height = parseInt($(dom[i]).css('height'))
            if (height < minHeight) {
                minHeight = height
                index = i
            }
        }
        return index
    }
    $(window).scroll(function () {
        var scrollHeight = $(this).scrollTop()
        var clientHeight = $(window).height()
        var pageHeight = parseInt($(oLi[getMinLi(oLi)]).css('height'))
        if (scrollHeight + clientHeight > pageHeight) {
            getData()
        }
    })
})()