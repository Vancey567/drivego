class UserDto {
    id;
    name;
    phone;
    email;
    gender;
    dob;
    occupation;
    userImg;
    password;
    isActivated;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        // this.userImg = user.userImg ? `${process.env.BASE_URL}${user.userImg}` : null;
        this.userImg = user.userImg; // Since we set the base url in the DB using getter function we don't need to give the path here now
        this.password = user.password;
        this.isActivated = user.isActivated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto; // we are not creating the object of class of reqest using new keyword.
