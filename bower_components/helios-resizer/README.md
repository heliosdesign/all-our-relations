**Bower** `helios-resizer`

## Resizer

Modular resize manager: register functions with Resizer to have them run on every (debounced) window resize, with cover/contain pixel dimensions passed to it.

Useful for `<canvas>` and supporting old browsers that don’t do `background-size: cover|contain`.

### How to Use

```
var resizer = new heliosResizer();

resizer.add('name', function(data){
	element.width = data.contain.w;
	element.height = data.contain.h;
});

```

### Methods

`add('name', function)`

`remove('name')`

### Data format

```
data = {
	cover : {
		w
		h
		t
		l
	},
	contain : {
		w
		h
		t
		l
	}
}
```