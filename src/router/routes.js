export default [
    {
        path: '/',
        name: 'index',
        component: resolve => require(['views/IndexView'], resolve)
    },
    {
        path: '*',
        redirect: '/'
    }
]
