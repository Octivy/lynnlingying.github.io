

$('#dowebok').fullpage({
       verticalCentered:true,
       navigation: true,
       anchors:["page1","page2","page3","page4","page5"],
       scrollingSpeed: 500,
       css3: true,
    loopBottom:true,
       afterRender: function(){
               $('#home_info,#home_info_box').animate({opacity:'1',width:'900px'},1000,function(){
                           $.each($("#home_info_box>li"),function(){
                               $(this).slideDown(1000);
                           })
                     });
                     $("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
		},
       afterLoad:function(anchorLink,index){
              if (index==1) {
                     $("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
              }
              if (index==2) {
                     $("aside a").eq(1).addClass("selected").siblings().removeClass("selected");
                          $(".about-title").animate({"width":"400px"},500,function(){
                              $(".about-info").animate({opacity:'1'},200,function(){
                              $.each($(".about-me-list>li"),function(){
                                  $(this).slideDown(500);
                              })
                          });
                    })

              }
              if (index==3) {
                    $("aside a").eq(2).addClass("selected").siblings().removeClass("selected");
                  //x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
                  function DrowProcess(x,y,radius,process,backColor,proColor,fontColor,fontText){
                      var canvas = document.getElementById('canvas');
                      if (canvas.getContext) {
                          var cts = canvas.getContext('2d');
                      }else{
                          return;
                      }

                      cts.beginPath();
                      // 坐标移动到圆心
                      cts.moveTo(x, y);
                      // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针
                      cts.arc(x, y, radius, 0, Math.PI * 2, false);
                      cts.closePath();
                      // 填充颜色
                      cts.fillStyle = backColor;
                      cts.fill();

                      cts.beginPath();
                      // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形
                      cts.moveTo(x, y);
                      // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形
                      cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);
                      cts.closePath();
                      cts.fillStyle = proColor;
                      cts.fill();

                      //填充背景白色
                      cts.beginPath();
                      cts.moveTo(x, y);
                      cts.arc(x, y, radius - (radius * 0.26), 0, Math.PI * 2, true);
                      cts.closePath();
                      cts.fillStyle = 'rgba(255,255,255,1)';
                      cts.fill();

                      // 画一条线
                      cts.beginPath();
                      cts.arc(x, y, radius-(radius*0.30), 0, Math.PI * 2, true);
                      cts.closePath();
                      // 与画实心圆的区别,fill是填充,stroke是画线
                      cts.strokeStyle = backColor;
                      cts.stroke();

                      //在中间写字
                      cts.font = "bold 9pt Arial";
                      cts.fillStyle = fontColor;
                      cts.textAlign = 'center';
                      cts.textBaseline = 'middle';
                      cts.moveTo(x, y);
                      cts.fillText(fontText, x, y);

                  }
                  function create(){
                      DrowProcess(60,60,55,90,'#ddd','#719057','#719057','html');
                      DrowProcess(60,180,55,85,'#ddd','#7E97AD','#7E97AD','css');
                      DrowProcess(60,300,55,75,'#ddd','#E7B8A8','#E7B8A8','jquery');
                      DrowProcess(60,420,55,60,'#ddd','#EAC28E','#EAC28E','javascript');
                  }
                  create();
                  //tap 组件
                  function Tap($node){
                      this.navWrap = $node;
                      this.cards =this.navWrap.parents('.wrap').find('.card');
                      this.bind();
                  }
                  Tap.prototype = {
                      bind : function(){
                          var $this = this;
                          this.navWrap.on('click','li',function(){
                              var idx = $(this).index();
                              $(this).addClass('active').siblings().removeClass('active');
                              $this.cards.removeClass('active');
                              $this.cards.eq(idx).addClass('active');
                          })
                      }
                  };
                  $('.nav').each(function(){
                      new Tap($(this));
                  });
              }
              if (index==4) {
                    $("aside a").eq(3).addClass("selected").siblings().removeClass("selected");

              }
               if (index==5) {
                    $("aside a").eq(4).addClass("selected").siblings().removeClass("selected");
              }
       },
});
$(function(){
    //顶部标题文字切换
    $("#header_p").mouseover(function(){
        $("#header_p1").html("Resume");
        $("#header_p2").html("前端工程师");
    }).mouseout(function(){
        $("#header_p1").html("Lynn");
        $("#header_p2").html("个人简历");
    })
    $(".flip").on("click",function(){
        $(".experience_content .card").toggleClass("flipped");
    });
// 头像切换
    $("#home_photo2").hover(function(){
        $(this).fadeTo(1000,1);
    },function(){
        $(this).stop(true,false).fadeTo(1000,0);
    });
})
