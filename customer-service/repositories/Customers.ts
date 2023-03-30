import fs from "fs";

class Customers {
  private customers: CustomerT[] = [];

  async init() {
    try
    {
      const rawCustomers = fs.readFileSync("./fake-db/customers-db.json", "utf-8");

      this.customers = JSON.parse(rawCustomers);

      console.log("Loaded customers", this.customers);

    }
    catch(err){
      console.log(err);
      this.customers = [];
    }

  }

  getAll(): CustomerT[] {
    return this.customers;
  }

  getByEmail(email: string): CustomerT | undefined {
    return this.customers.find((customer) => customer.email === email);
  }

  getById(id: string): CustomerT | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  add(customer: CustomerT): CustomerT {
    if (this.getById(customer.id)) {
      throw new Error(`Existing customer ID ${customer.id}`);
    }

    this.customers.push(customer);

    fs.writeFileSync("./fake-db/customers-db.json", JSON.stringify(this.customers))


    return customer;
  }
}

export default new Customers();
