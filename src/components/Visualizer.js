import React, { Component } from 'react';

const settings = {
	stick_color: "#000000",
	visualizer_colors: {
		upward: "#0000FF",
		downward: "#FF0000",
		airdodge: "#00cccc",
		aerial: "#8B008B",
		hitstunEnd: "#A52A2A",
		actionable: "#FF8A00",
		attackerFAF: "#0066FF",
		stage: "#008000",
		platform: "#008000",
		noWallJump: "#800080",
		semitechable: "#FF0000",
		camera: "#0000FF",
		blastzone: "#FF0000",
		meteorBlastzone: "#800080",
		ko: "#FF0000",
		diLine: "#000000",
		interpolatedLine: "#808080",
		background: "#FCFCFF",
		spawn: '#0000FF',
		respawn: '#000000',
		item: '#AA0077',
		material: '#000000',
		ledge: '#856a0b',
		steve: '#000000'
	}
};

const MaterialColors = {
	Basic : "#008000",
	Rock :  "#9e6c15", 
	Grass :  "#00e673",
	Soil :  "#c76538",
	Wood :  "#c18c71", 
	LightMetal :  "#b3b3b3", 
	HeavyMetal :  "#595959", 
	Carpet :  "#bd7575", 
	Alien :  "#a06e6e", 
	MasterFortress :  "#008000", 
	Water :  "#1ad1ff", 
	Soft :  "#ffcce6", 
	TuruTuru :  "#d0ff61", 
	Snow :  "#bdfffe", 
	Ice :  "#00e6e2", 
	GameWatch :  "#5b5757", 
	Oil :  "#272525", 
	Cardboard :  "#b8e39c", 
	Damage1 :  "#b32400", 
	Damage2 :  "#b32400", 
	Damage3 :  "#b32400", 
	Electroplankton :  "#58ff4d", 
	Cloud :  "#fffcb3", 
	Subspace :  "#008000", 
	Brick :  "#ab823b", 
	NoEffects :  "#e0e0e0", 
	NES8Bit :  "#955b5b", 
	Grate :  "#d092d9", 
	Sand :  "#ffdf7f", 
	Homerun :  "#008000", 
	Asase_Earth :  "#008000", 
	Hurt :  "#b32400", 
	RingMat :  "#008000", 
	Glass :  "#dfc333",
	SlipMelee :  "#787878",
	SpiritsPoison :  "#008000",
	SpiritsFlame :  "#008000",
	SpiritsShock :  "#008000",
	SpiritsSleep :  "#008000",
	SpiritsFreeze :  "#008000",
	SpiritsAdhesion :  "#008000",
	Ice_No_Slip :  "#7aebff",
	Cloud_No_Through :  "#fbf893",
	Mementos :  "#a544c1"
};

//Formulas

function LineMidPoint(p1, p2) {
	return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
}

