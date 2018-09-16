~function(){
  $.fn.carousel = function(){
    this.each(function(){
      function Carousel($ct){
        this.$ct = $ct;
        this.$imgCt = this.$ct.find(".img-ct");
        this.$items = this.$imgCt.children();
        this.$next = this.$ct.find(".next");
        this.$pre = this.$ct.find(".pre");
        this.$bullet = this.$ct.find(".bullet");
        this.imgWidth = this.$items.width();
        this.imgCount = this.$items.length;
        this.isAnimate = false;
        this.curIdx = 0;
        this.init();
      }

      Carousel.prototype.init = function() {
        this.$imgCt.prepend(this.$items.last().clone() );
        this.$imgCt.append(this.$items.first().clone() );

        this.imgRealCount = this.$imgCt.children().length;
        this.$imgCt.css({
          left: 0-this.imgWidth,
          width: this.imgRealCount*this.imgWidth
        });
        this.bind();
        this.autoShow();
      };
    Carousel.prototype.bind = function(){
      var self = this;
      this.$pre.on("click",function(){
        self.showPre();
      })
      this.$next.on("click",function(){
        self.showNext()
      });
      this.$bullet.find("li").on("click",function(){
        var idx = $(this).index();
        if(idx>self.curIdx){
          self.showNext(idx-self.curIdx);
        }else if(idx<self.curIdx){
          self.showPre(self.curIdx-idx);
        }
      })
    };

    Carousel.prototype.showPre = function(stepCount) {
      var self = this;
      var stepCount = stepCount || 1;
      if(!this.isAnimate){
        this.isAnimate = true;
        this.$imgCt.animate({left: "+="+(self.imgWidth*stepCount)},150,function(){
          self.curIdx = (self.imgCount+self.curIdx - stepCount) % self.imgCount;
          if(self.curIdx===(self.imgCount-1)){
            self.$imgCt.css({left: 0-self.imgWidth*self.imgCount});
          }

          self.isAnimate = false;
          self.setBullet();
        })
      }
    }

    Carousel.prototype.showNext = function(stepCount){
      var self = this;
      var stepCount = stepCount || 1;
      if(!this.isAnimate) {
        this.isAnimate = true;
        this.$imgCt.animate({left:"-="+(stepCount*self.imgWidth)},150,function(){
          self.curIdx = (stepCount+self.curIdx)%self.imgCount;
          if(self.curIdx ===0){
            self.$imgCt.css({left: 0-self.imgWidth})
          }
          self.isAnimate = false;
          self.setBullet();
        })
      }
    };

    Carousel.prototype.setBullet = function(){
      this.$bullet.find("li").removeClass("active").eq(this.curIdx).addClass("active");
    }

    Carousel.prototype.autoShow = function(){
      var self = this;
      setInterval(function(){
        self.showNext();
      },3500)
    }
    new Carousel($(this))

    });
  }
}()

$(".carousel").carousel();