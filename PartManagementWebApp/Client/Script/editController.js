﻿(function(app) {
    var editController = function($scope, partService) {
        $scope.isEditable = function () { return $scope.edit && $scope.edit.part; };
        $scope.cancel = function () { $scope.edit.part = null; };
        $scope.save = function() {
            if ($scope.edit.part.Id) {
                updatePart();
            } else {
                createPart();
            }

        };
        var updatePart = function () {
            partService.update($scope.edit.part).success(function() {
                angular.extend($scope.part, $scope.edit.part);
                $scope.edit.part = null;
            });
        };
        var createPart = function () {
            partService.create($scope.edit.part).success(function (part) {
                $scope.parts.push(part);
                $scope.edit.part = null;
            });
        };
    };
    editController.$inject = ["$scope", "partService"];
    app.controller("editController", editController);
}(angular.module("partManagementApp")));
