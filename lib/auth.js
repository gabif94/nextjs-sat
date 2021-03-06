import React, {useState, useEffect, useContext, createContext} from 'react';
import {createUser} from '@/lib/auth';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({children}) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

const useProvideAuth = () => {
	const [user, setUser] = useState(null);

	const handleUser = async rawUser => {
		if (rawUser) {
			const user = await formatUser(rawUser);

			createUser(user.uid, user);
			setUser(user);
			return user;
		} else {
			setUser(false);
			return false;
		}
	};

	const signinWithGitHub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then(response => handleUser(response.user));
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => setUser(false));
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});
		return () => unsubscribe();
	}, []);
	return {
		user,
		signinWithGitHub,
		signout,
	};
};

const formatUser = async user => {
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerId,
		photoUrl: user.photoURL,
	};
};
