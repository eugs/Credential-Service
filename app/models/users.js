class Users {
    constructor() {
        this.users = new Map();
        this.sessions = new Map();
    }

    getUsersInJSONFormat(env) {
        if (this.users.has(`${env}FreeUsers`) && this.users.has(`${env}BusyUsers`)) {
            return {
                freeUsers: [...this.users.get(`${env}FreeUsers`)],
                busyUsers: [...this.users.get(`${env}BusyUsers`)]
            };
        } else {
            return null;
        }
    }

    createUserPool(env, users, sessionId) {
        if (this.sessions.has(env)) {
            this.sessions.set(env, this.sessions.get(env).concat(sessionId));
        } else {
            this.users.set(`${env}FreeUsers`, new Map());
            this.users.set(`${env}BusyUsers`, new Map());
            users.forEach(user => this.users.get(`${env}FreeUsers`).set(user.user, user.password));
            this.sessions.set(env, [sessionId]);
        }
    }

    unlockUser(env, userName) {
        if (this.users.get(`${env}BusyUsers`).has(userName)) {
            const userPassword = this.users.get(`${env}BusyUsers`).get(userName);
            this.users.get(`${env}BusyUsers`).delete(userName);
            this.users.get(`${env}FreeUsers`).set(userName, userPassword);
        } else {
            return new Error(`No such user ${userName}`);
        }
    }

    lockUser(env) {
        const credentials = {};
        const userIter = this.users.get(`${env}FreeUsers`).keys();
        const firstFreeUser = userIter.next().value;
        if (firstFreeUser) {
            credentials.user = firstFreeUser;
            credentials.password = this.users.get(`${env}FreeUsers`).get(credentials.user);
            this.users.get(`${env}FreeUsers`).delete(credentials.user);
            this.users.get(`${env}BusyUsers`).set(credentials.user, credentials.password);
            return credentials;
        } else {
            return null;
        }
    }

    deleteUserPool(env, sessionId) {
        // if (this.sessions.get(env).length === 1 && this.sessions.get(env)[0] === sessionId) {
            this.users.delete(`${env}BusyUsers`);
            this.users.delete(`${env}FreeUsers`);
            this.sessions.delete(env);
            console.log(`Deleted for env ${env}`);
        // } else {
        //     const sessionIndex = this.sessions.get(env).findIndex(el => el === sessionId);
        //     this.sessions.set(env, this.sessions.get(env).splice(sessionIndex, 1));
        //     console.log(this.sessions);
        // }
    }

    resetState(){
        this.users = new Map();
        this.sessions = new Map();
    }
}

module.exports = Users;