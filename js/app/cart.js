var myApp = angular.module('myApp');  //������� ������ myApp
myApp            //����������� ������ myApp
          .controller('MyController', ['$scope', 'myCart', function($scope, myCart){    //������� ���������� MyController
              $scope.items = [];		// ������� ������ ������ items � scope
              for(var i = 1; i < 11; i++){					//� ������ �� 10-�� �������...
                $scope.items.push({id: i, name: "����� �" + i, cost: 100 * i})  //��������� ������������ ������ � ������ � ����������� �� ����
              }
              $scope.addToCart = function(item){	//���������� ������ � scope ��� ������� �� ������
                myCart.addItem(item);		//���������� ������ � �������
              }
          }])
	     .service('myCart', ['$rootScope', function($rootScope){ //������ myCart
				var cart = this;	//������� ������ cart � ������ ��� ������� ��� ��������� �������
				cart.list = [];  //������� ������ ������ � ������� cart 
				cart.addItem = function(itemToAdd){   //�������� ������� ���������� � ������� �� id ������
				  var existItems = cart.list.filter(function(itemInCart){    //������ ������������ ��������� � �������
					return itemInCart.id == itemToAdd.id;   //���������� ����� �� id ������ � ������� � ������ ������� �� ���������
				  })
				  if(existItems.length){  //���� ������� ������� ��� � �������...
					existItems[0].count++;  //����� ���������� ������������� �� 1
				  } else {  					//�����...
					itemToAdd.count = 1;  		//����� ������� ���������� � 1 ����������
					cart.list.push(itemToAdd);	//��������� ����� ������� � �������
				  }
				  $rootScope.$emit('cartChanged', cart); //������ ������� cartChanged
				}
				return cart;  //���������� �������
			  }])
          .directive('renderCart', ['$rootScope', function($rootScope){	 //��������� renderCart
              return {
                restrict: 'E', //����������� �������� ��������� �� ���������
				template: //������
				'<h2>�������:</h2>' + '<ul><li ng-repeat="cart_item in cart.list">{{cart_item.name}}-{{cart_item.count}} ��.</li></ul>', //��������� � ������
                link: function($scope, elem, attrs){   //����������� � DOM
                  $rootScope.$on('cartChanged', function(event, cart){  //����������� ������� cartChanged, ��������� �������
                    $scope.cart = cart;	 //��������� ������� � scope
                  });
                }
              }
            }])