module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post", // 대문자로 정의시 적용되는 이름: posts 접두사가 소문자가 되고 접미사에 s가 붙음
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8mb4", // 한글 + 이모티콘
      collate: "utf8mb4_general_ci"
    }
  );

  Post.associate = db => {
    db.Post.belongsTo(db.User); // hasMany의 반대
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: "Retweet" });
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};
