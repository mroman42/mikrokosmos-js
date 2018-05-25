# mikrokosmos-js
Call [Mikrokosmos](https://github.com/M42/mikrokosmos) from Javascript. 

## How to embed Mikrokosmos on a web page
You need the following code on your header

~~~ html
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/addon/mode/simple.min.js"></script>
<script src="https://mroman42.github.io/mikrokosmos-js/codemirrormkr.js"></script>
<script language="javascript" src="https://mroman42.github.io/mikrokosmos-js/rts.js"></script>
<script language="javascript" src="https://mroman42.github.io/mikrokosmos-js/lib.js"></script>
<script language="javascript" src="https://mroman42.github.io/mikrokosmos-js/out.js"></script>
<script language="javascript" src="https://mroman42.github.io/mikrokosmos-js/runmain.js"></script>
<script language="javascript" src="https://mroman42.github.io/mikrokosmos-js/mikrobox.js" defer></script>
~~~

and, optionally, the following `css`

~~~ html
<style>
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
  overflow-y: hidden;
}
.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
.mikrojs-console {
  height: auto;
}
pre {
    box-shadow: 0px 0px 1px #eee;
}
</style>
~~~

The `mikrokosmos` JS function will be then available.
Then, you can write Mikrokosmos code pads on your document as

~~~ html
<div class="mikrojs-console">
<script type="text/mikrokosmos">
(\x.x)
... your code
</script>
</div>
~~~
