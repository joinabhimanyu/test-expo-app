// class for storing Billing information
export class BillingInformation {
    public firstName: string="";
    public lastName: string="";
    public addressLine1: string="";
    public addressLine2: string="";
    public city: string="";
    public state: string="";
    public zipCode: string="";
    public country: string="";
    public phoneNumber: string="";
    public email: string="";
    public cardNumber: string="";
    public expirationDate: string="";
    public cvv: string="";
    public cardType: string="";
    public upiId: string="";
    public shippingAddressSameAsBilling: boolean=false;
    // constructor to initialize the billing information object with provided parameters
    constructor(
    ) {}
}

// class for storing Shipping information
export class ShippingAddress {
    public firstName: string="";
    public lastName: string="";
    public addressLine1: string="";
    public addressLine2: string = "";
    public city: string="";
    public state: string="";
    public zipCode: string="";
    public country: string="";
    public phoneNumber: string="";
    constructor(
    ){}
}