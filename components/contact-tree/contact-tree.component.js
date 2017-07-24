
function ContactTreeController($scope,$http,$compile){
        var ctrl = this;
        this.myContactsList = [];
        this.hideList = [];
        this.focused  = false;
    	this.contacts = [
        {
            id:1,
            name: "Friends",
            type: "Group",
            contacts: [
                {id:2, name: "Udi", type: "Contact"},
                {id:3, name: "Tommy", type: "Contact"},
                {
                    id:6,
                    name: "Old Friends",
                    type: "Group",
                    contacts: [
                        {id:7, name: "Itay", type: "Contact"},
                    ]
                },
            ]
        },
        {
            id:4,
            name: "Family",
            type: "Group",
            contacts: [
                {id:5, name: "Roni", type: "Contact"},
            ]
        },
        {id: 8, name: "Ori", type: "Contact"},
    ];
var info = {};
var createContactNode = function(node,parentId){
    info = {"id":node.id,"name":node.name,"type":node.type,"parent":parentId};
    ctrl.myContactsList.push(info);
    if(node.type == "Group"){
       iterateContactNode(node.contacts, node.id);
    }
};
var iterateContactNode = function(node ,parentId){
    angular.forEach(node, function(object) {
    createContactNode(object , parentId);
});
};
iterateContactNode(this.contacts, null);
 
this.showManu = function(){
angular.forEach(this.myContactsList, function(root){
    if(root.parent == null){
        var myEl = angular.element(document.getElementById('menu'));
        var html = '<ul><li id="'+root.id+'" ><a href="#" ng-click="vm.hideShow('+root.id+')">'+root.name+'</a></li></ul>';
        var element = $compile(html)($scope);
        myEl.append(element);
    }
  })
};
this.hideShow = function(id){
    var element = document.getElementById(id).getElementsByTagName('a')[0];
    if(ctrl.hideList.indexOf(id)==-1){
        //element.className = "focused";
        getLi(id);
        ctrl.hideList.push(id);
    }
    else{
    //element.className = "";
     var classHide = document.getElementById(id);
     var x = classHide.getElementsByTagName("ul");
     for(var i = x.length; i>=1; i--){
        console.log(i);
        classHide.removeChild(classHide.childNodes[i]);
        }
     ctrl.hideList.splice(ctrl.hideList.indexOf(id),1);
    }
}                
function getLi(root){
angular.forEach(ctrl.myContactsList, function(r){
        if(r.parent == root){
            var myEl = angular.element(document.getElementById(r.parent));
            var html = '<ul class="'+r.parent+'"><li id="'+r.id+'"><a href="#" ng-click="vm.hideShow('+r.id+')">'+r.name+'</a></li></ul>';
            var element = $compile(html)($scope);
            myEl.append(element);
    }
})
}   
};
myApp.component('contactTree',{
	templateUrl:'components/contact-tree/contact-tree.html',
	controller:ContactTreeController,
	controllerAs:'vm'
});
