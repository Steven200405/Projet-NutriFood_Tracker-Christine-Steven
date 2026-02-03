import { Injectable } from '@angular/core';
import { LocalDbService } from './local-db-service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private db: LocalDbService) { }

  updateConnectedUser(partial: Partial<User>): User {
    const session = this.db.getSession();
    if (!session) throw new Error('NOT_LOGGED_IN');

    const users = this.db.getUsers();
    const idx = users.findIndex(u => u.id === session.userId);
    if (idx === -1) throw new Error('USER_NOT_FOUND');

    const updated: User = {
      ...users[idx],
      ...partial,
      id: users[idx].id,
      email: users[idx].email,
      passwordHash: users[idx].passwordHash,
      createdAt: users[idx].createdAt,
      updatedAt: new Date().toISOString(),
    };

    users[idx] = updated;
    this.db.saveUsers(users);
    return updated;
  }
}
