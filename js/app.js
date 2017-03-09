(function(window) {
  /**
   *  Module
   *
   * Description
   */
  angular
    .module('todoApp', [])
    .controller('TodoController', ['$scope', TodoController]);


  function TodoController($scope) {
    // 1. 展示todo列表
    var vm = $scope;

    var taskList = [
      { id: 1, name: '吃饭', isCompleted: false },
      { id: 2, name: '睡觉', isCompleted: false },
      { id: 3, name: '打豆豆', isCompleted: true },
      { id: 4, name: '撸啊撸', isCompleted: false }
    ];

    vm.taskList = taskList;

    // 2. 添加任务
    vm.newTask = '';
    vm.add = function() {
      if (vm.newTask.trim() === '') {
        return;
      }
      // 设置 id
      var id, len = vm.taskList.length;
      if (len === 0) {
        id = 1;
      } else {
        id = vm.taskList[len - 1].id + 1;
      }

      vm.taskList.push({ id: id, name: vm.newTask, isCompleted: false });
      vm.newTask = '';
    };

    // 3. 删除任务
    vm.remove = function(id) {
      console.log(1);
      for (var i = 0; i < vm.taskList.length; i++) {
        if (vm.taskList[i].id === id) {
          vm.taskList.splice(i, 1);
        }
      }
    }; 




  }
})(window);
