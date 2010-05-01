$.fn.extend({
  getCaretCoord: function() {
    var $this = this.get(0);
    var id = $this.id + "_caretcoord";
    var $pre = document.getElementById(id);
    if ($pre==null) {
      var $pre = document.createElement("pre");
      $pre.id = id;
      document.getElementsByTagName("body")[0].appendChild($pre);
      var styleOrg = getComputedStyle($this,"");
      var styleCpy = getComputedStyle($pre,"");
      $pre.style.left = $this.offsetLeft + "px"; 
      $pre.style.top = $this.offsetTop + "px";
      function capitalize(prop){
        return prop.replace(/-(.)/g, function(m, m1){
          return m1.toUpperCase()
        })
      };
      var properties = [
	    'width', 'height',
	    'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 
	    'border-left-style', 'border-right-style','border-top-style','border-bottom-style', 
	    'border-left-width', 'border-right-width','border-top-width','border-bottom-width', 
	    'font-family', 'font-size', 'line-height', 'letter-spacing', 'word-spacing'];
      for(var i in properties){
        $pre.style[capitalize(properties[i])] = 
	           styleOrg.getPropertyValue(properties[i]);
      }
      $pre.style.width = $this.offsetWidth;
      $pre.style.height = $this.offsetHeight;
      $pre.style.visibility="hidden";
      $pre.style.position = "absolute";
      $pre.scrollLeft = $this.scrollLeft;
      $pre.scrollTop = $this.scrollTop;
    }
    var selectionEnd = $this.selectionEnd;
    var value = $this.value;
    var cursor = document.createElement('span');
    cursor.innerHTML = '|';

    $pre.innerHTML = '';
    $pre.appendChild(document.createTextNode(value.substr(0,selectionEnd)));
    $pre.appendChild(cursor);

	var x = $this.offsetLeft + cursor.offsetLeft +2;
	var y = $this.offsetTop + cursor.offsetTop -2;
    return {x:x,y:y}
  }
});
