import { Context } from 'koa';
import Post from '@models/Post';
import User from '@models/User';

// THAT IS PROTOTYPE NO ERROR HANDLERS

export const getPosts = async (ctx: Context) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      as: 'author',
    },
    raw: true,
    nest: true,
  });

  ctx.body = {
    ok: true,
    posts,
  };
};

export const getPost = async (ctx: Context) => {
  const postId = ctx.params.id;
  const post = await Post.findOne({
    where: {
      id: postId,
    },
    include: {
      model: User,
      as: 'author',
    },
  });
  ctx.body = {
    ok: true,
    post: post?.toJSON(),
  };
};

export const createPost = async (ctx: Context) => {
  const post = await Post.create(ctx.request.body);
  await ctx.state.user.addPost(post);

  ctx.body = {
    ok: true,
    post: post.toJSON(),
  };
};

export const updatePost = async (ctx: Context) => {
  const postId = ctx.params.id;
  await Post.update(ctx.request.body, {
    where: { id: postId },
  });

  ctx.body = {
    ok: true,
    postId,
  };
};

export const deletePost = async (ctx: Context) => {
  const postId = ctx.params.id;
  await Post.destroy({
    where: { id: postId },
  });

  ctx.body = {
    ok: true,
    postId,
  };
};
