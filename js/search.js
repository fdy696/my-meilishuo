~function(){
  $.fn.SearchUi = function(){
    $this = $(this);
    $select_items = $(".search-select-list a",$this)
    $select_items.on("click",function(){
      $select_items.removeClass("active");
      $(this).addClass("active");
      const val = $(this).html();
      val==="店铺"?$(".search-input").attr("placeholder","10万家好店等你来挑"):$(".search-input").attr("placeholder","你和世界,只有一个旅行箱的距离")  
    })
  }

  $(".search-box").SearchUi();
}()
