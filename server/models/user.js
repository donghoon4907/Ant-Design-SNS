module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true //고유값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      thumbnail: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      //한글 저장
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  // 관계설정
  User.associate = db => {
    db.User.hasMany(db.Post, { as: "Posts" }); //User는 다수의 Post를 가질 수 있음 1:다
    db.User.hasMany(db.Comment); //User는 다수의 Comment를 가질 수 있음 1:다
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // as는 구분자; belongsToMany정의 시 as를 붙여주는게 좋다.
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "followingId" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: "followerId" });
  };
  return User;
};
