export default ({router}) => {
    router.beforeEach((to, from, next) => {
        if (typeof _hmt != "undefined") {
            if (to.path) {
                const path = `/doc${to.fullPath}`
                _hmt.push(["_trackPageview", path]);
            }
        }
        next();
    });
};
