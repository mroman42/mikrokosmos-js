function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (o.scrollHeight)+"px";
}

document.querySelectorAll(".mikrojs-console").forEach( function(container) {
    code = container.getElementsByTagName("script")[0].innerHTML;
    
    container.innerHTML =
	'<textarea style="height:auto;">' + code + '</textarea>' +
	'<br>' +
	'<button>execute</button>' +
	'<br>' +
	'<textarea cols="80" style="overflow:hidden;resize:none" cols="80" readonly="true" id="outputarea"></textarea>'

    var inputarea = container.getElementsByTagName("textarea")[0];
    var outputarea = container.getElementsByTagName("textarea")[1];
    var button = container.getElementsByTagName("button")[0];

    var editor = CodeMirror.fromTextArea(inputarea, {lineNumbers: true});
    
    button.onclick = function () {
	editor.save();
	outputarea.value = mikrokosmos(inputarea.value).mkroutput;
	textAreaAdjust(outputarea);
    }
});
