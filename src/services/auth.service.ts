import { FirebaseAuthError, getAuth, UpdateRequest, UserRecord } from 'firebase-admin/auth';
import { User } from '../models/user.model.js';
import { EmailAlreadyExistsError } from '../errors/email-already-exists.js';
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { UnauthorizedError } from '../errors/unauthorized.error.js';
import { FirebaseError } from 'firebase/app';

export class AuthService {
  async create(user: User): Promise<UserRecord> {
    try {
      return await getAuth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
      });
    } catch (error) {
      if (error instanceof FirebaseAuthError && error.code === 'auth/email-already-exists') {
        throw new EmailAlreadyExistsError();
      }
      throw error;
    }
  }

  update(id: string, user: User) {
    const props: UpdateRequest = {
      displayName: user.name,
      email: user.email
    };

    if (user.password) {
      props.password = user.password;
    }

    getAuth().updateUser(id, props)
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
      .catch(error => {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/invalid-credential') {
            throw new UnauthorizedError();
          }
        }
        throw error;
      }
      )
  }

  async deleteUser(id: string) {
    await getAuth().deleteUser(id);
  }

  async recoverPassword(email: string) {
    await sendPasswordResetEmail(getFirebaseAuth(), email);
  }

}


