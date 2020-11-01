let router, store, VueInstance;

const proxy = func => {
    return new Proxy(func, {
        apply(target, ctx, args) {
            const {
                currentRoute: { fullPath, hash, meta, name, params, path, query }
            } = router;
            console.log(ctx, "res", router, "aa");
            setTimeout(() => {
                console.log(name, "name");
            }, 0);

            store.commit("ADD_TAGS", { fullPath, hash, meta, name, params, path, query });
            return Reflect.apply(target, ctx, args);
        }
    });
};

export default {
    install(Vue, options) {
        VueInstance = Vue;
        router = options.router;
        store = options.store;
        router.push = proxy(router.push);
    }
};
