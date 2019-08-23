//** Create the divs that will hold the progress rings */

let percent = 95;
height = 2.5;

for (let i = 0; i < 12; i++) {
	let parent = document.getElementById('container');
	let id = 'container' + i;
	let child = document.createElement('div');
	child.id = id;
	child.style.width = percent + '%';
	child.style.height = percent + '%';
	child.style.top = height + '%';
	child.style.marginLeft = height + '%';
	child.style.marginRight = height + '%';

	percent -= 5;
	height += 2.5;
	child.style.position = 'absolute';
	child.className = 'ring';
	parent.appendChild(child);
}
