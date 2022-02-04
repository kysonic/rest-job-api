import User from './User';
import Post from './Post';
import UserAuthProvider from './UserAuthProvider';

User.hasMany(UserAuthProvider, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
