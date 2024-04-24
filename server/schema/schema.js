const graphql = require("graphql");
var _ = require("lodash");
const User = require("../model/user");
const Hobby = require("../model/hobby");
const Post = require("../model/post");
const Detail = require("../model/detail");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "User with business card",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    profession: { type: GraphQLString },
    Phone: { type: GraphQLString },
    email: { type: GraphQLString },

    detail: {
      type: DetailType,
      resolve(parent, args) {
        return Detail.findOne({ userId: parent.id });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userId: parent.id });
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return Hobby.find({ userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "User hobbies",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.find({ id: parent.userId });
      },
    },
  }),
});

const DetailType = new GraphQLObjectType({
  name: "DetailType",
  description: "Detail",
  fields: () => ({
    id: { type: GraphQLID },
    company: { type: GraphQLString },
    position: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.find({ id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  descrtion: "User posts",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.find({ id: parent.userId });
      },
    },
  }),
});

// root
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Queries",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Hobby.findById(args.id);
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return Hobby.find({});
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({});
      },
    },
    detail: {
      type: DetailType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Detail.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutation refers to actions for instance CRUD",
  fields: {
    // create
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        profession: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = User({
          name: args.name,
          age: args.age,
          profession: args.profession,
        });
        return user.save();
      },
    },
    createPost: {
      type: PostType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        let post = Post({
          comment: args.comment,
          userId: args.userId,
        });
        return post.save();
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let hobby = Hobby({
          title: args.title,
          description: args.description,
          userId: args.userId,
        });
        return hobby.save();
      },
    },
    createDetail: {
      type: DetailType,
      args: {
        company: { type: GraphQLString },
        position: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let detail = Detail({
          company: args.company,
          position: args.position,
          description: args.description,
          userId: args.userId,
        });

        // just allow one detail for user.
        currentDetail = Detail.find({ userId: args.userId });
        console.log(currentDetail);

        return detail.save();
      },
    },
    // Update
    UpdateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              age: args.age,
              profession: args.profession,
            },
          },
          {
            new: true,
          }
        );
      },
    },
    UpdatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(
          args.id,
          {
            $set: {
              comment: args.comment,
            },
          },
          {
            new: true,
          }
        );
      },
    },
    UpdateHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Hobby.findByIdAndUpdate(
          args.id,
          {
            $set: {
              tittle: args.title,
              description: args.description,
            },
          },
          {
            new: true,
          }
        );
      },
    },
    UpdateDetail: {
      type: DetailType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        company: { type: GraphQLString },
        position: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Detail.findByIdAndUpdate(
          args.id,
          {
            $set: {
              company: args.company,
              position: args.position,
              description: args.description,
            },
          },
          {
            new: true,
          }
        );
      },
    },

    // Delete
    DeleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let result = User.findByIdAndDelete(args.id).exec();
        if (!result) {
          throw new Error("error deleting user");
        }
        return result;
      },
    },
    DeletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let result = Post.findByIdAndDelete(args.id).exec();
        if (!result) {
          throw new Error("error deleting post");
        }
        return result;
      },
    },
    DeleteHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let result = Hobby.findByIdAndDelete(args.id).exec();
        if (!result) {
          throw new Error("error deleting detail");
        }
        return result;
      },
    },
    DeleteDetail: {
      type: DetailType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let result = Detail.findByIdAndDelete(args.id).exec();
        if (!result) {
          throw new Error("error deleting detail");
        }
        return result;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
