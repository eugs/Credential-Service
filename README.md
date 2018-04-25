#### Credential service
Locking and unlocking users during parallel e2e tests run

Starts on port `:3002`

Requests:

1. Create pool of users for specified env

        `POST /users/pool/create`

    * `env:` environment where tests are run
    * `creds:` Array of objects {user: `<user>`, password: `<password>`}

2. Delete pool of users for specified env

        `POST /users/pool/delete`

    * `env:` environment where tests are run

3. Lock user in specified user pool

        `POST /users/user/lock`

    * `env:` environment where tests are run
    * returns {user: `<user>`, password: `<password>`}

4. Unlock user in specified user pool

        `POST /users/user/unlock`

    * `env:` environment where tests are run
    * `userName:` unlock user `userName == <user>`