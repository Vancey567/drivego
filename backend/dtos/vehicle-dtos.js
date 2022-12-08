class vehicleDto {
    owner;
    vehicleNumber;
    model;
    type;
    capacity;
    color;
    vehicleImg;

    constructor(vehicle) {
        this.owner = vehicle.owner;
        this.vehicleNumber = vehicle.vehicleNumber;
        this.model = vehicle.model;
        this.type = vehicle.type;
        this.capacity = vehicle.capacity;
        this.color = vehicle.color;
        // this.vehicleImg = vehicle.vehicleImg ? `${process.env.BASE_URL}${vehicle.vehicleImg}` : null;
    }
}

module.exports = vehicleDto;