$(function () {
  // 点击显示游戏和关闭规则
  $('.rules').click(function () {
    $('.rules-mask').stop().fadeIn(100)
  })
  $('.rules-close').click(function () {
    $('.rules-mask').stop().fadeOut(100)
  })
  // 点击开始游戏
  $('.start-btn').click(function () {
    $('.start-btn').stop().fadeOut(100)
    progressHandler()
    gameAnimation()
  })
  // 重新开始游戏
  $('.restart-btn').click(function () {
    $('.game-over').stop().fadeOut(100)
    progressHandler()
    gameAnimation()
  })

  //  进度条操作
  function progressHandler () {
    let $progress = $('.progress')
    $progress.css('width', 180)
    $progress.timer = setInterval(function () {
      let $width = $progress.width()
      $width -= 5
      $progress.css('width', $width)
      if ($progress.width() === 0) {
        clearInterval($progress.timer)
        $('.game-over').stop().fadeIn()
        stopGameAnimation()
      }
    }, 500)
  }

  // 游戏动画
  let timer = null

  function gameAnimation () {
    let wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png']
    let wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png']
    let arrPos = [
      { left: '100px', top: '115px' },
      { left: '20px', top: '160px' },
      { left: '190px', top: '142px' },
      { left: '105px', top: '193px' },
      { left: '19px', top: '221px' },
      { left: '202px', top: '212px' },
      { left: '120px', top: '275px' },
      { left: '30px', top: '295px' },
      { left: '209px', top: '297px' }
    ]
    let $wolfImg = $('<img src class="wolf-img">')
    let posIndex = Math.round(Math.random() * 8)
    let imgType = Math.round(Math.random()) === 0 ? wolf_1 : wolf_2
    $wolfImg.css({
      position: 'absolute',
      left: arrPos[posIndex].left,
      top: arrPos[posIndex].top
    })
    window.imgIndex = 0
    window.maxIndex = 5
    timer = setInterval(function () {
      if (imgIndex === maxIndex) {
        $wolfImg.remove()
        clearInterval(timer)
        gameAnimation()
      }
      $wolfImg.attr('src', imgType[imgIndex])
      imgIndex++
    }, 300)

    $('.container').append($wolfImg)

    // 点击实现游戏
    gameRules($wolfImg)
  }

  // 停止游戏动画
  function stopGameAnimation () {
    let $wolfImg = $('.wolf-img')
    $wolfImg.remove()
    clearInterval(timer)
  }

  // 游戏规则
  function gameRules ($wolfImg) {
    $wolfImg.one('click', function () {
      // 改变索引，改变动画
      window.imgIndex = 5
      window.maxIndex = 9
      let flag = $(this).attr('src').indexOf('h') > 0
      let $score = $('.score')
      if (flag) {
        $score.text(parseInt($score.text()) + 10)
      } else {
        $score.text(parseInt($score.text()) - 10)
      }
    })
  }
})
