var now = new Date();
var laterDay = new Date();
laterDay.setFullYear(now.getFullYear() + 60);

var app = angular.module('WebForms', []);

app.controller('FormControl', function($scope){
	//independent fields
	$scope.stateList = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
	$scope.future = laterDay;
	$scope.today = now;
	$scope.reschedLimit = now;
	
	//create an array for date objects
	$scope.newDay = null;
	$scope.unavailDates = [];
	
	//setup user's input values
	$scope.user = 
	{
		signedDate: now,
		unavailableOn: $scope.unavailDates
	};

	$scope.data = {};
	
	//add to the unavailable dates array
	$scope.addDate = function(newDay)
	{	
	
		$scope.unavailDates = trimArray($scope.unavailDates);
		//prevent null inputs and repeat values
		if(newDay && !containsElement(newDay, $scope.unavailDates))
		{
			$scope.unavailDates.push(newDay);
			$scope.newDay = null;
		}
		if(containsElement(newDay, $scope.unavailDates))
		{
			$scope.newDay = null;
		}
		
	};
	
	$scope.removeDate = function(index)
	{	
		$scope.unavailDates[index] = null;
		$scope.unavailDates = trimArray($scope.unavailDates);	
	};
	
	$scope.submit = function(user)
	{
		//trim array to ensure no null values
		$scope.unavailDates = trimArray($scope.unavailDates);
		//copy the current user's data to the data variable
		$scope.data = angular.copy(user);
		//clear user data from cache
		$scope.user = {signedDate: now, unavailableOn: $scope.unavailDates};
		//export data from browser
		$scope.unavailDates = [];
	};
	
	$scope.changeLimit = function()
	{
		if($scope.user.hearingDate)
		{
			$scope.reschedLimit = $scope.user.hearingDate;
		}
	};
	
});

$(document).ready(function () 
{
	displayCharCount = function()
	{
		var len = $('textarea[name=requestBox]').val().length;
		var output = "";
		var min = 50;
		var max = 200;
		
		if(len < min)
		{
			output = "Characters needed: " + (min - len);
		}
		else if(len > min)
		{
			output = "Characters remaining: " + (max - len);
		}
		
		$("label.requestMsg").text(output);
	}
});

trimArray = function(mixedArray)
{
	var treatedArray = mixedArray.sort().reverse();
	var invalidItems = 0;
	for(index in treatedArray)
	{
		if((typeof(treatedArray[index]) == 'undefined') || (treatedArray[index] === null))
		{
			invalidItems++;
		}
	}
	treatedArray.splice(0, invalidItems);
	return treatedArray;
};

containsElement = function(item, container)
{
	for(index in container)
	{
		var dummyDay = container[index];
		
		if(item.getTime() === container[index].getTime())
		{
			return true;
		}
	}
	
	return false;
}
