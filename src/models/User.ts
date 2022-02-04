import {
  Model,
  DataTypes,
  Optional,
  HasManyAddAssociationMixin,
} from 'sequelize';
import sequelize from '@db/index';
import UserAuthProvider from '@models/UserAuthProvider';
import Post from '@models/Post';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// We don't need id to create new user
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;

  declare firstName: string;

  declare lastName: string;

  declare email: string;

  declare readonly createdAt: Date;

  declare readonly updatedAt: Date;

  declare addPost: HasManyAddAssociationMixin<Post, number>;

  declare addUserAuthProvider: HasManyAddAssociationMixin<
    UserAuthProvider,
    number
  >;

  declare readonly posts?: Post[];

  declare readonly userAuthProviders?: UserAuthProvider[];
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      validate: {
        len: {
          msg: 'First name should be from 2 to 100 symbols',
          args: [2, 100],
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(100),
      validate: {
        len: {
          msg: 'Last name should be from 2 to 100 symbols',
          args: [2, 100],
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: {
        len: {
          msg: 'Email should be from 2 to 100 symbols',
          args: [2, 100],
        },
        isEmail: {
          msg: 'Email validation failed...',
        },
      },
    },
  },
  { sequelize, modelName: 'User' },
);

export default User;
