class UserDto {
    id;
    name;
    phone;
    email;
    gender;
    dob;
    occupation;
    image;
    password;
    isActivated;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        this.dob = user.dob;
        this.email = user.email;
        // this.image = user.image;
        this.occupation = user.occupation;
        this.password = user.password;
        this.isActivated = user.isActivated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;
