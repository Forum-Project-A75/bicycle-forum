
export const LOG_MODULES = {
    GLOBAL: "GLOBAL",
    HEADER: "HEADER",
    REGISTER: "REGISTER",
    APP: "APP",
    LOGIN: "LOGIN",
    HOME: "HOME",
    DB: "DB",
    POST_EDITOR: "POST_EDITOR",
    USER_PROFILE: "USER_PROFILE",
    TAGS: "TAGS",
    POST_DETAILS: "POST_DETAILS",
    POST_CARD: "POST_CARD",
    CREATE_COMMENT: "CREATE_COMMENT",
    VOTE_PANEL: "VOTE_PANEL",
    SHOW_POSTS: "SHOW_POSTS"
};

export const LOG_CONFIG = {
    GLOBAL: true,
    HEADER: true,
    REGISTER: true,
    APP: false,
    LOGIN: true,
    HOME: true,
    DB: true,
    POST_EDITOR: true,
    USER_PROFILE: true,
    TAGS: true,
    POST_DETAILS: true,
    POST_CARD: true,
    CREATE_COMMENT: true,
    VOTE_PANEL: true,
    SHOW_POSTS: true
};


export const setLog = (module, state) => {
    if (!(module in LOG_CONFIG)) {
        console.warn("Unknown log module:", module);
        return;
    }
    LOG_CONFIG[module] = state;
};


export const createLogger = (moduleName) => {
    if (!(moduleName in LOG_CONFIG)) {
        console.warn(`Logger created with unknown module: ${moduleName}`);
    }

    return {
       log: (...args) => {
           if (!LOG_CONFIG.GLOBAL || !LOG_CONFIG[moduleName]) return;
           console.log("[%s]", moduleName, ...args);
       },

       error: (...args) => {
           if (!LOG_CONFIG.GLOBAL || !LOG_CONFIG[moduleName]) return;
           console.error("[%s]", moduleName, ...args);
        },

        warn: (...args) => {
            if (!LOG_CONFIG.GLOBAL || !LOG_CONFIG[moduleName]) return;
            console.warn("[%s]", moduleName, ...args);
        }
    };
};