(function(window) {
  /**
   *  Module
   *
   * Description
   */
  angular
    .module('todoApp', [])
    .controller('TodoController', ['$scope', '$location', TodoController]);


  function TodoController($scope, $location) {
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
      for (var i = 0; i < vm.taskList.length; i++) {
        if (vm.taskList[i].id === id) {
          vm.taskList.splice(i, 1);
        }
      }
    };

    // 4. 修改任务
    vm.editId = 0;
    vm.edit = function(id) {
      vm.editId = id;
    };

    vm.update = function() {
      vm.editId = 0;
    };

    // 全选、反选
    vm.allChecked = false;
    vm.checkAll = function() {
      vm.taskList.forEach(function(task) {
        task.isCompleted = vm.allChecked;
      });
    };

    // 6 清除已经完成任务
    vm.clearAll = function() {
      var temp = [];
      for (var i = 0; i < vm.taskList.length; i++) {
        if (!vm.taskList[i].isCompleted) {
          temp.push(vm.taskList[i]);
        }
      }
      vm.taskList = temp;
    };

    // 显示隐藏已完成项
    vm.isShow = function() {
      var temp = false;

      for (var i = 0; i < vm.taskList.length; i++) {
        if (vm.taskList[i].isCompleted) {
          temp = true;
          break;
        }
      }
      return temp;
    };

    // 7. 显示未完成任务数
    vm.geUnCompleted = function() {
      var count = 0;

      vm.taskList.forEach(function(task) {
        if (!task.isCompleted) {
          count++;
        }
      });
      return count;
    };

    // 8. 根据 hash 切换
    vm.selectedStatus = { isCompleted: undefined };
    vm.location = $location;
    vm.$watch('location.url()', function(newValue, oldValue) {
      switch (newValue) {
        case '/':
          vm.selectedStatus = { isCompleted: undefined };
          break;
        case '/active':
          vm.selectedStatus = { isCompleted: false };
          break;
        case '/completed':
          vm.selectedStatus = { isCompleted: true };
          break;
      }
    });


  }
})(window);
