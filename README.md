[http://antarctic-design.co.uk/biovis-workshop15/](http://antarctic-design.co.uk/biovis-workshop15/)

[http://jsfiddle.net/eamonnmag/p9uy6o9n/](http://jsfiddle.net/eamonnmag/p9uy6o9n/)


```
<div id="test">
    <svg width="400" height="400">
        <g>
            <circle r="10" cx="60" cy="190"></circle>
        </g>
    </svg>
</div>
```

```
python -m SimpleHTTPServer 8000
```
and 

http://localhost:8000/D3/wheat.html


To specify a integer/float from a string in the dataset, before the variable, we add a "+"

```
.attr('transform', function (d) { 
	    		return "translate(" + x(+d.Date) + "," + y(+d.Percent) + ")";})
```