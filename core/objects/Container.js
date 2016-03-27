function Container()
{
	THREE.Object3D.call(this);

	this.updateable = true;
	this.name = "container";
	this.icon = "editor/files/icons/script/script.png";
}

//Function Prototype
Container.prototype = Object.create(THREE.Object3D.prototype);
Container.prototype.update = update;

//Update Container
function update()
{
	for(var i = 0; i < this.children.length; i++)
	{
		if(this.children[i].updateable)
		{
			this.children[i].update();
		}
	}
}