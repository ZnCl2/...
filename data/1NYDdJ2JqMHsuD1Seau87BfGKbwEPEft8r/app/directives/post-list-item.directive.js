app.directive('postListItem', ['$rootScope',
    function($rootScope) {

        // site header controller
        var controller = function($scope,$element) {
            $scope.openPostModal = function(post){
                $rootScope.$broadcast('openPostModal',post);
            };
        };

        var template =  '<div class="post-item-wrapper">' +
                            '<div class="post-item-header">' +
                                '<h3>' +
                                    '<a ng-click="openPostModal(post)">{{post.post_title}}</a>' +
                                '</h3>' + 
                                '<a ng-if="view === \'account\' && section === \'posts\'" class="edit-pencil" href="/{{page.site_info.address}}/index.html?view:edit+section=posts+item_id={{post.post_id}}"><i class="icon2 pencil"></i></a>' +
                                '<div class="icon" favorites ng-init="getUserPostFavorite(post)">' + 
                                    '<a ng-click="favoritePost(post)">' +
                                        '<span ng-if="post.user_favorite"><i class="icon2 favorite" aria-hidden="true"></i></span>' +
                                        '<span ng-if="!post.user_favorite"><i class="icon2 non-favorite" aria-hidden="true"></i></span>' +
                                    '</a>' +
                                '</div>' +                            
                            '</div>' +
                            '<figure ng-click="openPostModal(post)">' +
                                '<a>' +
                                    '<img ng-if="post.file_name" src="merged-{{page.site_info.content.merger_name}}/{{post.file_cluster}}/data/users/{{post.file_user_id}}/{{post.file_name}}"/>' +
                                    '<img ng-if="!post.file_name" src="assets/img/zite/no-app.png"/>' +
                                '</a>' +
                            '</figure>' +
                            '<div class="post-item-subheader">' +
                                '<ul>' +
                                    '<li><span>{{post.comments_total}}</span><i class="icon comments" aria-hidden="true"></i></li>' +
                                    '<li><span>{{post.favorites_total}}</span><i class="icon2 favorite" aria-hidden="true"></i></li>' +
                                    '<li><span>{{post.votes_up_total}}</span><i class="icon2 thumbs-up" aria-hidden="true"></i></li>' +
                                    '<li><span>{{post.votes_down_total}}</span><i class="icon2 thumbs-down" aria-hidden="true"></i></li>' +
                                    '<li><span>{{post.peers}}</span><i class="icon users" aria-hidden="true"></i></li>' +
                                '</ul>' +
                                '<span><b am-time-ago="post.post_date_added"></b></span>' +
                            '</div>' +
                        '</div>';

        return {
            restrict: 'AE',
            replace:true,
            controller: controller,
            template:template
        }

    }
]);