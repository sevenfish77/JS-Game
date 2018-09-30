//自调用——游戏对象
		(function(){
			var that = null;//该变量的目的就是为了保存游戏Game的实例对象-------

			//游戏的构造函数
			function Game(map){
				this.food=new Food();//食物对象
				this.snake=new Snake();//蛇对象
				this.map=map;//地图对象

				that = this;//保存当前的实例对象到that变量中-----------------此时that就是this
			}

			//为原型对象添加方法——游戏初始化
			//		可以设置蛇和食物显示出来
			Game.prototype.init=function(){
				//初始化游戏
				//食物初始化
				this.food.init(this.map);
				//蛇初始化
				this.snake.init(this.map);

				//在这里调用蛇自动跑起来的方法
				this.runSnake(this.food,this.map);
				
				//调用设置用户按键，改变蛇移动方向的方法
				this.bindKey();
			};

			//添加原型方法————设置蛇自动跑起来
			Game.prototype.runSnake=function(food,map){
				//法一：
				// setInterval(function(){
				// 	that.snake.move(food,map);
				// 	that.snake.init(map);
				// },200);
				
				// 法二：此时的this是window对象
				//       利用bind方法传入了that对象，此时的this就是that
				 var timeId=setInterval(function(){
				 	this.snake.move(food,map);//移动小蛇
				 	this.snake.init(map);//初始化蛇

				 	//map横坐标最大值
				 	var maxX = map.offsetWidth/this.snake.width;//40
				 	//map纵坐标最大值
				 	var maxY = map.offsetHeight/this.snake.height;//
				 	//小蛇头的坐标
				 	var headX = this.snake.body[0].x;
				 	var headY = this.snake.body[0].y;

				 	//判断游戏如何结束
				 	//横坐标
				 	if(headX<0||headX>=maxX){
				 		//定时器停止
				 		clearInterval(timeId);
				 		//探出框
				 		alert("游戏结束")
				 	}
				 	//总坐标
					if(headY<0||headY>=maxY){
				 		//定时器停止
				 		clearInterval(timeId);
						//探出框
				 		alert("游戏结束")				 		
				 	}
				 	
				 }.bind(that),120);
			};

			//添加原型方法————设置用户按键，改变蛇移动方向
			Game.prototype.bindKey=function(){
				//注册一个按键按下的事件
				document.addEventListener("keydown",function(e){
					//这里的this是触发keydown的事件的对象——document
					//所以，这里的this是document

					//获取按键的值
					switch(e.keyCode){//判断键值
						case 37://左箭头
							this.snake.direction="left";
							break;
						case 38://上箭头
							this.snake.direction="top";
							break;						
						case 39://右箭头
							this.snake.direction="right";
							break;							
						case 40://下箭头
							this.snake.direction="bottom";
							break;							
					}
				}.bind(that),false);
			};

			//将Game暴露给window,外部可访问
			window.Game = Game;			
		}());
