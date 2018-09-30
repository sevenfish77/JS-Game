//自调用——食物
		(function(){
			//用于保存每份食物小方块
			var elements = [];

			//食物作为一个对象，有 宽 ，高 ，横坐标 ，纵坐标 ，颜色
			//1.定义构造函数
			function Food(width,height,x,y,color){
				//初始值
				this.width=width||20;
				this.height=height||20;
				this.x=x||0;
				this.y=y||0;
				this.color=color||"green";
			};

			//利用原型给构造函数添加初始方法（作用：在页面显示食物）
			//因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
			Food.prototype.init=function(map){
			   //先删除这个小食物，再随机产生小方块
			   //外部无法访问的函数
			    remove();

				//先创建，再放置
				//首先创建div
				var div = document.createElement("div");
				//然后把div添加到.map中
				map.appendChild(div);
				//再然后设置div的样式
				div.style.width=this.width+"px";
				div.style.height=this.height+"px";
				div.style.backgroundColor=this.color;

				//将小方块脱离文档流
				div.style.position="absolute";
				//将横纵坐标随机
				this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
				this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
				div.style.left=this.x+"PX";
				div.style.top=this.y+"px";

				//把div push到数组element中
				elements.push(div);
			};
			
			//删除食物——私有函数
			function remove(){
				//element中有食物
				for(var i=0;i<elements.length;i++){
					var ele = elements[i];
					//找到这个子元素的父级元素,然后删除这个子元素
					ele.parentNode.removeChild(ele);
					//再次把elements中的这个子元素也要删除
					elements.splice(i,1);
				}
			}



			//把Food暴露给浏览器，令外外部使用
			window.Food=Food;
		}());
