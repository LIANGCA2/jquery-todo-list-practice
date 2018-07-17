$(document)
    .ready(function () {



    });

$(document).on("click","#filters a",function () {
    $(this).parent("li").siblings().find("a").each(function(){
        $(this).removeClass("selected");
    })
 $(this).addClass("selected");
  if($(this).attr("data-filter")=="active"){
      $("ol").children().show();
      $("ol").children().filter(".checked").hide();
  }else if($(this).attr("data-filter")=="complete"){
      $("ol").children().hide();
      $("ol").children().filter(".checked").show();
  }else {
      $("ol").children().show();
  }
})


$(document).on("click","li",function(){
    $(this).removeAttr("disabled");
    //$(this).attr("disabled","disabled");
})
$(document).on("click","li",function () {
    $(this).attr("contentEditable",true);
})



$(document).on("change", ".done-todo", function () {
    if($(this).parent().attr("class")=="") {
        $(this).parent().addClass("checked");
    }else{
        $(this).parent().removeClass("checked");
    }
})

function generateUUID() {
    /*jshint bitwise:false */
    var i,
        random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12
            ? 4
            : (i === 16
                ? (random & 3 | 8)
                : random)).toString(16);
    }
    return uuid;
}

function addItem() {
    var id = generateUUID();
    if ($(".input-text").first().val() != "") {
        var li = " <li id=\"" + id + "\" class=\"\">\n" +
            "                <input name=\"done-todo\" type=\"checkbox\" class=\"done-todo\">" + $(".input-text").first().val() + "</li>";
        $("ol").append(li);
    } else {
        alert("添加内容为空！");
    }
}