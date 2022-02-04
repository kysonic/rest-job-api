import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@db/index';

export enum PossibleAuthProviders {
  Firebase = 'FIREBASE',
}

interface UserAuthProviderAttributes {
  id: number;
  type: PossibleAuthProviders;
  uid: string; // UID of provider, could be parsed from id token
}

// We don't need id to create new user
interface UserAuthProviderCreationAttributes
  extends Optional<UserAuthProviderAttributes, 'id'> {}

class UserAuthProvider
  extends Model<UserAuthProviderAttributes, UserAuthProviderCreationAttributes>
  implements UserAuthProviderAttributes
{
  declare id: number;

  declare type: PossibleAuthProviders;

  declare uid: string;

  declare readonly createdAt: Date;

  declare readonly updatedAt: Date;
}
UserAuthProvider.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(Object.values(PossibleAuthProviders) as any),
    },
    uid: {
      type: DataTypes.STRING(255),
      validate: {
        max: 255,
      },
    },
  },
  { sequelize, modelName: 'UserAuthProvider' },
);

export default UserAuthProvider;