function LineLength(p1, p2) {
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

var LineTypes = {
	FLOOR : 1,
	WALL : 2,
	CEILING : 3
};

//Get if line is floor, wall or ceiling
function GetLineType(material) {

	if (!material.ceiling && !material.wall) {
		return LineTypes.FLOOR;
	}
	if (material.wall) {
		return LineTypes.WALL;
	}
	return LineTypes.CEILING;
}


class DataPoint {
	constructor(vertex, text, color) {
		this.vertex = vertex;
		this.position = {
			x: vertex.x,
			y: -vertex.y
		};
		this.vertex.x = +this.vertex.x.toFixed(6);
		this.vertex.y = +this.vertex.y.toFixed(6);
		this.text = text.replace(/%x/g, this.vertex.x).replace(/%y/g, this.vertex.y);
		if (color === undefined)
			this.color = "#000000";
		else
			this.color = color;
	}
}

class Visualizer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stage : props.stage
		};

		this.stage = props.stage;

		this.canvasRef = React.createRef();

	}

	UpdateRef(){
		if(this.canvasRef.current !== null){
			this.canvas = this.canvasRef.current;
			this.context = this.canvas.getContext("2d");
		}
	}

	SetFuncs(){
		if(this.canvasRef.current !== null){
			this.canvas = this.canvasRef.current;
			this.context = this.canvas.getContext("2d");
			this.scale = 1;
			this.origin = { x: 0, y: 0 };
			this.dragging = false;
			this.prevPosition = { x: 0, y: 0 };

			this.size = window.innerWidth * 0.9;
			this.canvas.width = this.size;
			this.canvas.height = this.size * 9 /16;
			this.canvasSize = { width: this.canvas.width, height: this.canvas.height };	

			this.dataPoints = [];

			this.background = null;

			this.prevTranslate = { x: 0, y: 0 };
			this.prevScale = 1;

			//Touch variables
			this.prevTouch = null;
			this.prevTouch2 = null;

			this.isClick = false;
			this.isZoomingTouch = false;

			var visualizer = this;

			this.SetSize = function (size) {
				this.size = size * 0.9;
				this.canvas.width = this.size;
				this.canvas.height = this.size * 9 / 16;
				this.canvasSize = { width: this.canvas.width, height: this.canvas.height };
				this.Reset();
				this.Draw();
			}
	
			this.Reset = function () {
				//Reset transform matrix
				this.context.setTransform(1, 0, 0, 1, 0, 0);
	
				//reset variables
				this.prevTranslate = { x: 0, y: 0 };
				this.prevScale = 1;
				this.origin = { x: 0, y: 0 };
				this.scale = 1;
	
				this.context.translate(this.canvasSize.width / 2, this.canvasSize.height/2);
	
				this.prevTranslate.x += this.canvasSize.width / 2;
				this.prevTranslate.y += this.canvasSize.height / 2;
	
				this.origin.x += -this.canvasSize.width / 2;
				this.origin.y += -this.canvasSize.height / 2;
			}
	
			this.Reset();
	
			this.SetBackground = function (color) {
				this.background = color;
				this.ClearCanvas();
				this.Draw();
			}
	
			this.ClearCanvas = function () {
				this.context.save();
				this.context.setTransform(1, 0, 0, 1, 0, 0);
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
				if (this.background) {
					this.context.fillStyle = this.background;
					this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
				}
	
				this.context.strokeStyle = "#000000";
				this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
	
				this.context.restore();
			}
	
			this.GetCanvasPoint = function (x, y) {
				return { x: x, y: y };
			}
	
			this.MoveTo = function (x, y) {
				this.context.moveTo( x, -y);
			}
	
			this.LineTo = function (x, y) {
				this.context.lineTo(x, -y);
			}
	
			this.SetStage = function (stage) {
				this.stage = stage;
	
				this.dataPoints = [];
	
				if (stage === null)
					return;
	
				for (var i = 0; i < stage.collisions.length; i++) {
					for (var j = 0; j < stage.collisions[i].vertex.length - 1; j++) {
	
						this.dataPoints.push(new DataPoint({ x: stage.collisions[i].vertex[j][0], y: stage.collisions[i].vertex[j][1] }, "%x, %y", settings.visualizer_colors.stage));
	
						var collisionType = GetLineType(stage.collisions[i].materials[j]);
						var collisionText = "Floor";
	
						if (collisionType === LineTypes.WALL)
							collisionText = "Wall";
						else if (collisionType === LineTypes.CEILING)
							collisionText = "Ceiling";

						var materialType = stage.collisions[i].materials[j].material;
						if(materialType === null)
							materialType = "null";
	
						if (stage.collisions[i].materials[j].noWallJump && collisionType === LineTypes.WALL) {
							collisionText = materialType + " Wall jump disabled";
							this.dataPoints.push(new DataPoint(LineMidPoint({ x: stage.collisions[i].vertex[j][0], y: stage.collisions[i].vertex[j][1] },
								{ x: stage.collisions[i].vertex[j + 1][0], y: stage.collisions[i].vertex[j + 1][1] }), collisionText, settings.visualizer_colors.noWallJump));
						}else{
							collisionText = materialType;
							this.dataPoints.push(new DataPoint(LineMidPoint({ x: stage.collisions[i].vertex[j][0], y: stage.collisions[i].vertex[j][1] },
								{ x: stage.collisions[i].vertex[j + 1][0], y: stage.collisions[i].vertex[j + 1][1] }), collisionText, MaterialColors[materialType]));
						}
	
						/*if ((collisionType === LineTypes.WALL || collisionType === LineTypes.CEILING) && stage.collisions[i].materials[j].length <= 7 && !stage.collisions[i].materials[j].noWallJump) {
							collisionText = "Semi-techable wall";
							this.dataPoints.push(new DataPoint(LineMidPoint({ x: stage.collisions[i].vertex[j][0], y: stage.collisions[i].vertex[j][1] },
								{ x: stage.collisions[i].vertex[j + 1][0], y: stage.collisions[i].vertex[j + 1][1] }), collisionText, settings.visualizer_colors.semitechable));
						}*/
	
	
	
					}
					if ((stage.collisions[i].vertex[stage.collisions[i].vertex.length - 1][0] !== stage.collisions[i].vertex[0][0]) ||
						stage.collisions[i].vertex[stage.collisions[i].vertex.length - 1][1] !== stage.collisions[i].vertex[0][1]) {
	
						this.dataPoints.push(new DataPoint({ x: stage.collisions[i].vertex[stage.collisions[i].vertex.length - 1][0], y: stage.collisions[i].vertex[stage.collisions[i].vertex.length - 1][1] }, "%x, %y", settings.visualizer_colors.stage));
	
					}
	
				}
	
				if (stage.platforms !== undefined) {
					for (i = 0; i < stage.platforms.length; i++) {
						for (j = 0; j < stage.platforms[i].vertex.length - 1; j++) {
	
							this.dataPoints.push(new DataPoint({ x: stage.platforms[i].vertex[j][0], y: stage.platforms[i].vertex[j][1] }, stage.platforms[i].name + " (%x, %y)", settings.visualizer_colors.platform));
	
	
							materialType = stage.platforms[i].materials[j].material;
							if(materialType === null)
								materialType = "null";

							collisionText = materialType + " - " + stage.platforms[i].name;
							this.dataPoints.push(new DataPoint(LineMidPoint({ x: stage.platforms[i].vertex[j][0], y: stage.platforms[i].vertex[j][1] },
								{ x: stage.platforms[i].vertex[j + 1][0], y: stage.platforms[i].vertex[j + 1][1] }), collisionText, MaterialColors[materialType]));
	

	
						}
						if ((stage.platforms[i].vertex[stage.platforms[i].vertex.length - 1][0] !== stage.platforms[i].vertex[0][0]) ||
							stage.platforms[i].vertex[stage.platforms[i].vertex.length - 1][1] !== stage.platforms[i].vertex[0][1]) {
	
							this.dataPoints.push(new DataPoint({ x: stage.platforms[i].vertex[stage.platforms[i].vertex.length - 1][0], y: stage.platforms[i].vertex[stage.platforms[i].vertex.length - 1][1] }, stage.platforms[i].name + " (%x, %y)", settings.visualizer_colors.platform));
	
						}
	
	
	
					}
				}
	
				this.dataPoints.push(new DataPoint({ x: stage.camera[0], y: stage.camera[2] }, "Camera bounds (%x, %y)", settings.visualizer_colors.camera));
				this.dataPoints.push(new DataPoint({ x: stage.camera[1], y: stage.camera[2] }, "Camera bounds (%x, %y)", settings.visualizer_colors.camera));
				this.dataPoints.push(new DataPoint({ x: stage.camera[1], y: stage.camera[3] }, "Camera bounds (%x, %y)", settings.visualizer_colors.camera));
				this.dataPoints.push(new DataPoint({ x: stage.camera[0], y: stage.camera[3] }, "Camera bounds (%x, %y)", settings.visualizer_colors.camera));
	
				this.dataPoints.push(new DataPoint({ x: stage.blast_zones[0], y: stage.blast_zones[2] }, "Blast zone (%x, %y)", settings.visualizer_colors.blastzone));
				this.dataPoints.push(new DataPoint({ x: stage.blast_zones[1], y: stage.blast_zones[2] }, "Blast zone (%x, %y)", settings.visualizer_colors.blastzone));
				this.dataPoints.push(new DataPoint({ x: stage.blast_zones[1], y: stage.blast_zones[3] }, "Blast zone (%x, %y)", settings.visualizer_colors.blastzone));
				this.dataPoints.push(new DataPoint({ x: stage.blast_zones[0], y: stage.blast_zones[3] }, "Blast zone (%x, %y)", settings.visualizer_colors.blastzone));
	
				this.dataPoints.push(new DataPoint({ x: stage.blast_zones[0], y: 0 }, "Left Blast zone (%x)", settings.visualizer_colors.blastzone));
				this.dataPoints.push(new DataPoint({ x: stage.blast_zones[1], y: 0 }, "Right Blast zone (%x)", settings.visualizer_colors.blastzone));
				this.dataPoints.push(new DataPoint({ x: 0, y: stage.blast_zones[2] }, "Top Blast zone (%y)", settings.visualizer_colors.blastzone));
				this.dataPoints.push(new DataPoint({ x: 0, y: stage.blast_zones[3] }, "Bottom Blast zone (%y)", settings.visualizer_colors.blastzone));

				if (stage.camera[3] - 25 >= stage.blast_zones[3])
					this.dataPoints.push(new DataPoint({ x: 0, y: stage.camera[3] - 25 }, "Special blast zone for meteor smashed opponents (%y)", settings.visualizer_colors.meteorBlastzone));


				if(stage.spawns !== undefined){
					for(i=0;i<stage.spawns.length;i++){
						this.dataPoints.push(new DataPoint({x: stage.spawns[i][0], y: stage.spawns[i][1]}, "Spawn " + i + " (%x, %y)", settings.visualizer_colors.spawn));
					}
				}

				if(stage.respawns !== undefined){
					for(i=0;i<stage.respawns.length;i++){
						this.dataPoints.push(new DataPoint({x: stage.respawns[i][0], y: stage.respawns[i][1]}, "Respawn " + i + " (%x, %y)", settings.visualizer_colors.respawn));
					}
				}

				if(stage.items !== undefined){
					for(i=0;i<stage.items.length;i++){
						for(j=0;j<stage.items[i].sections.length;j++){
							for(var k=0;k<stage.items[i].sections[j].points.length;k++){
								this.dataPoints.push(new DataPoint({x: stage.items[i].sections[j].points[k][0], y: stage.items[i].sections[j].points[k][1]},
									 "Item spawn section " + j + " point " + k + " (%x, %y)", settings.visualizer_colors.item));
							}
						}
					}
				}
	
	
				this.ClearCanvas();
				this.Draw();
			}
	
			this.DrawGrid = function () {

				if (this.scale > 1.5) {
	
					var step = 10;
					
					if (this.scale > 7) {
						step = 1;
					} else if (this.scale > 3) {
						step = 5;
					}
	
					for (var x = -500; x <= 500; x += step) {
	
						if (x % 100 === 0) {
							this.context.globalAlpha = 0.6;
							this.context.strokeStyle = '#FF0000';
							this.context.lineWidth = 0.5;
						} else {
							if (x % 50 === 0) {
								this.context.globalAlpha = 0.5;
								this.context.lineWidth = 0.2;
								this.context.strokeStyle = '#0000FF';
							} else {
								this.context.strokeStyle = '#000000';
								this.context.globalAlpha = 0.3;
								if (x % 10 === 0) {
									this.context.lineWidth = 0.1;
								} else {
									this.context.lineWidth = 0.05;
								}
							}
						}
	
						this.context.beginPath();
	
						this.MoveTo(x, -500);
	
						this.LineTo(x, 500);
	
						this.context.stroke();
					}
	
					for (var y = -500; y <= 500; y += step) {
	
						if (y % 100 === 0) {
							this.context.strokeStyle = '#FF0000';
							this.context.lineWidth = 0.5;
							this.context.globalAlpha = 0.6;
						} else {
							if (y % 50 === 0) {
								this.context.lineWidth = 0.2;
								this.context.strokeStyle = '#0000FF';
								this.context.globalAlpha = 0.5;
							} else {
								this.context.strokeStyle = '#000000';
								this.context.globalAlpha = 0.3;
								if (y % 10 === 0) {
									this.context.lineWidth = 0.1;
								} else {
									this.context.lineWidth = 0.05;
								}
							}
						}
	
						this.context.beginPath();
	
						this.MoveTo(-500, y);
	
						this.LineTo(500, y);
	
						this.context.stroke();
					}
				}
	
				this.context.lineWidth = 1;
				this.context.globalAlpha = 1;
			}
	
			this.Draw = function () {

				//this.DrawGrid();
	
				var stage = this.stage;
				var context = this.context;
	
				context.lineWidth = 2 / context.prevScale;
	
				if (this.stage !== null) {
	
					for (var i = 0; i < stage.collisions.length; i++) {
						context.strokeStyle = settings.visualizer_colors.stage;

						//var materialType = stage.collisions[i].materials[j].material;
						//if(materialType === null)
						//	context.strokeStyle = settings.visualizer_colors.stage;
						//else
						//	context.strokeStyle = MaterialColors[materialType];	

						
						context.beginPath();
						for (var j = 0; j < stage.collisions[i].vertex.length - 1; j++) {
							if (j === 0)
								this.MoveTo(stage.collisions[i].vertex[j][0], stage.collisions[i].vertex[j][1]);
							else
								this.LineTo(stage.collisions[i].vertex[j][0], stage.collisions[i].vertex[j][1]);
	
	
						}
						this.LineTo(stage.collisions[i].vertex[j][0], stage.collisions[i].vertex[j][1]);
	
						context.stroke();
					}
	
	
					for (i = 0; i < stage.collisions.length; i++) {
						context.strokeStyle = settings.visualizer_colors.stage;
						for (j = 0; j < stage.collisions[i].vertex.length - 1; j++) {
	
							var materialType = stage.collisions[i].materials[j].material;
							if (stage.collisions[i].materials[j].noWallJump) {
								//Wall jump disabled walls
								context.strokeStyle = settings.visualizer_colors.noWallJump;
								context.beginPath();
								this.MoveTo(stage.collisions[i].vertex[j][0], stage.collisions[i].vertex[j][1]);
								this.LineTo(stage.collisions[i].vertex[j + 1][0], stage.collisions[i].vertex[j + 1][1]);
								context.closePath();
								context.stroke();
							}
							else if(materialType !== null){
								//Terrains
								context.strokeStyle = MaterialColors[materialType];
								context.beginPath();
								this.MoveTo(stage.collisions[i].vertex[j][0], stage.collisions[i].vertex[j][1]);
								this.LineTo(stage.collisions[i].vertex[j + 1][0], stage.collisions[i].vertex[j + 1][1]);
								context.closePath();
								context.stroke();
							}

							if(stage.collisions[i].materials[j].leftLedge){
								context.fillStyle = settings.visualizer_colors.ledge;
								context.beginPath();
								visualizer.context.arc(stage.collisions[i].vertex[j][0], -stage.collisions[i].vertex[j][1], 1, 0, Math.PI * 2);
								context.closePath();
								context.fill();
							}

							if(stage.collisions[i].materials[j].rightLedge){
								context.fillStyle = settings.visualizer_colors.ledge;
								context.beginPath();
								visualizer.context.arc(stage.collisions[i].vertex[j+1][0], -stage.collisions[i].vertex[j+1][1], 1, 0, Math.PI * 2);
								context.closePath();
								context.fill();
							}
							/*else if (stage.collisions[i].materials[j].length <= 7 && (stage.collisions[i].materials[j].wall || stage.collisions[i].materials[j].ceiling) && !stage.collisions[i].materials[j].noWallJump) {
								//Small walls
								context.strokeStyle = settings.visualizer_colors.semitechable;
								context.beginPath();
								this.MoveTo(stage.collisions[i].vertex[j][0], stage.collisions[i].vertex[j][1]);
								this.LineTo(stage.collisions[i].vertex[j + 1][0], stage.collisions[i].vertex[j + 1][1]);
								context.closePath();
								context.stroke();
							}*/
							
	
	
						}
	
	
					}
	
					context.strokeStyle = settings.visualizer_colors.platform;
	
					if (stage.platforms !== undefined) {
						for (i = 0; i < stage.platforms.length; i++) {
							context.beginPath();
							for (j = 0; j < stage.platforms[i].vertex.length - 1; j++) {
								if (j === 0)
									this.MoveTo(stage.platforms[i].vertex[j][0], stage.platforms[i].vertex[j][1]);
	
								this.LineTo(stage.platforms[i].vertex[j + 1][0], stage.platforms[i].vertex[j + 1][1]);
	
							}
							context.closePath();
							context.stroke();
	
						}

						for (i = 0; i < stage.platforms.length; i++) {

							for (j = 0; j < stage.platforms[i].vertex.length - 1; j++) {

								var materialType = stage.platforms[i].materials[j].material;
								if(materialType !== null){
									//Terrains
									context.strokeStyle = MaterialColors[materialType];
									context.beginPath();
									this.MoveTo(stage.platforms[i].vertex[j][0], stage.platforms[i].vertex[j][1]);
									this.LineTo(stage.platforms[i].vertex[j + 1][0], stage.platforms[i].vertex[j + 1][1]);
									context.closePath();
									context.stroke();
								}

								if(stage.platforms[i].materials[j].leftLedge){
									context.fillStyle = settings.visualizer_colors.ledge;
									context.beginPath();
									visualizer.context.arc(stage.platforms[i].vertex[j][0], -stage.platforms[i].vertex[j][1], 1, 0, Math.PI * 2);
									context.closePath();
									context.fill();
								}
	
								if(stage.platforms[i].materials[j].rightLedge){
									context.fillStyle = settings.visualizer_colors.ledge;
									context.beginPath();
									visualizer.context.arc(stage.platforms[i].vertex[j+1][0], -stage.platforms[i].vertex[j+1][1], 1, 0, Math.PI * 2);
									context.closePath();
									context.fill();
								}
							}
							
						}
					}
	
					context.strokeStyle = settings.visualizer_colors.camera;
					context.beginPath();
					this.MoveTo(stage.camera[0], stage.camera[2]);
					this.LineTo(stage.camera[1], stage.camera[2]);
					this.LineTo(stage.camera[1], stage.camera[3]);
					this.LineTo(stage.camera[0], stage.camera[3]);
					context.closePath();
					context.stroke();
	
					context.strokeStyle = settings.visualizer_colors.blastzone;
					context.beginPath();
					this.MoveTo(stage.blast_zones[0], stage.blast_zones[2]);
					this.LineTo(stage.blast_zones[1], stage.blast_zones[2]);
					this.LineTo(stage.blast_zones[1], stage.blast_zones[3]);
					this.LineTo(stage.blast_zones[0], stage.blast_zones[3]);
					context.closePath();
					context.stroke();

					//Blast zone for spikes
				if (stage.camera[3] - 20 > stage.blast_zones[3]) {
					context.strokeStyle = settings.visualizer_colors.meteorBlastzone;
					context.beginPath();
					this.MoveTo(stage.blast_zones[0], stage.camera[3] - 25);
					this.LineTo(stage.blast_zones[1], stage.camera[3] - 25);
					context.closePath();
					context.stroke();
				}
/*
					context.strokeStyle = settings.visualizer_colors.steve;
					context.beginPath();
					

					var block_max_up = Math.ceil(((stage.blast_zones[2] - stage.camera[2]) + 60) * .5 / 10) * 10;
					var block_max_down = Math.ceil(((stage.blast_zones[3] - stage.camera[3]) - 30) * .5 / 10) * 10;

					console.log(block_max_up, block_max_down);

					this.MoveTo(stage.camera[0]+30, block_max_up);
					this.LineTo(stage.camera[1]-30, block_max_up);
					this.LineTo(stage.camera[1]-30, block_max_down);
					this.LineTo(stage.camera[0]+30, block_max_down);
					context.closePath();
					context.stroke();
				*/

					context.lineWidth = 0.75;
					context.globalAlpha = 0.5;

					//Spawns
					if(stage.spawns !== undefined){
						for(i=0;i<stage.spawns.length;i++){
							context.strokeStyle = settings.visualizer_colors.spawn;
							context.fillStyle = settings.visualizer_colors.spawn;

							context.beginPath();
							this.MoveTo(stage.spawns[i][0] - 2, stage.spawns[i][1]);
							this.LineTo(stage.spawns[i][0] - 2, stage.spawns[i][1] + 6);
							this.LineTo(stage.spawns[i][0] + 2, stage.spawns[i][1] + 6);
							this.LineTo(stage.spawns[i][0] + 2, stage.spawns[i][1]);
							context.closePath();
							context.fill();
						}
					}

					//Respawns
					if(stage.respawns !== undefined){
						for(i=0;i<stage.respawns.length;i++){
							context.strokeStyle = settings.visualizer_colors.respawn;

							context.globalAlpha = 1;
							//Respawn platform
							context.beginPath();
							this.MoveTo(stage.respawns[i][0] - 4, stage.respawns[i][1] + 2);
							this.LineTo(stage.respawns[i][0] - 4, stage.respawns[i][1]);
							this.LineTo(stage.respawns[i][0] + 4, stage.respawns[i][1]);
							this.LineTo(stage.respawns[i][0] + 4, stage.respawns[i][1] + 2);
							//context.closePath();
							context.stroke();

							//Respawn
							context.strokeStyle = settings.visualizer_colors.spawn;
							context.fillStyle = settings.visualizer_colors.spawn;
							context.globalAlpha = 0.5;

							context.beginPath();
							this.MoveTo(stage.respawns[i][0] - 2, stage.respawns[i][1]);
							this.LineTo(stage.respawns[i][0] - 2, stage.respawns[i][1] + 6);
							this.LineTo(stage.respawns[i][0] + 2, stage.respawns[i][1] + 6);
							this.LineTo(stage.respawns[i][0] + 2, stage.respawns[i][1]);
							context.closePath();
							context.fill();
						}
					}

					context.globalAlpha = 1;

					//Item spawns
					if(stage.items !== undefined){
						for(i=0;i<stage.items.length;i++){
							context.strokeStyle = settings.visualizer_colors.item;

							for(j=0;j<stage.items[i].sections.length;j++){

								context.beginPath();
								for(var k=0;k<stage.items[i].sections[j].points.length;k++){
									if(k===0)
										this.MoveTo(stage.items[i].sections[j].points[k][0], stage.items[i].sections[j].points[k][1]+2);
									else
										this.LineTo(stage.items[i].sections[j].points[k][0], stage.items[i].sections[j].points[k][1]+2);
										
									this.LineTo(stage.items[i].sections[j].points[k][0], stage.items[i].sections[j].points[k][1]+2);
									
									
								}

								for(k=stage.items[i].sections[j].points.length-1;k>=0;k--){
									this.LineTo(stage.items[i].sections[j].points[k][0], stage.items[i].sections[j].points[k][1]-2);
									this.LineTo(stage.items[i].sections[j].points[k][0], stage.items[i].sections[j].points[k][1]-2);
									
									
								}

								
								context.closePath();
								context.stroke();

							}
						}
					}
				}
				
				context.lineWidth = 1;
			}

			this.Zoom = function(z){
	
				var x = visualizer.canvas.width / 2;
				var y = visualizer.canvas.height / 2;
	
				var zoom = z;
	
				if (visualizer.scale * zoom >= 0.7 && visualizer.scale * zoom <= 20) {
	
					visualizer.ClearCanvas();
	
					visualizer.context.translate(visualizer.origin.x, visualizer.origin.y);
	
					visualizer.prevTranslate.x += visualizer.origin.x;
					visualizer.prevTranslate.y += visualizer.origin.y;
	
					visualizer.context.scale(zoom, zoom);
					visualizer.prevScale *= zoom;
	
					visualizer.context.translate(
						-(x / visualizer.scale + visualizer.origin.x - x / (visualizer.scale * zoom)),
						-(y / visualizer.scale + visualizer.origin.y - y / (visualizer.scale * zoom))
					);
	
					visualizer.prevTranslate.x += -(x / visualizer.scale + visualizer.origin.x - x / (visualizer.scale * zoom));
					visualizer.prevTranslate.y += -(y / visualizer.scale + visualizer.origin.y - y / (visualizer.scale * zoom));
	
					visualizer.origin.x = (x / visualizer.scale + visualizer.origin.x - x / (visualizer.scale * zoom));
					visualizer.origin.y = (y / visualizer.scale + visualizer.origin.y - y / (visualizer.scale * zoom));
					visualizer.scale *= zoom;
	
					visualizer.Draw();
				}
			}
	
	
			//Events
	
			this.canvas.onwheel = function (event) {
				event.preventDefault();
	
				var x = visualizer.canvas.width / 2;
				var y = visualizer.canvas.height / 2;

				var s = /firefox/i.test(navigator.userAgent) ? 5 : 120;
	
				var wheel = -event.deltaY / s;
	
				var zoom = 1 + wheel / 20;
	
				if (visualizer.scale * zoom >= 0.7 && visualizer.scale * zoom <= 20) {
	
					visualizer.ClearCanvas();
	
					visualizer.context.translate(visualizer.origin.x, visualizer.origin.y);
	
					visualizer.prevTranslate.x += visualizer.origin.x;
					visualizer.prevTranslate.y += visualizer.origin.y;
	
					visualizer.context.scale(zoom, zoom);
					visualizer.prevScale *= zoom;
	
					visualizer.context.translate(
						-(x / visualizer.scale + visualizer.origin.x - x / (visualizer.scale * zoom)),
						-(y / visualizer.scale + visualizer.origin.y - y / (visualizer.scale * zoom))
					);
	
					visualizer.prevTranslate.x += -(x / visualizer.scale + visualizer.origin.x - x / (visualizer.scale * zoom));
					visualizer.prevTranslate.y += -(y / visualizer.scale + visualizer.origin.y - y / (visualizer.scale * zoom));
	
					visualizer.origin.x = (x / visualizer.scale + visualizer.origin.x - x / (visualizer.scale * zoom));
					visualizer.origin.y = (y / visualizer.scale + visualizer.origin.y - y / (visualizer.scale * zoom));
					visualizer.scale *= zoom;
	
					visualizer.Draw();
				}
	
	
			}
	
			this.canvas.onmousedown = function (event) {
				var mousex = event.clientX - visualizer.canvas.offsetLeft;
				var mousey = event.clientY - visualizer.canvas.offsetTop;
				visualizer.prevPosition.x = mousex;
				visualizer.prevPosition.y = mousey;
				visualizer.dragging = true;
			}
	
			this.canvas.ondblclick = function (event) {
				event.preventDefault();
				visualizer.Reset();
			}
	
			this.canvas.onmouseup = function (event) {
				visualizer.dragging = false;
			}
	
			this.canvas.onmousemove = function (event) {
				if (visualizer.dragging) {
					//Drag event
	
					visualizer.ClearCanvas();
	
					var mousex = event.clientX - visualizer.canvas.offsetLeft;
					var mousey = event.clientY - visualizer.canvas.offsetTop;
	
					visualizer.context.translate(- (visualizer.prevPosition.x - mousex) / visualizer.scale, - (visualizer.prevPosition.y - mousey) / visualizer.scale);
	
					visualizer.prevTranslate.x += - (visualizer.prevPosition.x - mousex) / visualizer.scale;
					visualizer.prevTranslate.y += - (visualizer.prevPosition.y - mousey) / visualizer.scale;
	
					visualizer.origin.x += (visualizer.prevPosition.x - mousex) / visualizer.scale;
					visualizer.origin.y += (visualizer.prevPosition.y - mousey) / visualizer.scale;
	
					visualizer.prevPosition.x = mousex;
					visualizer.prevPosition.y = mousey;
	
	
	
					visualizer.Draw();
				} else {
					//Tooltips
	
					var r = 10;
	
					mousex = event.clientX - visualizer.canvas.getBoundingClientRect().left;
					mousey = event.clientY - visualizer.canvas.getBoundingClientRect().top;
	
					var x = (mousex / visualizer.prevScale) - visualizer.prevTranslate.x;
					var y = (mousey / visualizer.prevScale) - visualizer.prevTranslate.y;
	
					var points = [];
	
					for (var i = 0; i < visualizer.dataPoints.length; i++) {
						var point = visualizer.dataPoints[i];
						var l = LineLength({ x: x, y: y }, point.position);
	
						if (l < r)
							points.push({ p: -1, r: l, point: point });
					}
	
					points.sort(function (a, b) {
						if (b.point.vertex.y - a.point.vertex.y !== 0)
							return b.point.vertex.y - a.point.vertex.y;
						else
							return a.point.vertex.x - b.point.vertex.x;
					});

	
					points.sort(function (a, b) { //Sort them by distance closer to mouse pointer
						return b.r - a.r;
					});
	
					if (points.length > 5) { //Limit to 5 tooltips
						points.splice(0, points.length - 5);
	
					}
	
					points.sort(function (a, b) {
						if (b.p !== -1 && a.p !== -1) {
							return a.p - b.p; //Sort launch points by frame
						}
						else {
	
							if (b.p === -1 && a.p === -1) { //Sort stage points by height
								if (b.point.vertex.y - a.point.vertex.y !== 0)
									return b.point.vertex.y - a.point.vertex.y;
								else
									return a.point.vertex.x - b.point.vertex.x;
							}
	
							if (b.p === -1) //Stage points have higher priority
								return 1;
							else
								return -1;
	
						}
					});
	
					visualizer.ClearCanvas();
					visualizer.Draw();
	
					visualizer.context.save();
	
					visualizer.context.setTransform(1, 0, 0, 1, 0, 0);
	
					if (points.length > 0) {
						var d = 20;
						var dy = (points.length - 1) * d;
						var dx = 5;
	
						//Draw tooltips
	
						//Point
						for (i = 0; i < points.length; i++) {
							point = points[i].point;
	
							visualizer.context.fillStyle = "#000000";
							visualizer.context.beginPath();
							//stageCanvas.context.fillRect(((point.position.x + stageCanvas.prevTranslate.x) * stageCanvas.prevScale) - stageCanvas.prevScale / 4, ((point.position.y + stageCanvas.prevTranslate.y) * stageCanvas.prevScale) - stageCanvas.prevScale / 4, stageCanvas.prevScale / 2, stageCanvas.prevScale / 2);
							visualizer.context.arc((point.position.x + visualizer.prevTranslate.x) * visualizer.prevScale, (point.position.y + visualizer.prevTranslate.y) * visualizer.prevScale, 2 / visualizer.prevScale, 0, Math.PI * 2);
							visualizer.context.closePath();
							visualizer.context.fill();
	
						}
	
						//Line
						for (i = 0; i < points.length; i++) {
							point = points[i].point;
	
							visualizer.context.strokeStyle = point.color; //Color
	
							visualizer.context.beginPath();
	
							visualizer.context.moveTo(((point.position.x + visualizer.prevTranslate.x) * visualizer.prevScale), ((point.position.y + visualizer.prevTranslate.y) * visualizer.prevScale));
	
							visualizer.context.lineTo(mousex + dx, mousey - dy);
	
							visualizer.context.closePath();
	
							visualizer.context.stroke();
	
	
							dy -= d;
						}
	
						dy = (points.length - 1) * d;
	
						var fontlength = 12 / 2;
	
						//Tooltip
						for (i = 0; i < points.length; i++) {
							point = points[i].point;
	
							visualizer.context.strokeStyle = point.color; //Color
							visualizer.context.fillStyle = point.color; //Color
	
							visualizer.context.clearRect(mousex + dx, mousey - dy - d / 2, point.text.length * fontlength + dx * 4, d);
	
							visualizer.context.strokeRect(mousex + dx, mousey - dy - d / 2, point.text.length * fontlength + dx * 4, d);
	
							visualizer.context.font = "12px sans-serif";
							visualizer.context.fillText(point.text, mousex + dx * 2, mousey - dy + 5);
							//stageCanvas.context.fillText(point.text, (point.position.x + stageCanvas.prevTranslate.x) * stageCanvas.prevScale, ((point.position.y + stageCanvas.prevTranslate.y) * stageCanvas.prevScale) - 5 - y);
	
							dy -= d;
						}
					}
	
					visualizer.context.restore();
	
				}
			}

			//Touch events

			this.canvas.ontouchstart = function(event){
				event.preventDefault();

				if(event.touches.length === 1 && event.touches[0].identifier === 0){

					visualizer.isClick = true;

					//Tooltips
	
					var r = 10;
	
					var mousex = event.touches[0].clientX - visualizer.canvas.getBoundingClientRect().left;
					var mousey = event.touches[0].clientY - visualizer.canvas.getBoundingClientRect().top;
	
					var x = (mousex / visualizer.prevScale) - visualizer.prevTranslate.x;
					var y = (mousey / visualizer.prevScale) - visualizer.prevTranslate.y;
	
					var points = [];
	
					for (var i = 0; i < visualizer.dataPoints.length; i++) {
						var point = visualizer.dataPoints[i];
						var l = LineLength({ x: x, y: y }, point.position);
	
						if (l < r)
							points.push({ p: -1, r: l, point: point });
					}
	
					points.sort(function (a, b) {
						if (b.point.vertex.y - a.point.vertex.y !== 0)
							return b.point.vertex.y - a.point.vertex.y;
						else
							return a.point.vertex.x - b.point.vertex.x;
					});

	
					points.sort(function (a, b) { //Sort them by distance closer to mouse pointer
						return b.r - a.r;
					});
	
					if (points.length > 5) { //Limit to 5 tooltips
						points.splice(0, points.length - 5);
	
					}
	
					points.sort(function (a, b) {
						if (b.p !== -1 && a.p !== -1) {
							return a.p - b.p; //Sort launch points by frame
						}
						else {
	
							if (b.p === -1 && a.p === -1) { //Sort stage points by height
								if (b.point.vertex.y - a.point.vertex.y !== 0)
									return b.point.vertex.y - a.point.vertex.y;
								else
									return a.point.vertex.x - b.point.vertex.x;
							}
	
							if (b.p === -1) //Stage points have higher priority
								return 1;
							else
								return -1;
	
						}
					});
	
					visualizer.ClearCanvas();
					visualizer.Draw();
	
					visualizer.context.save();
	
					visualizer.context.setTransform(1, 0, 0, 1, 0, 0);
	
					if (points.length > 0) {
						var d = 20;
						var dy = (points.length - 1) * d;
						var dx = 5;
	
						//Draw tooltips
	
						//Point
						for (i = 0; i < points.length; i++) {
							point = points[i].point;
	
							visualizer.context.fillStyle = "#000000";
							visualizer.context.beginPath();
							//stageCanvas.context.fillRect(((point.position.x + stageCanvas.prevTranslate.x) * stageCanvas.prevScale) - stageCanvas.prevScale / 4, ((point.position.y + stageCanvas.prevTranslate.y) * stageCanvas.prevScale) - stageCanvas.prevScale / 4, stageCanvas.prevScale / 2, stageCanvas.prevScale / 2);
							visualizer.context.arc((point.position.x + visualizer.prevTranslate.x) * visualizer.prevScale, (point.position.y + visualizer.prevTranslate.y) * visualizer.prevScale, 2 / visualizer.prevScale, 0, Math.PI * 2);
							visualizer.context.closePath();
							visualizer.context.fill();
	
						}
	
						//Line
						for (i = 0; i < points.length; i++) {
							point = points[i].point;
	
							visualizer.context.strokeStyle = point.color; //Color
	
							visualizer.context.beginPath();
	
							visualizer.context.moveTo(((point.position.x + visualizer.prevTranslate.x) * visualizer.prevScale), ((point.position.y + visualizer.prevTranslate.y) * visualizer.prevScale));
	
							visualizer.context.lineTo(mousex + dx, mousey - dy);
	
							visualizer.context.closePath();
	
							visualizer.context.stroke();
	
	
							dy -= d;
						}
	
						dy = (points.length - 1) * d;
	
						var fontlength = 12 / 2;
	
						//Tooltip
						for (i = 0; i < points.length; i++) {
							point = points[i].point;
	
							visualizer.context.strokeStyle = point.color; //Color
							visualizer.context.fillStyle = point.color; //Color
	
							visualizer.context.clearRect(mousex + dx, mousey - dy - d / 2, point.text.length * fontlength + dx * 4, d);
	
							visualizer.context.strokeRect(mousex + dx, mousey - dy - d / 2, point.text.length * fontlength + dx * 4, d);
	
							visualizer.context.font = "12px sans-serif";
							visualizer.context.fillText(point.text, mousex + dx * 2, mousey - dy + 5);
							//stageCanvas.context.fillText(point.text, (point.position.x + stageCanvas.prevTranslate.x) * stageCanvas.prevScale, ((point.position.y + stageCanvas.prevTranslate.y) * stageCanvas.prevScale) - 5 - y);
	
							dy -= d;
						}
					}
	
					visualizer.context.restore();
				}

				
			}

			this.canvas.ontouchend = function(event){
				event.preventDefault();

				for(var i=0;i<event.changedTouches.length;i++){

					if(event.changedTouches[i].identifier === 0){
						visualizer.prevTouch = null;
						visualizer.dragging = false;
						
						
					}else if(event.changedTouches[i].identifier === 1){
						visualizer.prevTouch2 = null;
						visualizer.isZoomingTouch = false;
					}

				}
			}

			this.canvas.ontouchmove = function(event){
				event.preventDefault();

				visualizer.isClick = false;

				if(event.touches.length === 1){ //Translate

					if(visualizer.prevTouch !== null){

						//Drag event
							
						visualizer.ClearCanvas();
							
						var mousex = (event.touches[0].pageX - visualizer.prevTouch.pageX);
						var mousey = (event.touches[0].pageY - visualizer.prevTouch.pageY);

						visualizer.context.translate(- (- mousex) / visualizer.scale, - (- mousey) / visualizer.scale);

						visualizer.prevTranslate.x += - (- mousex) / visualizer.scale;
						visualizer.prevTranslate.y += - (- mousey) / visualizer.scale;

						visualizer.origin.x += (- mousex) / visualizer.scale;
						visualizer.origin.y += (- mousey) / visualizer.scale;

						visualizer.prevPosition.x = mousex;
						visualizer.prevPosition.y = mousey;



						visualizer.Draw();

						visualizer.prevTouch = event.touches[0];

					}
					else{
						visualizer.prevTouch = event.touches[0];
						visualizer.dragging = true;
					}
				} else if (event.touches.length === 2){ //Zoom
					
					if(visualizer.prevTouch !== null && visualizer.prevTouch2 !== null){
						var initial = Math.sqrt(Math.pow(visualizer.prevTouch.pageX - visualizer.prevTouch2.pageX,2) + Math.pow(visualizer.prevTouch.pageY - visualizer.prevTouch2.pageY,2));

						var currentDistance = Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX,2) + Math.pow(event.touches[0].pageY - event.touches[1].pageY,2));

						var zoom = currentDistance/initial;

						visualizer.Zoom(zoom);

						visualizer.prevTouch = event.touches[0];
						visualizer.prevTouch2 = event.touches[1];
					}
					else{
						visualizer.prevTouch = event.touches[0];
						visualizer.prevTouch2 = event.touches[1];

						visualizer.isZoomingTouch = true;
					}
				}

				
			}
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.stage !== state.stage) {
		  return {
			  stage : props.stage
		  };
		}

		return null;
	  }

	componentDidMount(){

		var visualizer = this;

		window.onresize = function(event){
			visualizer.SetSize(window.innerWidth);
			visualizer.Zoom(visualizer.size / 750);
		}
		
		this.SetFuncs();

		this.SetStage(this.state.stage);
		this.Zoom(this.size / 750);
	}

	componentDidUpdate(){
		this.UpdateRef();

		this.SetStage(this.state.stage);
		this.Draw();
	}

	render(){
		return (
			<canvas ref={this.canvasRef}></canvas>
		)
	}
}

export default Visualizer;