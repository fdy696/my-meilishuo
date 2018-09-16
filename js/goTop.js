~function fn(){
  $.fn.gotop = function(){
    function GoTop($node){
      this.$ct = $node;
      this.$target;
      this.init()
      this.bind()
    }
    GoTop.prototype.init = function(){
      this.$target = $('<li class="go-top"><a href="javascript: void(0)"><i class="iconfont icon-huidaodingbu"></i></a></li>').css({display:"none",border:0});
			this.$ct.append(this.$target);
    }
    GoTop.prototype.bind = function(){
      var self = this;
      $(window).on("scroll",function(){
        var scrollTop = $(window).scrollTop();
        console.log(scrollTop)
        scrollTop>100?self.$target.show():self.$target.hide();
      });
      this.$target.on("click",function(){
        $(window).scrollTop(0);
      })
    }

    new GoTop(this);
  }
}()

$(".sidebar ul").gotop()
