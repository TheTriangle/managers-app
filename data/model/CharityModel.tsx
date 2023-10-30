export default class CharityModel {
    public name: string = "";
    public firestoreId: string = "";
    public description: string | undefined = "";
    public photourl: string | undefined = "";
    public paymenturl: string | undefined = "";

    constructor(name: string, id: string, description: string | undefined, photourl: string | undefined, paymenturl: string | undefined) {
        this.name = name;
        this.firestoreId = id;
        this.description = description;
        this.paymenturl = paymenturl;
        this.photourl = photourl;
    }
}