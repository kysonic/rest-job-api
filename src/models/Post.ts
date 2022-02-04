import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@db/index';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  declare id: number;

  declare title: string;

  declare content: string;
}
Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      validate: {
        len: {
          msg: 'Title should be from 2 to 100 symbols',
          args: [2, 100],
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize, modelName: 'Post' },
);

export default Post;
