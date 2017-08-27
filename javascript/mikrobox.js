function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (o.scrollHeight)+"px";
}


document.querySelectorAll(".mikrojs-console").forEach( function(container) {
    code = container.getElementsByTagName("script")[0].innerHTML;
    
    container.innerHTML =
	'<textarea onkeyup="textAreaAdjust(this)" cols="80" style="overflow:hidden">' + code + '</textarea>' +
	'<br>' +
	'<button>execute</button>' +
	'<br>' +
	'<textarea cols="80" style="overflow:hidden" cols="80" readonly="true" id="outputarea"></textarea>'

    var inputarea = container.getElementsByTagName("textarea")[0];
    var outputarea = container.getElementsByTagName("textarea")[1];
    var button = container.getElementsByTagName("button")[0];

    button.onclick = function () {
	outputarea.value = mikrokosmos(inputarea.value).mkroutput;
	textAreaAdjust(outputarea);
    }
});

