var myApp = angular.module('myApp');  //создает модуль myApp
myApp            //определение модуля myApp
          .controller('MyController', ['$scope', 'myCart', function($scope, myCart){    //создает контроллер MyController
              $scope.items = [];		// создает пустой массив items в scope
              for(var i = 1; i < 11; i++){					//С первой по 10-ую позицию...
                $scope.items.push({id: i, name: "Товар №" + i, cost: 100 * i})  //добавляет нумерованные товары в массив и присваивает им цену
              }
              $scope.addToCart = function(item){	//Добавление товара в scope при нажатии на кнопку
                myCart.addItem(item);		//Добавление товара в корзину
              }
          }])
	     .service('myCart', ['$rootScope', function($rootScope){ //сервис myCart
				var cart = this;	//создает объект cart и делает его видимым для вложенных функций
				cart.list = [];  //создает пустой список в объекте cart 
				cart.addItem = function(itemToAdd){   //создание функции добавления в корзину по id товара
				  var existItems = cart.list.filter(function(itemInCart){    //массив существующих предметов в корзине
					return itemInCart.id == itemToAdd.id;   //сравнивает равен ли id товара в корзине и товара который мы добавляем
				  })
				  if(existItems.length){  //если похожий предмет уже в корзине...
					existItems[0].count++;  //тогда количество увеличивается на 1
				  } else {  					//иначе...
					itemToAdd.count = 1;  		//новый предмет становится в 1 экземпляре
					cart.list.push(itemToAdd);	//добавляет новый предмет в корзину
				  }
				  $rootScope.$emit('cartChanged', cart); //запуск события cartChanged
				}
				return cart;  //возвращает корзину
			  }])
          .directive('renderCart', ['$rootScope', function($rootScope){	 //директива renderCart
              return {
                restrict: 'E', //ограничение действия директивы по элементам
				template: //шаблон
				'<h2>Корзина:</h2>' + '<ul><li ng-repeat="cart_item in cart.list">{{cart_item.name}}-{{cart_item.count}} шт.</li></ul>', //заголовок и список
                link: function($scope, elem, attrs){   //Манипуляция с DOM
                  $rootScope.$on('cartChanged', function(event, cart){  //отслеживает событие cartChanged, изменение корзины
                    $scope.cart = cart;	 //добавляем корзину в scope
                  });
                }
              }
            }])