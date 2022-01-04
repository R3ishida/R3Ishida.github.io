const numList= [ 
    {
        1:[1],
        2:[1],
        3:[1]

    },
    {
        0:[0,1],
        1:[0,1],
        2:[0,1],
        3:[0,1],
        4:[0,1]        
    },
    {
        1:[0,1],
        3:[1,2]
    }, 
    {
        1:[0,1],
        3:[0,1]
    },
    {
        0:[1],
        1:[1],
        3:[0,1],
        4:[0,1]
    },
    {
        1:[1,2],
        3:[0,1]
    },
    {
        1:[1,2],
        3:[1]
    },
    {
        1:[0,1],
        2:[0,1],
        3:[0,1],
        4:[0,1],
    },
    {
        1:[1],
        3:[1]
    },
    {
        1:[1],
        3:[0,1]
    }
]
if (numList[0][1] != null) {
    console.log("manko!!")
} else {
    console.log("unchi")
}

function makeTable(num) {
    table_str = "<table><tbody>"
    for(let i = 0; i<5; i++) {
        str = "<tr>"
        if(numList[num][i] != null) {
            for(let j=0; j<3; j++) {
                checked = 0
                //あるかどうかチェック,あれば追加
                for (let k=0; k<numList[num][i].length; k++) {
                    if( j == numList[num][i][k]) {
                        str += "<td class=\"white\"></td>"
                        checked = 1;
                        //console.log(i+"-"+j+"書きましたver1")
                        break
                    }
                }
                if(checked == 0) {
                    str += "<td class=\"through\"></td>"
                    //console.log(i+"-"+j+"書きましたver2")
                }
            }
        } else {
            for(let j=0; j<3; j++) {
                str += "<td class=\"through\"></td>"
                //console.log(i+"-"+j+"書きましたver2")
            }
        }
        str += "</tr>"
        table_str += str
    }
    table_str +=  "</tbody></table>"
    return table_str
}

function makeHour(hour) {
    hourcode = ""
    number1 = Math.floor(hour / 10);
    number2 = hour % 10
    console.log(number2)
    hourcode += "<div class=\"clock hours\"><div class=\"board hours-color\"></div>" + makeTable(number1) + "</div><div class=\"clock hours\"><div class=\"board hours-color\"></div>" + makeTable(number2) + "</div>"
    return hourcode
}

dots_code = "<div class=\"clock dots\"><table><tbody><tr><td class=\"dotshidden\"></td></tr><tr><td></td></tr><tr><td class=\"dotshidden\"></td></tr><tr><td></td></tr><tr><td class=\"dotshidden\"></td></tr></tbody></table></div>"

function makeMinutes(minutes) {
    minutescode = ""
    number3 = Math.floor(minutes / 10);
    number4 = minutes % 10
    console.log(number4)
    minutescode += "<div class=\"clock minutes\"><div class=\"board minutes-color\"></div>" + makeTable(number3) + "</div><div class=\"clock minutes\"><div class=\"board minutes-color\"></div>" + makeTable(number4) + "</div>"
    return minutescode
}

function setCSS() {
    hour_css = minutes / 60 * 25 + "vw"
    $(".hours-color").css("top", hour_css);
    minutes_css = seconds / 60 * 25 + "vw"
    $(".minutes-color").css("top", minutes_css);
}

var button = 0

btn_code = "<div class=\"button\"><div class=\"triangle\"></div></div>"


$(function() {
    $(".triangle").click(function() {
        console.log("クリックされました")
        button = 1
        setInterval("showClock()", 1000);
    })
})


//$(this).css("background-color", "rgba(255, 217, 0, 0.6)");
//こんな感じで色変えれる

colorList = [
    "black",
    "slategray",
    "skyblue",
    "greenyellow",
    "orange"
]

function setColor() {
    color_code = ""
    for(let i=0; i<5; i++) {
        color_code += "<div class=\"color "+ colorList[i] +"\" id=\"" + i + "\"></div>"
    }
    document.getElementById("color-holder").innerHTML = color_code;
}

setColor()
clicked = 0

$(function() {
    $(".color").click(function() {
        if(clicked == 0) {
            console.log("clicked!!")
            //open
            $('#0').animate({
                'left': '23vw'
            }, 300);
            $('#1').animate({
                'left': '17.5vw'
            }, 300);
            $('#2').animate({
                'left': '12vw'
            }, 300);
            $('#3').animate({
                'left': '6.5vw'
            }, 300);
            $('#4').animate({
                'left': '1vw'
            }, 300);
            clicked = 1
            $(".color").css("z-index","0")
        } else {
            var color_id = $(this).attr('id');
            color_num = Number(color_id)
            console.log(colorList[color_num]+"にしましたよ")
            $(".board").css("background-color",colorList[color_num])
            $(".dots").css("background-color",colorList[color_num])
            colorList.push(colorList[color_num])
            console.log(colorList)
            colorList.splice(color_num, 1)
            console.log(colorList)
            $(this).css("z-index","5")
            $('#0').animate({
                'left': '1vw'
            }, 300);
            $('#1').animate({
                'left': '1vw'
            }, 300);
            $('#2').animate({
                'left': '1vw'
            }, 300);
            $('#3').animate({
                'left': '1vw'
            }, 300);
            $('#4').animate({
                'left': '1vw'
            }, 300);
            clicked = 0
        }
    })
})

function showClock() {
    var now = new Date();
    hour = now.getHours()
    minutes = now.getMinutes()
    seconds = now.getSeconds()
    console.log(hour, minutes, seconds)
    if(button == 0) {
        html_code = makeHour(hour) + btn_code
    } else {
        html_code = makeHour(hour) + dots_code + makeMinutes(minutes)
    }
    document.getElementById("clock-holder").innerHTML = html_code;
    setCSS()
    $(".board").css("background-color",colorList[4])
    $(".dots").css("background-color",colorList[4])
}

showClock()
setInterval("showClock()", 60000);


/*
$('#box1').animate({
    'left': '500px'
}, 1500);*/