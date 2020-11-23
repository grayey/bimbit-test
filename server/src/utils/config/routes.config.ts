
export const getAppRoutes = () => {

return {

    roles:[
      { path: '/api', method: 'get', name:'hello'} ,
      { path: '/api/roles', method: 'get', name:'admin.view_all_roles'} ,
      { path: '/api/roles/:id', method: 'get', name:'admin.view_role_detail'} ,
      { path: '/api/roles', method: 'post', name:'admin.create_role'} ,
      { path: '/api/roles/:id', method: 'delete', name:'admin.delete_role'},
      { path: '/api/roles/:id', method: 'put', name:'admin.edit_role'},
    ],

    categories:[
      { path: '/api/categories', method: 'get', name:'admin.view_all_categories' } ,
      { path: '/api/categories/:id', method: 'get', name:'admin.view_category_detail'},
      { path: '/api/categories', method: 'post', name:'admin.create_category' },
      { path: '/api/categories/:id', method: 'delete', name:'admin.delete_category'},
      { path: '/api/categories/:id', method: 'put', name:'admin.edit_category' }
    ],

    tasks:[
      { path: '/api/tasks', method: 'get', name:'admin.view_all_tasks' }
    ]
}




}
