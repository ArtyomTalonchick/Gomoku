import firebaseApp from '../firebaseApp';

const unpackUsers = users => Object.entries(users).map(([uid, value]) => ({id: uid, ...value}));

const create = (uid, name, email, image) => {
    const user = {};
    Object.entries({name, email, image}).forEach(([key, value]) => value && (user[key] = value));

    return firebaseApp
        .database()
        .ref(`users/${uid}`)
        .set(user)
};

const update = (uid, fields) => {
    return firebaseApp
        .database()
        .ref(`users/${uid}`)
        .update(fields)
};

const getAll = () =>
    new Promise(resolve =>
        firebaseApp
            .database()
            .ref('users')
            .on('value', response => resolve(unpackUsers(response.val() || {})))
    );

const getUserById = uid =>
    new Promise(resolve =>
        firebaseApp
            .database()
            .ref(`users/${uid}`)
            .on('value', response => resolve({id: uid, ...response.val()} || {}))
    );

const updateAvatar = (uid, file) =>
    new Promise(resolve =>
        firebaseApp
            .storage()
            .ref(`avatar/${uid}`)
            .put(file)
            .then( snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(downloadURL =>
                        update(uid, {img: downloadURL})
                            .then(resolve)
                    )
            })
    );

export default {
    create,
    update,
    getAll,
    getUserById,
    updateAvatar
}
