//自调用——小蛇
		(function(){
			//存放小蛇的每个身体部分
			var elements = [];
			//小蛇的构造函数
			function Snake(width,height,direction){
				//蛇每个部分的宽高
				this.width=width||20;
				this.height=height||20;
				//蛇的身体——写成一个数组
				this.body=[
					{x:3,y:1,color:"orange"},//头
					{x:2,y:1,color:"yellow"},//身体
					{x:1,y:1,color:"yellow"},//身体
				]
				//蛇移动方向
				this.direction=direction||"right";
			}

			//用原型添加方法——蛇初始化方法
			Snake.prototype.init=function(map){
				//删除之前小蛇
				remove();


				//循环遍历创建div
				for(var i=0;i<this.body.length;i++){
					//数组中的每个数组元素都是一个对象
					var obj=this.body[i];
					//创建div
					var div=document.createElement("div");
					//将div加入到map地图中
					map.appendChild(div);
					//把div加入到map中
					div.style.position="absolute";
					div.style.width=this.width+'px';
					div.style.height=this.height+"px";
					//初始的横纵坐标
					div.style.left=obj.x*this.width+"px";
					div.style.top=obj.y*this.height+"px";
					//背景颜色
					div.style.backgroundColor=obj.color;
					//方向未知
					//姜div放到elements中方便之后删除
					elements.push(div);
				}
			};

			//为原型添加方法——改变蛇的头的坐标的位置
			Snake.prototype.move=function(food,map){
				//改变蛇的身体的坐标
				var i = this.body.length-1;//3——>2
				for(;i>0;i--){
					this.body[i].x=this.body[i-1].x;
					this.body[i].y=this.body[i-1].y
				}
				//判断方向——改变蛇的头的坐标
				switch(this.direction){
					case "right":
						this.body[0].x+=1;
						break;
					case "left":
						this.body[0].x-=1;
						break;					
					case "bottom":
						this.body[0].y+=1;
						break;						
					case "top":
						this.body[0].y-=1;
						break;						
				}

				/**
				 * 蛇吃食物
				 * 		判断有没有吃到食物
				 * 		小蛇的头的坐标和食物的坐标一致
				 */
				//项目的最后一步，所有一切准备就绪
				//小蛇头部横纵坐标
				var headX=this.body[0].x*this.width;
				var headY=this.body[0].y*this.height;
				//判断蛇和食物的位置是否相同
				if(headX==food.x&&headY==food.y){
					//获取小蛇尾巴
					var last=this.body[this.body.length-1];
					//把最后的设为复制一个，加到蛇的body最后
					//以对象的方式加入
					this.body.push({
							x:last.x,
							y:last.y,
							color:last.color
						});
					//把之前的食物删除,并且要在初始化一个新的食物
					//此时必须传map对象
					food.init(map);
				}
			};

			//私有函数————删除蛇
			function remove(){
				//删除map中的小蛇的每个div,同时删除elements数组中的每个元素,从蛇尾向蛇头方向删除div
				var i = elements.length-1;
				for(;i>=0;i--){
					//先从当前的子元素中找到该子元素的父级元素,然后再弄死这个子元素
					var ele = elements[i];
					//从map地图上删除这个子元素div
					ele.parentNode.removeChild(ele);
					elements.splice(i,1);	

				}
			}

			//将Snake暴露给window,外部可访问
			window.Snake = Snake;
		})();
